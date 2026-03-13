import './RatingBreakdown.css';

export default function RatingBreakdown({ stats }) {
  const { averageRating, totalReviews, distribution } = stats;

  return (
    <div className="rating-breakdown">
      <div className="rating-big">
        <span className="rating-number">{averageRating?.toFixed(1) || '0.0'}</span>
        <div className="rating-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < Math.round(averageRating) ? 'var(--star)' : 'var(--border)', fontSize: 20 }}>★</span>
          ))}
        </div>
        <span className="rating-total">{totalReviews} review{totalReviews !== 1 ? 's' : ''}</span>
      </div>

      <div className="rating-bars">
        {[5, 4, 3, 2, 1].map(star => {
          const count = distribution?.[star] || 0;
          const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          return (
            <div key={star} className="rating-bar-row">
              <span className="bar-label">{star} ★</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
