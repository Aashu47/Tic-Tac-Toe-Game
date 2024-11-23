import './CartPage.css';
import React, { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import ButtonElement from '../../elements/button/ButtonElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext); // Add updateCartQuantity
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation to BuyNowPage
  const handleCheckout = () => {
    navigate('/buy-now', { state: { cart } }); // Pass the cart state to the BuyNowPage
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.title} />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>${item.price} x {item.quantity}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1} // Disable decrement button if quantity is 1
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <span> | </span>
                  <span
                    onClick={() => removeFromCart(item.id)}
                    className="delete-icon"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-total">
          <h3>
            Total: $
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </h3>
          <ButtonElement onClick={handleCheckout}>Proceed to Checkout</ButtonElement>
        </div>
      )}
    </div>
  );
}

export default CartPage;
