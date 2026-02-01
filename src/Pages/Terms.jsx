import React from "react";

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Effective Date: January 2026
        </p>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Welcome to <strong>Edenites Academy</strong>. By accessing or using
            our website (<a
              href="https://edenitesacademy.com"
              className="text-green-700 underline"
            >
              https://edenitesacademy.com
            </a>
            ), you agree to be bound by these Terms & Conditions.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Use of the Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a
              manner that does not violate any applicable laws or regulations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
            <p>
              When you create an account, you are responsible for maintaining
              the confidentiality of your login details and all activities
              under your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Payments & Services</h2>
            <p>
              Some courses or services may require payment. All payments are
              final unless otherwise stated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, and
              videos, is the property of Edenites Academy and may not be reused
              without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate access to our
              services at any time if these terms are violated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of
              Nigeria.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <strong>support@edenitesacademy.com</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;
