/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cat: ["Catamaran", "sans-serif"],
        pacific: ["Pacifico", "cursive"],
      },
      colors: {
        darkBlue: "#030637",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
