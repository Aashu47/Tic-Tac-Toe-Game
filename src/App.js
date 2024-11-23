import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/home/HomePage';
import ProductDetailsPage from './components/pages/product-details/ProductDetailsPage';
import LoginPage from './components/pages/login/LoginPage';
import SignupPage from './components/pages/signup/SignupPage';
import CartPage from './components/pages/cart/CartPage';
import ProfilePage from './components/pages/user-profile/ProfilePage';
import BuyNowPage from './components/pages/buyNow/BuyNowPage';
import OrderSummaryPage from './components/pages/orderSummary/OrderSummaryPage';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import HeaderBlock from './components/blocks/header/HeaderBlock';
import Footer from './components/sections/footer/FooterSection';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <Router>
      <SearchProvider>
      <AuthProvider>
        <div className="app">
          <HeaderBlock />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/buy-now" element={<BuyNowPage />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </AuthProvider>
      </SearchProvider>
      
    </Router>
  );
}

export default App;
