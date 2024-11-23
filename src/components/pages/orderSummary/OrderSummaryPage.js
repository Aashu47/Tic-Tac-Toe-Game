import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext'; // Import cart context
import './OrderSummaryPage.css';
import ButtonElement from '../../elements/button/ButtonElement';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Import a green tick icon

const OrderSummaryPage = () => {
  const { user, name, email } = useAuth(); // Get user info from context
  const { cart } = useContext(CartContext); // Get cart info from context
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate total amount and total products
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalProducts = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Estimated delivery date logic
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5); // Add 5 days for estimated delivery

  // Handle order confirmation navigation
  const handleHomePage = () => {
    navigate('/');
  };

  return (
    <div className="order-summary-page">
      <div className="order-header">
        <AiOutlineCheckCircle className="success-icon" />
        <h2>Order Successfully Placed!</h2>
        <p>Thank you for your purchase, {name}!</p>
      </div>

      <div className="order-details">
        <div className="order-summary">
          <h4>Order Summary:</h4>
          <p><strong>Total Products:</strong> {totalProducts}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
        </div>
        <div className="delivery-info">
          <p><strong>Estimated Delivery Date:</strong> {estimatedDeliveryDate.toDateString()}</p>
        </div>
      </div>

      <div className="order-confirmation">
        <p>Your order is on its way! You’ll receive a notification once your order is dispatched.</p>
        <ButtonElement className="home-button" onClick={handleHomePage}>
          Continue Shopping
        </ButtonElement>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
