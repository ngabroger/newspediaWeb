/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/src/**/*.{html,js}",
  "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // Tambahkan warna lainnya jika diperlukan
      },
      fontFamily: {
        glacial: "'Glacial', sans-serif",
        montserrat: "'Montserrat', serif",
        roboto: '"Roboto", sans-serif',
      }
    },
  },
  plugins: [ require('flowbite/plugin')],
}

