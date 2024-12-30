import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-6">
        <strong>Effective Date:</strong> [Insert Date]
      </p>
      <p className="mb-6">
        <strong>Keystone</strong> is committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, and protect your
        information when you use our services.
      </p>

      {/* Section 1: Information We Collect */}
      <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>1.1. Personal Information:</strong> Name, email address, phone
          number, billing address, shipping address.
        </li>
        <li>
          <strong>1.2. Payment Information:</strong> Payment details are
          securely processed by third-party providers.
        </li>
        <li>
          <strong>1.3. Usage Data:</strong> Information about how you interact
          with our platform, including IP address, browser type, and browsing
          behavior.
        </li>
      </ul>

      {/* Section 2: How We Use Your Information */}
      <h2 className="text-2xl font-semibold mb-4">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>2.1.</strong> To process orders and payments.
        </li>
        <li>
          <strong>2.2.</strong> To improve our platform, products, and services.
        </li>
        <li>
          <strong>2.3.</strong> To send transactional emails, such as order
          confirmations or shipping updates.
        </li>
        <li>
          <strong>2.4.</strong> To send promotional emails if you’ve opted in
          (you can opt-out at any time).
        </li>
      </ul>

      {/* Section 3: Sharing Your Information */}
      <h2 className="text-2xl font-semibold mb-4">
        3. Sharing Your Information
      </h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>3.1.</strong> We do not sell your personal information.
        </li>
        <li>
          <strong>3.2.</strong> We may share your information with trusted third
          parties:
          <ul className="list-disc pl-6 mt-2">
            <li>Payment processors.</li>
            <li>Shipping companies.</li>
            <li>Analytics providers.</li>
          </ul>
        </li>
      </ul>

      {/* Section 4: Data Security */}
      <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>4.1.</strong> Keystone uses encryption and secure protocols to
          protect your data.
        </li>
        <li>
          <strong>4.2.</strong> Despite our efforts, no method of data
          transmission is 100% secure. Use our platform at your own risk.
        </li>
      </ul>

      {/* Section 5: Your Rights */}
      <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          You have the right to access and update your personal information.
        </li>
        <li>
          You have the right to request deletion of your personal information
          (subject to legal or contractual obligations).
        </li>
      </ul>

      {/* Section 6: Cookies */}
      <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
      <p className="mb-6">
        We use cookies to enhance your experience. By using Keystone, you
        consent to our use of cookies as outlined in our{" "}
        <a href="/cookie-policy" className="text-blue-500 underline">
          Cookie Policy
        </a>
        .
      </p>

      {/* Section 7: Third-Party Links */}
      <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
      <p className="mb-6">
        Keystone may contain links to third-party websites. We are not
        responsible for the privacy practices or content of those websites.
      </p>

      {/* Section 8: Changes to This Policy */}
      <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time. Updates will be
        posted on this page, with the effective date indicated at the top.
      </p>

      {/* Section 9: Contact Us */}
      <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
      <p className="mb-6">
        For any questions about this Privacy Policy, please contact us at{" "}
        <a
          href="mailto:privacy@keystone.com"
          className="text-blue-500 underline"
        >
          keystonesuppliers@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
