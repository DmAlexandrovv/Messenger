import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import type { GreenApiCredentials, InstanceState } from "../types/greenApi";
import {
  Field,
  FieldError,
  Input,
  InputWithAction,
  PrimaryButton,
  PrivacyNote,
  SettingsFormRoot,
  FieldAction,
} from "../styles/SettingsStyles";
import {
  ID_INSTANCE_MAX_DIGITS,
  normalizeCredentials,
  onlyDigits,
  validateCredentials,
  type CredentialsErrors,
} from "../services/credentials";
import { getInstanceState } from "../services/greenApi";

const STATE_ERRORS: Record<Exclude<InstanceState, "authorized">, string> = {
  notAuthorized: "Инстанс найден, но не авторизован. Войдите в Telegram-аккаунт в кабинете GREEN-API.",
  blocked: "Инстанс заблокирован. Обратитесь в поддержку GREEN-API.",
  sleepMode: "Телефон инстанса не в сети. Подключите его и попробуйте снова.",
  starting: "Инстанс ещё запускается. Повторите попытку через минуту.",
  suspended: "Работа инстанса приостановлена - проверьте лимиты тарифа GREEN-API.",
  yellowCard: "Работа инстанса приостановлена - проверьте лимиты тарифа GREEN-API.",
};

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Не удалось проверить инстанс. Попробуйте ещё раз.";
}

interface SettingsFormProps {
  initialCredentials: GreenApiCredentials | null;
  onSave: (credentials: GreenApiCredentials) => void;
}

export function SettingsForm({ initialCredentials, onSave }: SettingsFormProps) {
  const [idInstance, setIdInstance] = useState(initialCredentials?.idInstance ?? "");
  const [apiTokenInstance, setApiTokenInstance] = useState(initialCredentials?.apiTokenInstance ?? "");
  const [apiUrl, setApiUrl] = useState(initialCredentials?.apiUrl ?? "");
  const [showToken, setShowToken] = useState(false);
  const [errors, setErrors] = useState<CredentialsErrors>({});
  const [formError, setFormError] = useState("");
  const [checking, setChecking] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  function resetErrors() {
    setErrors({});
    setFormError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checking) return;

    const credentials = normalizeCredentials({ idInstance, apiTokenInstance, apiUrl });
    setIdInstance(credentials.idInstance);
    setApiTokenInstance(credentials.apiTokenInstance);
    setApiUrl(credentials.apiUrl);

    const fieldErrors = validateCredentials(credentials);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setFormError("");
      return;
    }

    resetErrors();
    setChecking(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const state = await getInstanceState(credentials, controller.signal);
      if (state !== "authorized") {
        setFormError(STATE_ERRORS[state] ?? "Инстанс недоступен: состояние " + state + ".");
        return;
      }
      onSave(credentials);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFormError(errorMessage(error));
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setChecking(false);
      }
    }
  }

  return (
    <SettingsFormRoot onSubmit={handleSubmit} noValidate>
      <Field>
        ID инстанса
        <Input
          autoComplete="username"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={ID_INSTANCE_MAX_DIGITS}
          aria-invalid={Boolean(errors.idInstance)}
          value={idInstance}
          onChange={(event) => {
            setIdInstance(onlyDigits(event.target.value, ID_INSTANCE_MAX_DIGITS));
            resetErrors();
          }}
          placeholder="1101000001"
          required
        />
        {errors.idInstance && <FieldError>{errors.idInstance}</FieldError>}
      </Field>
      <Field>
        Токен API
        <InputWithAction>
          <Input
            autoComplete="current-password"
            type={showToken ? "text" : "password"}
            value={apiTokenInstance}
            onChange={(event) => {
              setApiTokenInstance(event.target.value.trim());
              resetErrors();
            }}
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
          inputMode="url"
          aria-invalid={Boolean(errors.apiUrl)}
          value={apiUrl}
          onChange={(event) => {
            setApiUrl(event.target.value);
            resetErrors();
          }}
          placeholder="https://api.green-api.com"
          required
        />
        {errors.apiUrl && <FieldError>{errors.apiUrl}</FieldError>}
      </Field>
      {formError && <FieldError role="alert">{formError}</FieldError>}
      <PrivacyNote>
        <LockKeyhole size={14} /> Настройки хранятся только в этом браузере.
      </PrivacyNote>
      <PrimaryButton type="submit" disabled={checking}>
        {checking ? (
          <>
            <span className="spinner" /> Проверяем инстанс…
          </>
        ) : (
          <>
            Сохранить и продолжить <ArrowUpRight size={16} />
          </>
        )}
      </PrimaryButton>
    </SettingsFormRoot>
  );
}
