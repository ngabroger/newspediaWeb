/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/src/**/*.{html,js}"], // Daftar file yang akan diproses oleh Tailwind
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // Anda dapat menambahkan warna lain di sini
      },
      fontFamily: {
        glacial: "'Glacial', sans-serif",
        montserrat: "'Montserrat', serif",
        roboto: '"Roboto", sans-serif',
      },
      animation: {
        "loop-scroll": "loop-scroll 50s linear infinite"
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-100%)" },
        }
      },
    },
  },
  plugins: [],
}
