/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#0A7431",     // Main brand color
        lightGreen: "#37B44A",       // Accent color
        deepForest: "#014925",       // Strong accent or header background
        tealBlue: "#0C6F89",         // Secondary color
        grayNeutral: "#E5E5E5",      // Border/neutral background
      },
    },
  },
  plugins: [],
}
