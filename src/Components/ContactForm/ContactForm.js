import React from 'react'
import './ContactForm.css'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

function ContactForm() {
    return (
        <div className="contact-wrapper">
          <div className="contact-header">
            <h2>Contact Us Today</h2>
            <p>
              We're here to help you learn and grow. Reach out with your questions, feedback, or collaboration ideas.
            </p>
          </div>
    
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item phone">
                <span>+234 81 07 2796 32</span>
              </div>
              <div className="info-item">
                <span>godwinjunior1771@gmail.com</span>
              </div>
              <div className="info-item location">
                <span>No: 21 Afikpo road</span>
              </div>
              <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.563783401433!2d8.11342187480408!3d6.320883993668557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105ca03e5d0e96f9%3A0x2633497feb9194a2!2s21%20Afikpo%20St%2C%20Azuiyi%20Udene%2C%20Abakaliki%20480251%2C%20Ebonyi!5e0!3m2!1sen!2sng!4v1749223804476!5m2!1sen!2sng"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Location"
                    ></iframe>
                </div>
            </div>
    
            <div className="contact-form">
              <form
                action="mailto:your-email@example.com"
                method="POST"
                encType="text/plain"
              >
                <div>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your full name"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="godwinjunior1771"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject of your message"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
    
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default ContactForm