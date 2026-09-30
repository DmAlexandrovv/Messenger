import type { GreenApiCredentials } from "../types/greenApi";

export function endpoint(credentials: GreenApiCredentials, method: string, suffix = ""): string {
  const baseUrl = credentials.apiUrl.trim().replace(/\/+$/, "");
  const id = encodeURIComponent(credentials.idInstance.trim());
  const token = encodeURIComponent(credentials.apiTokenInstance.trim());
  return baseUrl + "/waInstance" + id + "/" + method + "/" + token + suffix;
}
