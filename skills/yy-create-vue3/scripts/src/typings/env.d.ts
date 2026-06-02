/// <reference types="vite/client" />

type TNodeEnv = "development" | "production";
type TMode = "test" | "production";
type TDebug = "0" | "1";
type TMock = "0" | "1";
type TNeedAuth = "0" | "1";

declare const __APP_VERSION__: string;
declare const __NODE_ENV__: TNodeEnv;
declare const __MODE__: TMode;
declare const __ENABLE_REPORT__: TDebug;
declare const __MOCK__: TMock;
declare const __NEED_AUTH__: TNeedAuth;
declare const __LOG_LEVEL__: LogLevel;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: TNodeEnv;
    MODE?: TMode;
    ENABLE_REPORT?: TDebug;
    MOCK?: TMock;
    NEED_AUTH?: TNeedAuth;
    LOG_LEVEL?: LogLevel;
  }
}
