/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 16 row grid
        16: "repeat(16, minmax(0, 1fr))",

        // Complex site-specific row configuration
        layout: "100px minmax(800px, 1fr)",
      },
    },
  },
  plugins: [],
}
