
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check empty spaces
    const isEmpty = Object.values(formData).some(
      (value) => !value.trim()
    );

    if (isEmpty) {
      setError("Please fill all fields properly!");
      return;
    }

    // Success
    setSubmitted(true);
    setError("");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      <section className="contact-hero">
        <p>GET IN TOUCH</p>
        <h1>CONTACT <span>US</span></h1>
        <p>
          Have a question or need help?
          Our team would love to hear from you.
        </p>
      </section>

      <section className="contact-container">

        <div className="contact-info">

          <p className="contact-tag">LET'S CONNECT</p>

          <h2>WE ARE HERE <span>TO HELP</span></h2>

          <p className="contact-description">
            Whether you have questions about tournaments,
            registration or anything else, feel free to
            send us a message.
          </p>

          <div className="contact-info-card">
            <div className="contact-icon">📧</div>
            <div>
              <h3>Email Us</h3>
              <p>Support email coming soon</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">🎮</div>
            <div>
              <h3>Gaming Community</h3>
              <p>Connect with fellow BGMI players.</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">⏰</div>
            <div>
              <h3>Support Hours</h3>
              <p>Support timings will be announced soon.</p>
            </div>
          </div>

        </div>

        <div className="contact-form-box">

          <h2>SEND US A <span>MESSAGE</span></h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {submitted && (
            <div className="success-message">
              Message submitted successfully!
              <br />
              (Frontend demo only — message is not sent.)
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="contact-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter message subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Your Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-submit">
              SEND MESSAGE →
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}

export default Contact;
