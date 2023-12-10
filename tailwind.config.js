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
        'loginimage': 'url(/src/assets/loginimage.jpg)',
        'signupimage': 'url(/src/assets/signupimage.jpg)',
        'chatimage': 'url(/src/assets/chat.jpg)',
      },
      colors: {
        pallate: {
          primary: '#222831',
          secondary: '#393E46',
          third: '#00ADB5',
          fourth: '#EEEEEE'
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

