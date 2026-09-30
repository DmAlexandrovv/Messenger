export interface IncomingTextNotification {
  receiptId: number;
  body: {
    typeWebhook?: string;
    idMessage?: string;
    timestamp?: number;
    senderData?: {
      chatId?: string;
      senderName?: string;
      chatName?: string;
    };
    messageData?: {
      typeMessage?: string;
      textMessageData?: { textMessage?: string };
      extendedTextMessageData?: { text?: string };
    };
  };
}
