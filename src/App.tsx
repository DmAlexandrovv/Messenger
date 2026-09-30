import { Component, type ErrorInfo, type ReactNode } from "react";
import { AppHeader } from "./components/AppHeader";
import { ChatSidebar } from "./components/ChatSidebar";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { ConversationPanel } from "./components/ConversationPanel";
import { ToastNotice } from "./components/ToastNotice";
import { useChatController } from "./hooks/useChatController";
import { AppShell, ChatLayout } from "./styles/LayoutStyles";
import GlobalStyles from "./styles/GlobalStyles";
import type { ConversationScreen } from "./types/ui";

function getScreen(connected: boolean, showNewChat: boolean, chatId: string): ConversationScreen {
  if (!connected) return "settings";
  if (showNewChat) return "new-chat";
  if (chatId) return "chat";
  return "empty";
}

function ChatApplication() {
  const chat = useChatController();
  const screen = getScreen(Boolean(chat.credentials), chat.showNewChat, chat.chatId);

  return (
    <>
      <GlobalStyles />
      <AppShell>
        <AppHeader connected={Boolean(chat.credentials)} onLogout={chat.logout} />

        <ChatLayout className={!chat.credentials ? "chat-layout auth-layout" : undefined} aria-label="Чат Telegram">
          {chat.credentials && (
            <ChatSidebar
              contactName={chat.contactName}
              activePhone={chat.activePhone}
              chatId={chat.chatId}
              messages={chat.messages}
              mobileHidden={chat.mobileChatOpen}
              onNewChat={() => {
                chat.setShowNewChat(true);
                chat.clearNotification();
              }}
              onOpenChat={() => chat.setMobileChatOpen(true)}
            />
          )}

          <ConversationPanel
            screen={screen}
            credentials={chat.credentials}
            phoneInput={chat.phoneInput}
            activePhone={chat.activePhone}
            contactName={chat.contactName}
            messages={chat.messages}
            draft={chat.draft}
            isReceiving={chat.isReceiving}
            mobileChatOpen={chat.mobileChatOpen}
            connecting={chat.connecting}
            sending={chat.sending}
            scrollRef={chat.scrollRef}
            onSaveCredentials={chat.saveCredentials}
            onPhoneChange={chat.setPhoneInput}
            onCreateChat={chat.createChat}
            onDraftChange={chat.setDraft}
            onSendMessage={chat.sendMessage}
            onResetChat={chat.resetChat}
            onBack={() => chat.setMobileChatOpen(false)}
            onCancelNewChat={() => chat.setShowNewChat(false)}
            onCreateNewChat={() => chat.setShowNewChat(true)}
          />
        </ChatLayout>

        <ToastNotice error={chat.error || chat.receiveError} notice={chat.notice} onDismiss={chat.clearNotification} />
        <ConnectionStatus chatId={chat.chatId} isReceiving={chat.isReceiving} />
      </AppShell>
    </>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Не удалось отобразить интерфейс чата", error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="fatal-error" role="alert">
        <h1>Не удалось открыть чат</h1>
        <p>Обновите интерфейс и попробуйте снова.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Обновить страницу
        </button>
      </main>
    );
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ChatApplication />
    </ErrorBoundary>
  );
}
