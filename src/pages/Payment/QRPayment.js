import React, { useState } from 'react';
import './QRPayment.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

function QRPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartTotal = location.state?.cartTotal || 0;
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate QR code scan success
  const handleQRScan = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/menu');
    }, 2000);
  };

  return (
    <div className="qr-payment-container">
      {showSuccess && (
        <div className="payment-success-overlay">
          <div className="payment-success-message">
            <span className="material-symbols-outlined success-icon">check_circle</span>
            <h2>Payment Successful!</h2>
            <p>Thank you for your order</p>
          </div>
        </div>
      )}
      <div className="qr-payment-header">
        <button className="qr-payment-back" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span> Back
        </button>
        <div className="qr-payment-title">QR PAYMENT</div>
        <div className="qr-payment-breadcrumb">
          <span>Home</span>
          <span className="dot">•</span>
          <span className="active">QR Payment</span>
        </div>
      </div>

      <div className="qr-payment-content">
        <div className="qr-code-container">
          <div onClick={handleQRScan} style={{ cursor: 'pointer' }}>
            <QRCodeSVG 
              value={`PAYMENT_${cartTotal}`}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="qr-total-amount">
            Total Amount: <span className="amount">Kr {cartTotal.toFixed(2)}</span>
          </div>
          <div className="qr-scan-instruction">
            Click on QR code to simulate scan
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRPayment; 