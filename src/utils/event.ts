type EventType = "progress" | "mediaplaying";

export function sendEvent<T>(id: EventType, data: T) {
  const evObj = new CustomEvent(id, {
    detail: data,
  });
  document.dispatchEvent(evObj);
}

export function listenEvent<T>(
  id: EventType,
  cb: (data: T) => void
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document.addEventListener<any>((id), cb);
}

export function unlistenEvent<T>(
  id: EventType,
  cb: (data: T) => void
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document.removeEventListener<any>(id, cb);
}
