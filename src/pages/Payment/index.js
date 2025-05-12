import React, { useState } from 'react';
import './PaymentPage.scss';
import { useNavigate, useLocation } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartTotal = location.state?.cartTotal || 0;
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(true);
  const [showError, setShowError] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setShowError(false);
    
    // Set timeout for 15 seconds
    const timeoutId = setTimeout(() => {
      setIsProcessing(false);
      setShowError(true);
    }, 15000);

    // Simulate payment processing
    setTimeout(() => {
      clearTimeout(timeoutId); // Clear the timeout if payment completes before 15 seconds
      setIsProcessing(false);
      setShowSuccess(true);
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/menu');
      }, 2000);
    }, 1500);
  };

  const handlePaymentMethodSelect = (method) => {
    setShowPaymentMethod(false);
    if (method === 'qr') {
      navigate('/payment/qr', { state: { cartTotal } });
    }
  };

  return (
    <div className="payment-container">
      {showSuccess && (
        <div className="payment-success-overlay">
          <div className="payment-success-message">
            <span className="material-symbols-outlined success-icon">check_circle</span>
            <h2>Payment Successful!</h2>
            <p>Thank you for your order</p>
          </div>
        </div>
      )}
      {showError && (
        <div className="payment-error-overlay">
          <div className="payment-error-message">
            <span className="material-symbols-outlined error-icon">error</span>
            <h2>Payment Timeout</h2>
            <p>Payment process took too long. Please try again.</p>
            <button className="error-retry-btn" onClick={() => setShowError(false)}>Try Again</button>
          </div>
        </div>
      )}
      {showPaymentMethod && (
        <div className="payment-method-overlay">
          <div className="payment-method-modal">
            <h2>Select Payment Method</h2>
            <div className="payment-method-options">
              <button 
                className="payment-method-btn card"
                onClick={() => handlePaymentMethodSelect('card')}
              >
                <span className="material-symbols-outlined">credit_card</span>
                Credit Card
              </button>
              <button 
                className="payment-method-btn qr"
                onClick={() => handlePaymentMethodSelect('qr')}
              >
                <span className="material-symbols-outlined">qr_code_scanner</span>
                QR Code
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="payment-header">
        <button className="payment-back" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span> Back
        </button>
        <div className="payment-title">PAYMENT</div>
        <div className="payment-breadcrumb">
          <span>Home</span>
          <span className="dot">•</span>
          <span className="active">Payment</span>
        </div>
      </div>
      <div className="payment-content">
        <div className="payment-box">
          <div className="payment-business">
            <span className="business-name">Business name</span>
            <div className="payment-amount-group">
              <span className="payment-amount">{cartTotal.toFixed(2)} NOK</span>
              <span className="payment-vat">inc. VAT</span>
            </div>
          </div>
          <div className="payment-testmode">Checkout is running in test mode. Click here for test data.</div>
          <div className="payment-method">
            <span className="method-dot active"></span>
            <span className="method-label">Credit Card</span>
            <span className="method-desc">- credit or debit</span>
            <span className="payment-visa"></span>
            <span className="payment-mastercard"></span>
          </div>
          <div className="payment-form">
            <input className="payment-input" placeholder="Card number" />
            <div className="payment-form-row">
              <input className="payment-input" placeholder="MM/YY" />
              <input className="payment-input" placeholder="CVV" />
            </div>
            <button 
              className={`payment-pay-btn ${isProcessing ? 'processing' : ''}`} 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay NOK ${cartTotal.toFixed(2)}`}
            </button>
          </div>
          <div className="payment-cancel-row">
            <button className="payment-cancel-btn" onClick={() => navigate(-1)}>Cancel payment</button>
          </div>
          <div className="payment-powered">Dinero <span className="checkout">CHECKOUT</span></div>
        </div>
      </div>
    </div>
  );
}

export default Payment; 