import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext'; // Import the context to get user info
import { useNavigate } from 'react-router-dom';
import './BuyNowPage.css';
import ButtonElement from '../../elements/button/ButtonElement';

const BuyNowPage = () => {
  const { user, name, email } = useAuth(); // Get user info from context
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); // Payment method state
  const [errors, setErrors] = useState({ address: '', paymentMethod: '' }); // Validation errors

  const navigate = useNavigate();

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};
    if (address.trim().length < 20) {
      newErrors.address = 'Please enter proper address.';
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    // Show a confirmation alert
    alert('Payment successful! Thank you for your purchase.');

    // Navigate to order summary page
    navigate('/order-summary', {
      state: {
        userName: name,
        userEmail: email,
        address: address,
        paymentMethod: paymentMethod,
      },
    });
  };

  if (!user) {
    return (
      <div className="not-logged-in">
        <p>Please log in to proceed with your purchase.</p>
        <button onClick={() => navigate('/login')}>Log In</button>
      </div>
    );
  }

  return (
    <div className="buy-now-page-container">
      <div className="buy-now-page">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <div className="user-info">
            <p><strong>{name}</strong></p>
            <p>{email}</p>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="delivery-section">
            <h3>Delivery Address</h3>
            <textarea
              className="address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              required
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>

          <div className="payment-section">
            <h3>Select a Payment Method</h3>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="credit-card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit Card / Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="debit-card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Net Banking / UPI
              </label>
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="cash-on-delivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
            {errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}
          </div>

          <ButtonElement className="proceed-button" type="submit">Proceed to Payment</ButtonElement>
        </form>
      </div>
    </div>
  );
};

export default BuyNowPage;
