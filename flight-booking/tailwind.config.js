/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      animation: {
        'fixed-up': 'fixed-up 1s ease-out',
        'fixed-down': 'fixed-down 1s ease-out',
      },
      keyframes: theme => ({
        'fixed-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'fixed-down': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        
      }),
    },
    colors: {
      transparent: "transparent",
      primary : {
        900: "#3058D2",
        800: "#3A6ED8",
        700: "#4A8DE6",
        600: "#5AA9F4",
        500: "#6AC5FF",
        400: "#7AE1FF",
        300: "#8AFDFF",
        200: "#9BFFFF",
        100: "#ACFFFF",
        light: "#B9F6FF",
        DEFAULT: "#3058D2",
        dark: "#1E3A8A"
      } ,
      success : colors.green,
      danger : colors.red,
      warning : colors.yellow,
      info : colors.blue,
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      pink: colors.pink,
      purple: colors.purple,
      sky: colors.sky,
      teal: colors.teal,
      orange: colors.orange,
      lime: colors.lime,
      amber: colors.amber,
      rose: colors.rose,
      fuchsia: colors.fuchsia,
      violet: colors.violet,
      cyan: colors.cyan,
      coolGray: colors.coolGray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      blueGray: colors.blueGray,
      lightBlue: colors.lightBlue,
      dark: {
        900: "#1E1E1E",
        800: "#2D2D2D",
        700: "#3C3C3C",
        600: "#4B4B4B",
        500: "#5A5A5A",
        400: "#696969",
        300: "#787878",
        200: "#878787",
        100: "#969696"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}