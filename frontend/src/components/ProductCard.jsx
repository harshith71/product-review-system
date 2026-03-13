import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { id, name, description, category, imageUrl, price, averageRating, totalReviews } = product;

  return (
    <Link to={`/products/${id}`} className="product-card card fade-in">
      <div className="product-card-img">
        {imageUrl
          ? <img src={imageUrl} alt={name} />
          : <div className="product-card-placeholder">{name[0]}</div>
        }
      </div>
      <div className="product-card-body">
        {category && <span className="badge">{category}</span>}
        <h3 className="product-card-name">{name}</h3>
        {description && (
          <p className="product-card-desc">{description.slice(0, 90)}{description.length > 90 ? '…' : ''}</p>
        )}
        <div className="product-card-footer">
          <div className="product-card-rating">
            <StarRating rating={averageRating || 0} size={14} />
            <span className="rating-text">
              {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings'}
              {totalReviews > 0 && <span className="review-count"> ({totalReviews})</span>}
            </span>
          </div>
          {price != null && (
            <span className="product-card-price">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
