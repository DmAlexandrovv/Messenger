import type { GreenApiCredentials } from "../types/greenApi";

export const ID_INSTANCE_MAX_DIGITS = 20;

type ValidatedField = "idInstance" | "apiUrl";
export type CredentialsErrors = Partial<Record<ValidatedField, string>>;

export function onlyDigits(value: string, maxLength: number): string {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

function normalizeApiUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed || /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)) return trimmed;
  return "https://" + trimmed;
}

export function normalizeCredentials(values: GreenApiCredentials): GreenApiCredentials {
  return {
    idInstance: values.idInstance.trim(),
    apiTokenInstance: values.apiTokenInstance.trim(),
    apiUrl: normalizeApiUrl(values.apiUrl),
  };
}

export function validateCredentials(values: GreenApiCredentials): CredentialsErrors {
  const errors: CredentialsErrors = {};

  if (!/^\d+$/.test(values.idInstance)) {
    errors.idInstance = "ID инстанса состоит только из цифр.";
  }

  let url: URL | null = null;
  try {
    url = new URL(values.apiUrl);
  } catch {
    url = null;
  }
  if (!url || (url.protocol !== "https:" && url.protocol !== "http:") || !url.hostname.includes(".")) {
    errors.apiUrl = "Адрес API должен быть ссылкой вида https://api.green-api.com";
  }

  return errors;
}
