import { useLocation } from "react-router-dom";
import { useState } from "react";
import './ContactPage.css'

export default function ContactPage() {
  const location = useLocation();
  const { product } = location.state || {};
  const [orderQuantity, setOrderQuantity] = useState({number: 1}); // start at 1
  const [message, setMessage] = useState('');

  if (!product) return <p>No product selected. Go back and select a product first.</p>;

  function handleNuumberChange(e) {
    setOrderQuantity({
      number: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Product ID: ${product.id}\nYou want ${orderQuantity} of "${product.title}".\nMessage: ${message}`);
  };

  return (
    <div className="contact-page">
      <h1>Contact Us about {product.title}</h1>

      <div className="product-summary">
        <img src={product.thumbnail} alt={product.title} width="150" />
        <div>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Unit Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Total Price:</strong> ${product.price * orderQuantity.number}</p> {/* Live total */}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Quantity:
          <input
            type="number"
            min="1" // prevent 0 or negative numbers
            value={orderQuantity.number}
            onChange={handleNuumberChange}
          />
        </label>

        <label>
          Message:
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button type="submit">
          Send Request (${product.price * orderQuantity.number}) {/* Live total in button */}
        </button>
      </form>
    </div>
  );
}