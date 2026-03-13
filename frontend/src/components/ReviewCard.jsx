import StarRating from './StarRating.jsx';
import './ReviewCard.css';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  return `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? 's' : ''} ago`;
}

export default function ReviewCard({ review, onDelete }) {
  const { id, reviewerName, reviewerEmail, rating, title, content, verified, createdAt } = review;

  const initials = reviewerName
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="review-card card fade-in">
      <div className="review-card-header">
        <div className="reviewer-avatar">{initials}</div>
        <div className="reviewer-info">
          <div className="reviewer-name">
            {reviewerName}
            {verified && <span className="verified-badge">✓ Verified</span>}
          </div>
          <div className="reviewer-meta">
            <StarRating rating={rating} size={13} />
            <span className="review-date">{createdAt ? timeAgo(createdAt) : ''}</span>
          </div>
        </div>
        {onDelete && (
          <button className="btn btn-danger btn-sm review-delete" onClick={() => onDelete(id)} title="Delete review">
            ✕
          </button>
        )}
      </div>

      <h4 className="review-title">{title}</h4>
      <p className="review-content">{content}</p>
    </div>
  );
}
