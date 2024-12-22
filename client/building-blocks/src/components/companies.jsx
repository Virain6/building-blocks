import React from "react";

const CompanyList = () => {
  const companies = [
    "Schlute Systems",
    "Moen",
    "Aria",
    "Toolway",
    "Siemens",
    "Tesla",
    "Netflix",
    "Adobe",
    "Intel",
    "NVIDIA",
  ];

  return (
    <div className="container mx-auto text-center mb-8">
      <h2 className="text-3xl font-bold mb-6">Companies we Work With</h2>
      <div className="overflow-x-auto">
        <div className="flex justify-start space-x-6 items-center py-4 px-4 sm:pl-10">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-orange-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
