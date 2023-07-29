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
        // 'primary': {
        //   default: '#463047',
        //   50: '#f8f4fa',
        //   100: '#efe7f2',
        //   200: '#e4d4e9',
        //   300: '#d0b6da',
        //   400: '#ba93c7',
        //   500: '#ac79b8',
        //   600: '#a266aa',
        //   700: '#965b9a',
        //   800: '#7d4e7f',
        //   900: '#644266',
        //   950: '#463047',
        // },
        secondary: '#BEB7A4',
        accent: '#bfb7bf'
      },
      screens: {
        xs: '0px'
      }
    },
  },
}

