/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
        "slow-pan": "pan 90s linear infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        pan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
      },
      backgroundImage: {
        "tool-pattern": "url('/src/public/images/tool-pattern.svg')", // Path to the SVG
      },
      backgroundSize: {
        small: "20px 20px",
        medium: "50px 50px",
        large: "100px 100px",
      },
    },
  },
  plugins: [],
};
