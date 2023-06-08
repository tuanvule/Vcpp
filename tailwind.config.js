/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveIn: {
          '0%': { right: '-24rem' },
          '100%': { right: '3.5rem' },
        },
        moveNotification: {
          '0%': { right: '-13rem', opcity: '1' },
          '20%': { right: '-0.25rem', opacity: '1'},
          '100%': { opacity: '0', display: 'none'}
        },
        moveSigninModalToLeft: {
          '0%': { margin: 'auto 5rem auto 52%', width: '40%'},
          '100%': { margin: 'auto 52% auto 5rem', width: '40%'},
        },
        moveSignupModalToLeft: {
          '0%': { margin: 'auto 52% auto 5rem', width: '40%'},
          '100%': { margin: 'auto 5rem auto 53.9%', width: '40%'},
        },
        enlarge: {
          '0%': { transform: 'scale(0,0)' },
          '100%': { transform: 'scale(1,1.2)' }
        },  
        
        informationAppears: {
          '0%': { translate : '0 -100%', scale: '0.6' },
          '100%': { translate : '0 0', scale: '1' }
        }
      },
      animation: {
        moveIn: 'moveIn 0.5s ease-in-out',
        moveNotification: 'moveNotification 2s ease-in',
        moveSigninModalToLeft: 'moveSigninModalToLeft .6s ease-in-out',
        moveSignupModalToLeft: 'moveSignupModalToLeft .6s ease-in-out',
        enlarge: 'enlarge .3s ease-in-out',
        informationAppears: 'informationAppears .25s ease-in-out'
      },
    },
  },
  plugins: [],
}
