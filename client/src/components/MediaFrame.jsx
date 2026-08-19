// Shows a real image when a URL is available (posterUrl for movies, photoUrl
// for actors/directors). Falls back to a styled initials placeholder when
// there isn't one — which, right now, is every seeded entry, since we don't
// bundle real photos or posters (see README). Add your own licensed image
// URLs to the seed data and they'll render automatically, no code changes
// needed.
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
