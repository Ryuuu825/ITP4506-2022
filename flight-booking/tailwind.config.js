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
        'min-height': 'min-height 1s ease-out',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-forever': 'fade-in-forever 3s ease-in infinite',
        'fade-in-left': 'fade-in-left 0.5s ease-out',
        'fade-in-right': 'fade-in-right 0.5s ease-out',
        'fade-out-right': 'fade-out-right 0.5s ease-out',
        'loader': 'loader 1.5s linear infinite',
        'success-whto-small': 'success-whto-small 0.5s ease-out',
        'width': 'width 1s ease-out',
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
        'min-height': {
          '0%': { minHeight: '0px' },
          '100%': { minHeight: '100px' },
        },
        'shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-forever': {
          '0%': { opacity: '0.7' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.7' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateX(0%)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0%)' },
        },
        'fade-out-right': {
          '0%': { opacity: '1', transform: 'translateX(0%)' },
          '100%': { opacity: '0', transform: 'translateX(50%)' },
        },
        'loader': {
          '0%': { transform: 'translate3d(0, -1rem, 0)' , opacity: '0' },
          '50%': { transform: 'translate3d(0, 1rem, 0)' , opacity: '1' },
          '100%': { transform: 'translate3d(0, -1rem, 0)' , opacity: '0' },
        },
        'success-whto-small': {
          '0%': { width: '100%', height: '100%' },
          '100%': { width: '50%', height: '50%' }
        },
        'width': {
          '0%': { width: 'h-3/4' },
          '100%': { width: 'h-max' }
        }
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