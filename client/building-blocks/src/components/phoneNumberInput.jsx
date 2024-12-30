import React, { useState } from "react";

const PhoneNumberInput = ({ onPhoneNumberChange }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");

    // Format the number dynamically
    if (cleanedValue.length <= 3) {
      return `(${cleanedValue}`;
    } else if (cleanedValue.length <= 6) {
      return `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(3)}`;
    } else {
      return `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(
        3,
        6
      )}-${cleanedValue.slice(6, 10)}`;
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Format the phone number
    const formatted = formatPhoneNumber(inputValue);
    setPhoneNumber(formatted);

    // Pass the cleaned number to the parent
    onPhoneNumberChange(inputValue.replace(/\D/g, ""));
  };

  return (
    <div className="mb-4">
      <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
        Phone Number (Optional)
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="(123) 456-7890"
        value={phoneNumber}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-md text-gray-800"
      />
    </div>
  );
};

export default PhoneNumberInput;
