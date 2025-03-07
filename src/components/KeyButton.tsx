function triggerButton(button: string) {
  const event = new KeyboardEvent("keydown", {
    key: button,
    code: `Key${button}`,
    keyCode: button.charCodeAt(0),
    which: button.charCodeAt(0),
    bubbles: true,
    cancelable: true,
    composed: true,
  });
  window.dispatchEvent(event);
}

export default function KeyButton({ action, disabled=false }: { action: string, disabled?: boolean }) {
  return (
    <button onClick={() => triggerButton(action)} disabled={disabled}>{action.toLocaleUpperCase()}</button>
  );
}
