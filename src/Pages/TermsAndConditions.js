import React from 'react';
import Banner from '../Components/Banner/Banner';

const TermsAndConditions = () => {
  return (
    <>
        <Banner title="Terms and Conditions" description="Discover a wide range of expert-led courses tailored to your personal and professional growth."/>
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1>Terms and Conditions</h1>

      <p>Welcome to our platform. By using our services, you agree to the following terms and conditions. Please read them carefully.</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using our website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.
      </p>

      <h2>2. User Responsibilities</h2>
      <p>
        You agree to use our platform only for lawful purposes and in a way that does not infringe the rights of others. You are responsible for maintaining the confidentiality of your account information and password.
      </p>

      <h2>3. Registration</h2>
      <p>
        When you register an account with us, you must provide accurate, complete, and updated information. You are solely responsible for any activity under your account.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All content and materials on our website, including logos, text, graphics, and software, are the property of our company or its licensors. You may not reproduce or distribute any content without our prior written permission.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        We shall not be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the platform. We do not guarantee that our services will be uninterrupted or error-free.
      </p>

      <h2>6. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to our services at any time, without notice or liability, for any reason, including a breach of these terms.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We may update these Terms and Conditions at any time. Continued use of the service after any changes constitutes acceptance of the new terms.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions or concerns about these Terms and Conditions, please contact us at <a href="mailto:support@example.com">support@example.com</a>.
      </p>

      <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        Last updated: May 15, 2025
      </p>
    </div>
    </>

  );
};

export default TermsAndConditions;
