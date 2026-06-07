interface ParamsDoAlert {
  title?: string;
  message: string;
}

type ActionDoAlert = "confirmed" | "closed";

interface ParamsDoToast {
  title?: string;
  message: string;
  duration?: number;
  type: "success" | "error" | "warning" | "info";
}
