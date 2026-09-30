import { LockKeyhole, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
import { StyledSettingsCard } from "../styles/SettingsStyles";

export function ConversationSettings({ children }: { children: ReactNode }) {
  return (
    <StyledSettingsCard>
      <div className="state-icon">
        <Settings2 size={22} />
      </div>
      <span className="eyebrow">ОДИН РАЗ — И ГОТОВО</span>
      <h2>Подключите GREEN-API</h2>
      <p className="state-copy">
        Введите ID и токен инстанса из личного кабинета. Адрес API уже заполнен для стандартного аккаунта.
      </p>
      {children}
      <p className="api-setup-note">
        Для входящих сообщений включите <code>incomingWebhook: yes</code> и оставьте <code>webhookUrl</code> пустым.
      </p>
      <span className="setup-reminder">
        <LockKeyhole size={13} /> Данные сохраняются локально в браузере.
      </span>
    </StyledSettingsCard>
  );
}
