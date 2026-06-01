interface Chrome {
  webview?: Webview;
}

interface Webview {
  postMessage<TPayload = unknown>(message: ParamsPostMessage<TPayload>): void;
  addEventListener(eventName: EventName, callback: EventListenerCallback): void;
  removeEventListener(eventName: EventName, callback: EventListenerCallback): void;
}

type EventName = "message";
type EventListenerCallback = (eventData: EventListenerCallbackData) => void;

interface EventListenerCallbackData {
  data: ParamsPostMessage;
}

interface ParamsPostMessage<TPayload = unknown> {
  kind: PostMessageKind;
  requestId?: string;
  topic: PostMessageTopic;
  payload?: TPayload;
}

type PostMessageKind = "request" | "response" | "subscribe" | "unsubscribe";
