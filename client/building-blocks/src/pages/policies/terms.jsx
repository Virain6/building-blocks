import React from "react";

const TermsOfService = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Terms of Service</h1>
      <p className="mb-4">
        <strong>Effective Date:</strong> [Insert Date]
      </p>
      <p className="mb-6">
        Welcome to <strong>Keystone</strong>! These Terms of Service govern your
        use of our website and services. By accessing or using our platform, you
        agree to these terms. If you do not agree, you may not use our services.
      </p>
      <h2 className="text-2xl font-semibold mb-4">1. General Conditions</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Keystone provides an online marketplace for purchasing construction
          products.
        </li>
        <li>You must be at least 18 years old to use our platform.</li>
        <li>
          You agree to provide accurate and current information during
          registration or checkout.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">
        2. Account Responsibilities
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          You are responsible for maintaining the confidentiality of your
          account and password.
        </li>
        <li>
          Keystone is not liable for any loss or damage arising from your
          failure to safeguard your account credentials.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">3. Pricing and Payments</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Prices are listed in CAD and are subject to change without notice.
        </li>
        <li>
          Payments are processed securely through third-party payment
          processors.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">4. Returns and Refunds</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Refunds and returns are only applicable as per our Returns Policy.
        </li>
        <li>
          Customized or perishable construction products may not be eligible for
          returns.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">5. Prohibited Conduct</h2>
      <p>You agree not to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Use Keystone for unlawful purposes.</li>
        <li>Interfere with the platform’s security or functionality.</li>
        <li>Submit false or misleading information.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
      <p className=" pl-6 mb-4">
        {" "}
        All content, logos, and trademarks on Keystone are the property of
        Keystone or its licensors. You may not use any of our intellectual
        property without prior written consent.
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        7. Limitation of Liability
      </h2>
      <p>Keystone is not responsible for:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Delays in product delivery caused by third-party logistics providers.
        </li>
        <li>Inaccuracies in product descriptions from suppliers.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
      <p>These Terms of Service are governed by the laws of Ontario, Canada.</p>

      <p className="mt-4">
        For questions, please contact us at{" "}
        <a href="mailto:support@keystone.com" className="text-blue-500">
          keystonesuppliers@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfService;
