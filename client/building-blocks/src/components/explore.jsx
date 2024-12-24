import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { fetchDepartments } from "../utils/departmentApi";
import { fetchSuppliers } from "../utils/supplierApi";
import { searchProducts } from "../utils/productsApi";
import ScrollableProductList from "./scrollable";

const Explore = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchRandomSections = async () => {
      try {
        const departments = await fetchDepartments();
        const suppliers = await fetchSuppliers();

        const randomDepartments = departments
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        const randomSupplier =
          suppliers[Math.floor(Math.random() * suppliers.length)];

        const requests = [
          searchProducts({
            departmentCode: randomDepartments[0]?.departmentCode,
            limit: 4,
          }),
          searchProducts({
            departmentCode: randomDepartments[1]?.departmentCode,
            limit: 4,
          }),
          searchProducts({
            supplierID: randomSupplier?._id,
            limit: 4,
          }),
        ];

        const [department1Response, department2Response, supplierResponse] =
          await Promise.all(requests);

        setSections([
          {
            title: `${randomDepartments[0]?.departmentName || ""}`,
            queryParam: `departmentCode=${randomDepartments[0]?.departmentCode}`,
            products: department1Response.results || [],
          },
          {
            title: `${randomDepartments[1]?.departmentName || ""}`,
            queryParam: `departmentCode=${randomDepartments[1]?.departmentCode}`,
            products: department2Response.results || [],
          },
          {
            title: `${randomSupplier?.supplierName || ""}`,
            queryParam: `supplierID=${randomSupplier?._id}`,
            products: supplierResponse.results || [],
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching sections:", error);
        setLoading(false);
      }
    };

    fetchRandomSections();
  }, []);

  const handleViewMore = (queryParam) => {
    if (queryParam) {
      navigate(`/search?${queryParam}`);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading sections...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold text-center mb-8 mt-3">Explore</h1>
      <hr />
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <ScrollableProductList
            products={section.products}
            title={section.title}
            onViewMore={() => handleViewMore(section.queryParam)}
          />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Explore;
