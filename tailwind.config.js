/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
    },
    extend: {
      colors: {
        primary: "#8b1313",
        primaryDark: "#420904",
        secondary: "#F2F2F2",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(to bottom, #333333 10%, #8b1313 80%, #8b1313 90%)",
      },
    },
  },
  plugins: [],
};
