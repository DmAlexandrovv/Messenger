import { useState, type FormEvent } from "react";
import { ArrowUpRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import type { GreenApiCredentials } from "../types/greenApi";
import {
  Field,
  Input,
  InputWithAction,
  PrimaryButton,
  PrivacyNote,
  SettingsFormRoot,
  FieldAction,
} from "../styles/SettingsStyles";

interface SettingsFormProps {
  initialCredentials: GreenApiCredentials | null;
  onSave: (credentials: GreenApiCredentials) => void;
}

export function SettingsForm({ initialCredentials, onSave }: SettingsFormProps) {
  const [idInstance, setIdInstance] = useState(initialCredentials?.idInstance ?? "");
  const [apiTokenInstance, setApiTokenInstance] = useState(initialCredentials?.apiTokenInstance ?? "");
  const [apiUrl, setApiUrl] = useState(initialCredentials?.apiUrl ?? "");
  const [showToken, setShowToken] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
      apiUrl: apiUrl.trim().replace(/\/+$/, ""),
    });
  }

  return (
    <SettingsFormRoot onSubmit={handleSubmit}>
      <Field>
        ID инстанса
        <Input
          autoComplete="username"
          inputMode="numeric"
          value={idInstance}
          onChange={(event) => setIdInstance(event.target.value)}
          placeholder="1101000001"
          required
        />
      </Field>
      <Field>
        Токен API
        <InputWithAction>
          <Input
            autoComplete="current-password"
            type={showToken ? "text" : "password"}
            value={apiTokenInstance}
            onChange={(event) => setApiTokenInstance(event.target.value)}
            placeholder="8asd8asd7321ek..."
            required
          />
          <FieldAction
            type="button"
            aria-label={showToken ? "Скрыть токен" : "Показать токен"}
            title={showToken ? "Скрыть токен" : "Показать токен"}
            onClick={() => setShowToken((value) => !value)}
          >
            {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
          </FieldAction>
        </InputWithAction>
      </Field>
      <Field>
        Адрес API
        <Input
          type="url"
          value={apiUrl}
          onChange={(event) => setApiUrl(event.target.value)}
          placeholder="https://api.green-api.com"
          required
        />
      </Field>
      <PrivacyNote>
        <LockKeyhole size={14} /> Настройки хранятся только в этом браузере.
      </PrivacyNote>
      <PrimaryButton type="submit">
        Сохранить и продолжить <ArrowUpRight size={16} />
      </PrimaryButton>
    </SettingsFormRoot>
  );
}
