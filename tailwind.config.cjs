/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      rubik: ["Rubik"],
      poppins: ["Poppins"],
      roboto: ["Roboto"],
    },
    extend: {
      backgroundImage: {
        // maiseduc: "url(/background-1.png)",
        loginBackground: "url('./assets/background-2.png')",
        "mais-gradient": "linear-gradient(90deg, #4263EB 0%, #4263EB00 100%)",
      },
      colors: {
        "dark-purple": "#4263EB",
        "light-white": "#748FFC",
        "dark-theme": "#EDF2FF",
        "white-write": "#dee2e6",
        "blue-write": "#4263EB",
        125: "#4263EB",
      },
      spacing: {
        128: "73rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
