export function Loader({ label = "Loading" }) {
  return (
    <div className="state-block" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>{label}…</p>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", message }) {
  return (
    <div className="state-block">
      <div className="state-title">{title}</div>
      {message && <p>{message}</p>}
    </div>
  );
}

export function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="state-block error" role="alert">
      <div className="state-title">Couldn't load this</div>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
