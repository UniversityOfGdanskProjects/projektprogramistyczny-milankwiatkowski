/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",     // Dla Next.js z folderem pages
    "./components/**/*.{js,ts,jsx,tsx}", // Dla komponentów
    "./app/**/*.{js,ts,jsx,tsx}",       // Dla App Router
    "./src/**/*.{js,ts,jsx,tsx}",       // Dla folderu src (jeśli istnieje)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
