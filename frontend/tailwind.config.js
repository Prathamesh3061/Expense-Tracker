/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all your React components
  ],
  theme: {
    extend: {
      colors: {
        // Here is your custom color palette from the video
        'dark-primary': '#222731',     // Main body background
        'dark-secondary': '#2A3140',    // Card/Nav background
        'dark-tertiary': '#333947',     // Input background / hover
        'primary': '#3498db',           // Main blue
        'primary-hover': '#2980b9',     // Main blue (hover)
        'success': '#2ecc71',           // Green
        'danger': '#e74c3c',            // Red
        'danger-hover': '#c0392b',      // Red (hover)
        'text-light': '#ccc',           // Light gray text
        'text-white': '#ffffff',
      }
    },
  },
  plugins: [],
}