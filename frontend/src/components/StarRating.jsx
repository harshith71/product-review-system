export default function StarRating({ rating, max = 5, size = 16, interactive = false, onRate }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.round(rating);
        return (
          <span
            key={i}
            onClick={() => interactive && onRate?.(i + 1)}
            style={{
              fontSize: size,
              color: filled ? 'var(--star)' : 'var(--border)',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'color 0.15s',
              userSelect: 'none',
            }}
            title={interactive ? `Rate ${i + 1}` : undefined}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
