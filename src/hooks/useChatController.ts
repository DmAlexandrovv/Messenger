import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { findTelegramChat, sendTextMessage } from "../services/greenApi";
import type { GreenApiCredentials } from "../types/greenApi";
import type { IncomingTextNotification } from "../types/notification";
import type { ChatMessage } from "../types/message";
import { useIncomingMessages } from "./useIncomingMessages";

const SETTINGS_KEY = "telegram-chat-settings-v1";

function readCredentials(): GreenApiCredentials | null {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "null");
    if (typeof saved !== "object" || saved === null) return null;
    const value = saved as Partial<GreenApiCredentials>;
    return value.idInstance && value.apiTokenInstance && value.apiUrl
      ? { idInstance: value.idInstance, apiTokenInstance: value.apiTokenInstance, apiUrl: value.apiUrl }
      : null;
  } catch {
    return null;
  }
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("7")) {
    return (
      "+" +
      digits.slice(0, 1) +
      " (" +
      digits.slice(1, 4) +
      ") " +
      digits.slice(4, 7) +
      "-" +
      digits.slice(7, 9) +
      "-" +
      digits.slice(9)
    );
  }
  return phone;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Не удалось выполнить запрос. Попробуйте ещё раз.";
}

export function useChatController() {
  const [credentials, setCredentials] = useState(readCredentials);
  const [phoneInput, setPhoneInput] = useState("");
  const [activePhone, setActivePhone] = useState("");
  const [chatId, setChatId] = useState("");
  const [contactName, setContactName] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const appendIncoming = useCallback(
    (notification: IncomingTextNotification, text: string) => {
      const receivedChatId = notification.body.senderData?.chatId;
      if (!receivedChatId || receivedChatId !== chatId) return;
      const id = notification.body.idMessage ?? String(notification.receiptId);
      setMessages((current) =>
        current.some((message) => message.id === id)
          ? current
          : [
              ...current,
              { id, text, direction: "incoming", timestamp: (notification.body.timestamp ?? Date.now() / 1000) * 1000 },
            ],
      );
      const senderName = notification.body.senderData?.senderName;
      if (senderName) setContactName(senderName);
    },
    [chatId],
  );

  const { isReceiving, error: receiveError } = useIncomingMessages({ credentials, chatId, onMessage: appendIncoming });

  function saveCredentials(next: GreenApiCredentials) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    } catch {
      setError("Не удалось сохранить настройки браузера. Проверьте, разрешено ли локальное хранилище.");
      return;
    }
    setCredentials(next);
    setError("");
    setNotice("Подключение настроено - можно создать чат.");
  }

  function logout() {
    try {
      localStorage.removeItem(SETTINGS_KEY);
    } catch {
      setError("Не удалось удалить настройки из локального хранилища браузера.");
      return;
    }

    setCredentials(null);
    setPhoneInput("");
    setActivePhone("");
    setChatId("");
    setContactName("");
    setMessages([]);
    setDraft("");
    setShowNewChat(false);
    setMobileChatOpen(false);
    setError("");
    setNotice("");
  }

  async function createChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!credentials || connecting) return;
    const normalizedPhone = phoneInput.replace(/\D/g, "");
    if (normalizedPhone.length < 7 || normalizedPhone.length > 15) {
      setError("Введите номер в международном формате цифрами, например 79001234567.");
      return;
    }
    setConnecting(true);
    setError("");
    setNotice("");
    try {
      const chat = await findTelegramChat(credentials, normalizedPhone);
      setChatId(chat.chatId);
      setActivePhone(formatPhone(phoneInput));
      setContactName(chat.username ?? "Telegram-контакт");
      setMessages([]);
      setDraft("");
      setShowNewChat(false);
      setMobileChatOpen(true);
    } catch (chatError) {
      setError(errorMessage(chatError));
    } finally {
      setConnecting(false);
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!credentials || !chatId || !draft.trim() || sending) return;
    const text = draft.trim();
    const temporaryId = "pending-" + crypto.randomUUID();
    setSending(true);
    setError("");
    setNotice("");
    setMessages((current) => [
      ...current,
      { id: temporaryId, text, direction: "outgoing", timestamp: Date.now(), pending: true },
    ]);
    setDraft("");
    try {
      const result = await sendTextMessage(credentials, chatId, text);
      setMessages((current) =>
        current.map((message) =>
          message.id === temporaryId ? { ...message, id: result.idMessage, pending: false } : message,
        ),
      );
    } catch (sendError) {
      setMessages((current) => current.filter((message) => message.id !== temporaryId));
      setDraft(text);
      setError(errorMessage(sendError));
    } finally {
      setSending(false);
    }
  }

  function resetChat() {
    setChatId("");
    setActivePhone("");
    setContactName("");
    setMessages([]);
    setMobileChatOpen(false);
    setError("");
    setNotice("");
  }

  function clearNotification() {
    setError("");
    setNotice("");
  }

  return {
    credentials,
    phoneInput,
    setPhoneInput,
    activePhone,
    chatId,
    contactName,
    messages,
    draft,
    setDraft,
    connecting,
    sending,
    error,
    receiveError,
    notice,
    showNewChat,
    setShowNewChat,
    mobileChatOpen,
    setMobileChatOpen,
    isReceiving,
    scrollRef,
    saveCredentials,
    logout,
    createChat,
    sendMessage,
    resetChat,
    clearNotification,
  };
}
