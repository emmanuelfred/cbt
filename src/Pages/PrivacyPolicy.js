import React from 'react';
import Banner from '../Components/Banner/Banner';

const PrivacyPolicy = () => {
  return (
    <>
   
     <Banner title="Privacy Policy" description="Discover a wide range of expert-led courses tailored to your personal and professional growth."/>
     <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1>Privacy Policy</h1>

      <p>
        This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services. By using our platform, you consent to the practices described in this policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following information when you register or use our services:</p>
      <ul>
        <li>Full name (first, last, surname)</li>
        <li>Email address and phone number</li>
        <li>Username and password</li>
        <li>Residential address, state, and country</li>
        <li>IP address and browser/device information</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>Your data is used for the following purposes:</p>
      <ul>
        <li>To create and manage your account</li>
        <li>To provide and improve our services</li>
        <li>To contact you with updates or promotional content (only if you opt-in)</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>3. How We Protect Your Information</h2>
      <p>
        We implement industry-standard security measures such as encryption and access controls to protect your data. However, no online platform is 100% secure, and we cannot guarantee absolute protection.
      </p>

      <h2>4. Sharing of Information</h2>
      <p>
        We do not sell or rent your personal data. We may share it only:
        <ul>
          <li>With trusted third-party service providers who help operate our services</li>
          <li>When required by law or to protect our legal rights</li>
        </ul>
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. You may also opt out of receiving promotional messages by contacting us.
      </p>

      <h2>6. Cookies and Tracking Technologies</h2>
      <p>
        We may use cookies and similar tracking tools to enhance user experience, analyze trends, and administer the website. You can control cookie preferences in your browser settings.
      </p>

      <h2>7. Children's Privacy</h2>
      <p>
        Our services are not intended for users under the age of 13. We do not knowingly collect personal information from children.
      </p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>
        We reserve the right to update this policy at any time. Any changes will be posted on this page with an updated date.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@example.com">privacy@example.com</a>.
      </p>

      <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        Last updated: May 15, 2025
      </p>
    </div>
    </>
   
  );
};

export default PrivacyPolicy;
