/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5356FF",
        secondary: "#DFF5FF",
        headingColor: "#181A1E",
        textColor: "#4E545F",
        grey: '#F3F3F3',
      },
      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        mainShadow: "0 20px 35px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}