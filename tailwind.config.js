/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Figma variables, verbatim
        haas: { red: "#D6001C", white: "#FFFFFF" },
      },
      fontFamily: {
        display: ["Orbitron", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
