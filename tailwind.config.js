/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        expand: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        expand: "expand 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
