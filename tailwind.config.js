import { orange } from '@mui/material/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html ",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logoColor: '#ff4458',cpink:'#fe2c73',corange:'#fe5b3b' // Define your custom color here
      },
    },
  },
  plugins: [],
}

