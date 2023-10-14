/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'loginbackground': 'url(./src/assets/login_background.jpg)',
        'loginimage': 'url(./src/assets/LoginPage2.jpg)',
      },
      colors: {
        pallate: {
          primary: '#EBE4D1',
          secondary: '#B4B4B3',
          Third: '#26577C',
          fourth: '#E55604'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],

}

