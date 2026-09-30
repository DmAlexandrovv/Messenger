import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import type { ChatMessage } from "../types/message";

interface ChatSidebarProps {
  contactName: string;
  activePhone: string;
  chatId: string;
  messages: ChatMessage[];
  mobileHidden: boolean;
  onNewChat: () => void;
  onOpenChat: () => void;
}

export function ChatSidebar({
  contactName,
  activePhone,
  chatId,
  messages,
  mobileHidden,
  onNewChat,
  onOpenChat,
}: ChatSidebarProps) {
  const lastMessage = messages.at(-1);
  const lastMessageTime = lastMessage
    ? new Date(lastMessage.timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <aside className={"chat-sidebar" + (mobileHidden ? " mobile-hidden" : "")} aria-label="Список чатов">
      <div className="sidebar-top">
        <div>
          <span className="eyebrow">ВАШЕ ПРОСТРАНСТВО</span>
          <h1>Сообщения</h1>
        </div>
        <button type="button" className="icon-button new-chat-button" aria-label="Новый чат" onClick={onNewChat}>
          <MessageCircle size={18} />
          <span className="plus-mark">+</span>
        </button>
      </div>

      <div className="sidebar-search">
        <span className="search-glass" aria-hidden="true" />
        <input aria-label="Поиск по чатам" placeholder="Поиск" disabled={!chatId} />
      </div>

      {chatId ? (
        <button type="button" className="chat-list-item is-active" onClick={onOpenChat}>
          <span className="contact-avatar">{(contactName || activePhone).slice(0, 1).toUpperCase()}</span>
          <span className="chat-list-copy">
            <span className="chat-list-name">{contactName || activePhone}</span>
            <span className="chat-list-preview">{lastMessage?.text ?? activePhone}</span>
          </span>
          <span className="chat-list-time">{lastMessageTime}</span>
        </button>
      ) : (
        <div className="sidebar-blank">
          <div className="blank-chat-icon">
            <MessageCircle size={20} />
          </div>
          <p>Ни одного чата</p>
          <span>Создайте новый диалог по номеру телефона.</span>
          <button type="button" onClick={onNewChat}>
            Начать переписку <ArrowUpRight size={14} />
          </button>
        </div>
      )}

      <div className="sidebar-bottom">
        <ShieldCheck size={15} />
        <span>Ваши сообщения под контролем</span>
      </div>
    </aside>
  );
}
