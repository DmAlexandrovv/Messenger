import { endpoint } from "./endpoint";
import type { GreenApiCredentials } from "../types/greenApi";
import type { IncomingTextNotification } from "../types/notification";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new Error("Не удалось связаться с GREEN-API. Проверьте сеть, apiUrl и настройки CORS.");
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const apiError = payload as { message?: string; error?: string; reason?: string; details?: string } | null;
    const detail = apiError?.message ?? apiError?.error ?? apiError?.reason ?? apiError?.details;
    throw new Error(detail ? "GREEN-API: " + detail : "GREEN-API вернул ошибку " + response.status + ".");
  }

  return payload as T;
}

export async function findTelegramChat(
  credentials: GreenApiCredentials,
  phoneNumber: string,
): Promise<{ chatId: string; username?: string }> {
  const result = await request<{ exist?: boolean; chatId?: string; username?: string; reason?: string }>(
    endpoint(credentials, "checkAccount"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: Number(phoneNumber) }),
    },
  );

  if (!result.exist || !result.chatId)
    throw new Error(result.reason ?? "Для этого номера не найден доступный аккаунт Telegram.");
  return { chatId: result.chatId, username: result.username };
}

export async function sendTextMessage(
  credentials: GreenApiCredentials,
  chatId: string,
  message: string,
): Promise<{ idMessage: string }> {
  const result = await request<{ idMessage?: string }>(endpoint(credentials, "sendMessage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, message }),
  });
  if (!result?.idMessage) throw new Error("GREEN-API не вернул идентификатор отправленного сообщения.");
  return { idMessage: result.idMessage };
}

export async function receiveNotification(
  credentials: GreenApiCredentials,
  signal: AbortSignal,
): Promise<IncomingTextNotification | null> {
  const result = await request<IncomingTextNotification | null>(
    endpoint(credentials, "receiveNotification", "?receiveTimeout=10"),
    { signal },
  );
  if (result === null) return null;
  if (
    typeof result !== "object" ||
    typeof result.receiptId !== "number" ||
    typeof result.body !== "object" ||
    result.body === null
  ) {
    throw new Error("GREEN-API вернул уведомление в неизвестном формате.");
  }
  return result;
}

export async function deleteNotification(credentials: GreenApiCredentials, receiptId: number): Promise<void> {
  await request(endpoint(credentials, "deleteNotification", "/" + receiptId), { method: "DELETE" });
}

export function getIncomingText(notification: IncomingTextNotification): string | null {
  const data = notification.body.messageData;
  if (data?.typeMessage === "textMessage") return data.textMessageData?.textMessage?.trim() || null;
  if (data?.typeMessage === "extendedTextMessage") return data.extendedTextMessageData?.text?.trim() || null;
  return null;
}
