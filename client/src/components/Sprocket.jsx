// The signature structural device: a strip of sprocket holes, standing
// in for a physical film strip. Used to mark real seams between sections
// rather than as pure decoration.
export function Sprocket() {
  return (
    <div className="sprocket-row" aria-hidden="true">
      <div className="sprocket-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
