/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'loginbackground': 'url(./src/assets/login_background.jpg)',
        'loginimage': 'url(./src/assets/LoginPage2.jpg)',
        'signupimage': 'url(./src/assets/signupimage.jpg)',
      },
      colors: {
        pallate: {
          primary: '#FAF1E4',
          secondary: '#CEDEBD',
          Third: '#9EB384',
          fourth: '#435334'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],

}

