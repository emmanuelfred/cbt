import React, { useState } from "react";
import { useNewsletterStore } from "../../store/newletterStore";
import { useAuthStore } from "../../store/authStore";
// Dummy function to simulate user login (replace with real auth logic)


function Newsletter() {
      const {  user,isAuthenticated } = useAuthStore();
  
  const [email, setEmail] = useState("");
const name = isAuthenticated ? user.name : 'Student';


  const { subscribe, loading, message, error } = useNewsletterStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    subscribe(email, name);
  };

  return (
    <div
      className="contact-section mt-5 blog-section"
      style={{ backgroundColor: "#20537c", padding: "50px 0" }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="text-center mb-4"
      >
        <h1>Subscribe Our Newsletter</h1>
        <p style={{ color: "#fff" }}>
          Get the latest news about our updates and discounts
        </p>

        <form
          onSubmit={handleSubmit}
          className="footer-section-content-form"
          style={{ width: "95%", maxWidth: 600 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="footer-section-content-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="footer-section-content-button"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p className="mt-3 text-[#f4825d] text-sm">{message}</p>
        )}
        {error && <p className="mt-3 text-red-300 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default Newsletter;
