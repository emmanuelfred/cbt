import React from "react";

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Account Deletion – Edenites Academy App
        </h1>

        <p className="text-gray-600 mb-6">
          This page explains how users of the <strong>Edenites Academy App</strong> can request the deletion of their account and associated personal data.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            How to Delete Your Account
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              Send an email to <strong>support@edenitesacademy.com</strong>
            </li>
            <li>
              Use the subject line: <strong>Delete My Account</strong>
            </li>
            <li>
              Include the email address you used to register in the app
            </li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Data That Will Be Deleted
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Email address</li>
            <li>Password (encrypted)</li>
            <li>User profile information</li>
            <li>Any data linked to your account</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Data Retention
          </h2>
          <p className="text-gray-700">
            No personal user data is retained after account deletion. All deletion requests are processed within <strong>7 days</strong>.
          </p>
        </div>

        <div className="border-t pt-4 text-sm text-gray-500">
          <p>
            If you have questions, contact us at <strong>support@edenitesacademy.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
