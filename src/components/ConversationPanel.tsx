import { useRef } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCheck,
  LockKeyhole,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import type { FormEvent, KeyboardEvent, RefObject } from "react";
import type { GreenApiCredentials } from "../types/greenApi";
import type { ChatMessage } from "../types/message";
import type { ConversationScreen } from "../types/ui";
import { SettingsForm } from "./SettingsForm";
import { ConversationSettings } from "./ConversationSettings";
import { onlyDigits } from "../services/credentials";

interface ConversationPanelProps {
  screen: ConversationScreen;
  credentials: GreenApiCredentials | null;
  phoneInput: string;
  activePhone: string;
  contactName: string;
  messages: ChatMessage[];
  draft: string;
  isReceiving: boolean;
  mobileChatOpen: boolean;
  connecting: boolean;
  sending: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
  onSaveCredentials: (credentials: GreenApiCredentials) => void;
  onPhoneChange: (phone: string) => void;
  onCreateChat: (event: FormEvent<HTMLFormElement>) => void;
  onDraftChange: (draft: string) => void;
  onSendMessage: (event: FormEvent<HTMLFormElement>) => void;
  onResetChat: () => void;
  onBack: () => void;
  onCreateNewChat: () => void;
  onCancelNewChat: () => void;
}

const PHONE_MAX_DIGITS = 15;

export function ConversationPanel(props: ConversationPanelProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section
      className={
        "conversation" +
        (props.screen === "chat"
          ? props.mobileChatOpen
            ? " mobile-active"
            : ""
          : props.screen !== "empty"
            ? " mobile-active"
            : "")
      }
      aria-label="Переписка"
    >
      {props.screen === "settings" && (
        <ConversationSettings>
          <SettingsForm initialCredentials={props.credentials} onSave={props.onSaveCredentials} />
        </ConversationSettings>
      )}
      {props.screen === "new-chat" && (
        <NewChatScreen
          phone={props.phoneInput}
          connecting={props.connecting}
          disabled={!props.credentials}
          onPhoneChange={props.onPhoneChange}
          onCreateChat={props.onCreateChat}
          onBack={props.onCancelNewChat}
        />
      )}
      {props.screen === "chat" && <ChatScreen {...props} formRef={formRef} />}
      {props.screen === "empty" && <EmptyScreen disabled={!props.credentials} onCreateChat={props.onCreateNewChat} />}
    </section>
  );
}

