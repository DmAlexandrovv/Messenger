import { X } from "lucide-react";

interface ToastNoticeProps {
  error: string;
  notice: string;
  onDismiss: () => void;
}

export function ToastNotice({ error, notice, onDismiss }: ToastNoticeProps) {
  const message = error || notice;
  if (!message) return null;

  return (
    <div className={"toast " + (error ? "toast-error" : "toast-notice")} role={error ? "alert" : "status"}>
      <span>{message}</span>
      <button type="button" aria-label="Закрыть уведомление" onClick={onDismiss}>
        <X size={16} />
      </button>
    </div>
  );
}
