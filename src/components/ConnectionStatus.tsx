interface ConnectionStatusProps {
  chatId: string;
  isReceiving: boolean;
}

export function ConnectionStatus({ chatId, isReceiving }: ConnectionStatusProps) {
  if (!chatId) return null;

  return (
    <div className="floating-status">
      <span className={"status-pulse" + (isReceiving ? "" : " is-offline")} />
      {isReceiving ? "Подключено" : "Нет связи"}
    </div>
  );
}
