import { useEffect, useState } from "react";
import { deleteNotification, getIncomingText, receiveNotification } from "../services/greenApi";
import type { GreenApiCredentials } from "../types/greenApi";
import type { IncomingTextNotification } from "../types/notification";

const RETRY_DELAY = 5_000;
const POLL_DELAY = 500;

interface UseIncomingMessagesOptions {
  credentials: GreenApiCredentials | null;
  chatId: string;
  onMessage: (notification: IncomingTextNotification, text: string) => void;
}

export function useIncomingMessages({ credentials, chatId, onMessage }: UseIncomingMessagesOptions) {
  const [isReceiving, setIsReceiving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!credentials || !chatId) {
      setIsReceiving(false);
      setError("");
      return;
    }

    let active = true;
    let timeoutId: number | undefined;
    let controller: AbortController | undefined;
    setIsReceiving(true);
    setError("");

    const poll = async (): Promise<void> => {
      controller = new AbortController();
      try {
        const notification = await receiveNotification(credentials, controller.signal);
        if (!active) return;
        setIsReceiving(true);
        setError("");

        if (notification) {
          const text = getIncomingText(notification);
          if (text && notification.body.typeWebhook === "incomingMessageReceived") onMessage(notification, text);
          await deleteNotification(credentials, notification.receiptId);
        }
      } catch (pollError) {
        if (active && !(pollError instanceof DOMException && pollError.name === "AbortError")) {
          setError(pollError instanceof Error ? pollError.message : "Ошибка получения сообщений.");
          setIsReceiving(false);
          timeoutId = window.setTimeout(() => {
            if (active) void poll();
          }, RETRY_DELAY);
        }
        return;
      }

      if (active) timeoutId = window.setTimeout(() => void poll(), POLL_DELAY);
    };

    void poll();
    return () => {
      active = false;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      controller?.abort();
    };
  }, [chatId, credentials, onMessage]);

  return { isReceiving, error };
}
