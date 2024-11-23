import React from 'react';
import './ProductCardBlock.css';
import { useNavigate} from 'react-router-dom';

function ProductCardBlock({ product }) {

  const history =  useNavigate();

  const navigateToDetails = () => {
    history(`/product/${product.id}`);
  };

  // Function to render star ratings based on product.rating.rate
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <i key={`full-${index}`} className="fas fa-star star-icon"></i>
        ))}
        {halfStars === 1 && <i className="fas fa-star-half-alt star-icon"></i>}
        {[...Array(emptyStars)].map((_, index) => (
          <i key={`empty-${index}`} className="far fa-star star-icon"></i>
        ))}
      </>
    );
  };

  return (
    <div className="product-card-block" onClick={navigateToDetails}>
      <div className="image-container">
        <img src={product.imageUrl} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h4 className="product-title">{product.title}</h4>
        <p className="product-description">
          {product.description.length > 100
            ? product.description.substr(0, 100) + '...'
            : product.description}
        </p>
        <p className="product-price">
          <span className="sale-price">${product.price}</span>
        </p>
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.averageRating)}
          </div>
          <span className="rating-count">({product.ratingCount} reviews)</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCardBlock;
