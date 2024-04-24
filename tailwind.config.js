/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // Tambahkan warna lainnya jika diperlukan
      },
      fontFamily: {
        glacial: "'Glacial', serif",
        montserrat: "'Montserrat', serif",
      }
    },
  },
  plugins: [],
}

