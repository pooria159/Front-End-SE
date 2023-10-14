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
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

