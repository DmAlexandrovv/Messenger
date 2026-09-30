export interface GreenApiCredentials {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
}

export type InstanceState =
  "authorized" | "notAuthorized" | "blocked" | "sleepMode" | "starting" | "suspended" | "yellowCard";
