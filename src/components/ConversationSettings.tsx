import type { ReactNode } from "react";
import { StyledSettingsCard } from "../styles/SettingsStyles";

export function ConversationSettings({ children }: { children: ReactNode }) {
  return (
    <StyledSettingsCard>
      <span className="eyebrow">ОДИН РАЗ - И ГОТОВО</span>
      <h2>Подключите GREEN-API</h2>
      <p className="state-copy">Укажите ID инстанса, токен и адрес API из личного кабинета GREEN-API.</p>
      {children}
    </StyledSettingsCard>
  );
}
