import React from 'react';
import './FooterSection.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>About Us</h4>
          <p>Your one-stop destination for all your shopping needs. We offer a wide variety of products across different categories.</p>
        </div>
        <div className="footer-column">
      <h4>Follow Us</h4>
      <ul>
        <li>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </li>
        <li>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i> Twitter
          </a>
        </li>
        <li>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i> Facebook
          </a>
        </li>
      </ul>
    </div>

        <div className="footer-column">
          <h4>Office Address</h4>
          <p>Unit-III, Tower 8B, Unitech Infospace, Sector 21, Old Gurugram Road, Gurugram - Haryana 122016</p>
        </div>

        <div className="footer-column ">
          <h4>Contact Us</h4>
          <p id='contact'> +91 9548964983</p>
          <p id='contact'> +121 632397869</p>
          <p id='contact'>support@shopvibe.com</p>
        </div>
       
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SHOPVIBE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
