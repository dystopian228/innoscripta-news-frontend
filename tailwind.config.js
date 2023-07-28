/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      colors: {
        primary: '#463047',
        secondary: '#BEB7A4',
        accent: '#bfb7bf'
      },
      screens: {
        xs: '0px'
      }
    },
  },
}

