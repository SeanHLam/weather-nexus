/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fountain-blue": {
          50: "#f0fbfb",
          100: "#daf3f3",
          200: "#b9e6e8",
          300: "#89d4d7",
          400: "#48b4bb",
          500: "#369ca4",
          600: "#307f8a",
          700: "#2c6872",
          800: "#2b565f",
          900: "#284951",
        },
      },
    },
  },
  plugins: [],
};