interface NewChatScreenProps {
  phone: string;
  connecting: boolean;
  disabled: boolean;
  onPhoneChange: (phone: string) => void;
  onCreateChat: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

function NewChatScreen({ phone, connecting, disabled, onPhoneChange, onCreateChat, onBack }: NewChatScreenProps) {
  return (
    <div className="settings-state new-chat-state">
      <button type="button" className="back-link" onClick={onBack}>
        <ArrowLeft size={15} /> Назад к чатам
      </button>
      <div className="state-icon">
        <MessageCircle size={22} />
      </div>
      <span className="eyebrow">НОВЫЙ ДИАЛОГ</span>
      <h2>С кем поговорим?</h2>
      <p className="state-copy">Введите номер в международном формате. Мы найдём его Telegram-чат.</p>
      <form className="new-chat-form" onSubmit={onCreateChat}>
        <label>
          Номер телефона
          <div className="phone-field">
            <span>+</span>
            <input
              autoFocus
              inputMode="numeric"
              type="tel"
              autoComplete="tel"
              pattern="[0-9]*"
              maxLength={PHONE_MAX_DIGITS}
              value={phone}
              onChange={(event) => onPhoneChange(onlyDigits(event.target.value, PHONE_MAX_DIGITS))}
              placeholder="7 900 123 45 67"
              required
            />
          </div>
        </label>
        <button className="primary-button" type="submit" disabled={connecting || disabled}>
          {connecting ? (
            <>
              <span className="spinner" /> Ищем Telegram…
            </>
          ) : (
            <>
              Открыть чат <ArrowUpRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

interface ChatScreenProps extends Omit<
  ConversationPanelProps,
  | "screen"
  | "credentials"
  | "onSaveCredentials"
  | "onPhoneChange"
  | "onCreateChat"
  | "onCancelNewChat"
  | "onCreateNewChat"
> {
  formRef: RefObject<HTMLFormElement | null>;
  onBack: () => void;
}

function ChatScreen({
  activePhone,
  contactName,
  messages,
  draft,
  isReceiving,
  sending,
  scrollRef,
  formRef,
  onDraftChange,
  onSendMessage,
  onResetChat,
  onBack,
}: ChatScreenProps) {
  return (
    <>
      <header className="conversation-header">
        <button type="button" className="icon-button mobile-back" aria-label="Назад к чатам" onClick={onBack}>
          <ArrowLeft size={19} />
        </button>
        <span className="contact-avatar header-avatar">{(contactName || activePhone).slice(0, 1).toUpperCase()}</span>
        <div className="header-contact">
          <div className="header-contact-name">{contactName}</div>
          <div className="header-contact-state">
            <span className={"online-dot" + (isReceiving ? "" : " is-offline")} />
            {isReceiving ? "в сети" : "нет связи"}
          </div>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="icon-button close-chat-button"
            aria-label="Закрыть чат"
            onClick={onResetChat}
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <div className="message-feed" ref={scrollRef} aria-live="polite">
        <div className="date-divider">
          <span>СЕГОДНЯ</span>
        </div>
        {messages.length === 0 && (
          <div className="feed-empty">
            <div className="feed-lock">
              <LockKeyhole size={14} />
            </div>
            <span>Это начало вашего диалога с {contactName}.</span>
            <span>Напишите первое сообщение</span>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <div className="compose-wrap">
        <div className="compose-hint">
          <span className="hint-dot" />
          Только текстовые сообщения
        </div>
        <form ref={formRef} className="composer" onSubmit={onSendMessage}>
          <textarea
            aria-label="Текст сообщения"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Напишите сообщение…"
            rows={1}
            maxLength={4096}
            onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
          />
          <span className="draft-count">{draft.length > 3500 ? draft.length + "/4096" : ""}</span>
          <button
            type="submit"
            className="send-button"
            aria-label="Отправить сообщение"
            disabled={!draft.trim() || sending}
          >
            {sending ? <span className="spinner light" /> : <Send size={17} fill="currentColor" />}
          </button>
        </form>
        <p className="compose-footnote">
          Enter - отправить <span>·</span> Shift + Enter - новая строка
        </p>
      </div>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const time = new Date(message.timestamp);
  return (
    <article className={"message-row " + message.direction}>
      <div className="message-bubble">
        {message.text}
        <div className="message-meta">
          <time dateTime={time.toISOString()}>
            {time.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
          </time>
          {message.direction === "outgoing" &&
            (message.pending ? (
              <Check size={13} className="pending-check" />
            ) : (
              <CheckCheck size={15} className="read-check" />
            ))}
        </div>
      </div>
    </article>
  );
}

function EmptyScreen({ disabled, onCreateChat }: { disabled: boolean; onCreateChat: () => void }) {
  return (
    <div className="conversation-empty">
      <div className="empty-orbit">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit-core">
          <MessageCircle size={29} />
        </div>
        <Sparkles className="orbit-spark spark-one" size={18} />
        <Sparkles className="orbit-spark spark-two" size={13} />
      </div>
      <span className="eyebrow">ВАШЕ ПРОСТРАНСТВО ДЛЯ ДИАЛОГА</span>
      <h2>
        Здесь начнутся
        <br />
        ваши разговоры
      </h2>
      <p>
        Выберите чат слева или создайте новый,
        <br className="desktop-break" /> чтобы отправить первое сообщение.
      </p>
      <button type="button" className="start-chat-cta" disabled={disabled} onClick={onCreateChat}>
        Создать чат <ArrowUpRight size={15} />
      </button>
      {disabled && (
        <span className="setup-reminder">
          <LockKeyhole size={13} /> Сначала подключите GREEN-API
        </span>
      )}
    </div>
  );
}
