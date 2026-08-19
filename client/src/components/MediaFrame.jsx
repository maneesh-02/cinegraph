export function MediaFrame({ src, label, shape = "rect", size, className = "" }) {
  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const shapeClass = shape === "circle" ? "media-circle" : "";

  if (src) {
    return (
      <img
        src={src}
        alt={label}
        className={`media-frame ${shapeClass} ${className}`.trim()}
        style={size ? { width: size, height: size } : undefined}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`media-frame media-placeholder ${shapeClass} ${className}`.trim()}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
