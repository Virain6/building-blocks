import React, { useRef } from "react";

const GlowBox = () => {
  const containerRef = useRef();

  const handleMouseMove = (e) => {
    const boxes = containerRef.current.querySelectorAll(".hover-box");
    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for mask position
      box.style.setProperty("--x", `${x}px`);
      box.style.setProperty("--y", `${y}px`);
    });
  };

  return (
    <div
      className="bg-gray-100 py-12"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:px-4">
          {["Browse", "Order", "Pick Up"].map((step, index) => (
            <div
              key={index}
              className="hover-box relative p-6 rounded-lg border border-gray-300 sm:mx-2 mx-8"
              style={{
                position: "relative",
                "--x": "0px",
                "--y": "0px",
              }}
            >
              {/* Transparent Border Effect */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg border-2 border-transparent"
                style={{
                  maskImage: `
                    radial-gradient(circle 100px at var(--x) var(--y),
                      white,
                      transparent
                    )`,
                  WebkitMaskImage: `
                    radial-gradient(circle 110px at var(--x) var(--y),
                      white,
                      transparent
                    )`,
                  borderColor: "rgba(255, 165, 0, 0.8)",
                }}
              ></div>
              <h3 className="text-xl font-semibold mb-2">
                Step {index + 1}: {step}
              </h3>
              <p className="text-gray-600">
                {index === 0 &&
                  "Explore our wide range of products to find exactly what you need."}
                {index === 1 &&
                  "Add your desired items to your cart and place your order in just a few clicks."}
                {index === 2 &&
                  "Come down and pick up your items when they're ready."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlowBox;
