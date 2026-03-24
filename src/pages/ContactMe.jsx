import { useState } from "react";
import './ContactMe.css';

export default function ContactMe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all fields!");
      return;
    }

    alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    // Here you could send this info to your backend

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="general-contact-page">
      <h1>Contact Me</h1>
      <p>Have a question or just want to reach out? Fill the form below!</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name:
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}