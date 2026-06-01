type ApiAccountPhase =
  | "restoring_session"
  | "needs_login"
  | "logging_in"
  | "needs_binding"
  | "binding_device"
  | "ready"
  | "blocked"
  | "error";
