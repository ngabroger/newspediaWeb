/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/app/src/admin/**/*.{html,js}",
  "./node_modules/flowbite/**/*.js",
  "public/app/resource/js/common/**/*.js"
  ],
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
  plugins: [ require('flowbite/plugin')],
}
