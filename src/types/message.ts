export type MessageDirection = "incoming" | "outgoing";

export interface ChatMessage {
  id: string;
  text: string;
  direction: MessageDirection;
  timestamp: number;
  pending?: boolean;
}

export interface ChatContact {
  chatId: string;
  phone: string;
  name: string;
}
