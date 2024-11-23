import './ProductDetailsPage.css';
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonElement from '../../elements/button/ButtonElement';
import { CartContext } from '../../../context/CartContext';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID, GET_PRODUCTS_BY_CATEGORY } from '../../../graphql/queries';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); 
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);// Access addToCart from context

  // Fetch product details by ID
  const { data: productData, loading: productLoading, error: productError } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  // Get current product's category
  const currentCategory = productData?.getProductById?.category;

  // Fetch related products
  const { data: relatedData, loading: relatedLoading, error: relatedError } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { category: currentCategory },
    skip: !currentCategory, // Skip query if category is not available
  });

  // Handle adding product to cart (modified to accept a product argument)
  const handleAddToCartButton = (productToAdd) => {
    addToCart(productToAdd);
    toast.success(`${productToAdd.title} added to cart`);
  };

  const handleCheckout = () => {
    navigate('/buy-now', { state: { cart } }); // Pass the cart state to the BuyNowPage
  };

  if (productLoading || relatedLoading) return <div>Loading...</div>;
  if (productError) return <p>Error loading product: {productError.message}</p>;
  if (relatedError) return <p>Error loading related products: {relatedError.message}</p>;

  const product = productData?.getProductById;
  const relatedProducts = relatedData?.getProductByCategory.slice(0, 6) || [];

  return (
    <div className="product-details-page">
      <div className="product-main-details">
        <img src={product.imageUrl} alt={product.title} className="product-image1" />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="category">{product.category.toUpperCase()}</p>
          <div className="rating">
            <span>{product.averageRating} ★</span>
          </div>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <div className="actions">
            <ButtonElement onClick={() => handleAddToCartButton(product)}>Add to Cart</ButtonElement>
            <ButtonElement onClick={handleCheckout}>Buy Now</ButtonElement>
          </div>
        </div>
      </div>

      <h3>You may also like</h3>
      <div className="related-products">
        {relatedProducts.map((relatedProduct) => (
          <div key={relatedProduct.id} className="related-product-card">
            <img src={relatedProduct.imageUrl} alt={relatedProduct.title} />
            <p>
              {relatedProduct.title.length > 15
                ? relatedProduct.title.substr(0, 15) + '...'
                : relatedProduct.title}
            </p>
            <p>${relatedProduct.price}</p>
            <ButtonElement onClick={() => handleAddToCartButton(relatedProduct)}>Add to Cart</ButtonElement>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
