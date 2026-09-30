import { ArrowUpRight, Settings2 } from "lucide-react";
import type { ReactNode } from "react";

interface AppHeaderProps {
  connected: boolean;
  onSettingsClick: () => void;
}

export function AppHeader({ connected, onSettingsClick }: AppHeaderProps): ReactNode {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Telegram через GREEN-API">
        <span className="brand-mark">
          <ArrowUpRight size={20} strokeWidth={2.4} />
        </span>
        <span>
          telegram<span className="brand-dot">.</span>
        </span>
      </a>
      <span className="service-label">через GREEN-API</span>
      <div className="topbar-spacer" />
      {connected && (
        <button type="button" className="settings-toggle" onClick={onSettingsClick} aria-label="Настройки подключения">
          <Settings2 size={17} />
          <span>Подключение</span>
        </button>
      )}
      <span
        className={"connection-dot" + (connected ? " is-connected" : "")}
        title={connected ? "Настройки заполнены" : "Не подключено"}
      />
    </header>
  );
}
