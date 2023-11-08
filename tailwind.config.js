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
        'Infobackground': 'url(./src/assets/login_background.jpg)',
        'loginimage': 'url(./src/assets/LoginPage2.jpg)',
        'signupimage': 'url(./src/assets/signupimage.jpg)',
      },
      colors: {
        pallate: {
          primary: '#EBE4D1',
          secondary: '#B4B4B3',
          Third: '#26577C',
          fourth: '#E55604'
        }
      },
      animation: {
        'fade-in': 'fade-in 0.75s ease-in forwards',
        'fade-out': 'fade-out 1s ease-out forwards'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],

}

