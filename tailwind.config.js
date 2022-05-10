module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#6366f1",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
