const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
      mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      colors: {
        // Main purple and lighter variants
        'glass-purple': '#4453C3',
        'glass-purple-light-1': '#6975CF',
        'glass-purple-light-2': '#8F98DB',
        'glass-purple-light-3': '#B4BAE7',
        'glass-purple-light-4': '#DADDF3',
        'glass-purple-light-5': '#ECEEF9',
        // blue
        'glass-blue': '#00509D',
        // dark gray/black
        dark: '#0A0A16', // black
        light: '#E5E5E5', // white
        'gray-light': '#A6B0C4', // light grey
        'gray-dark': '#585D6D', // dark grey
        'gray-background': '#EDEFF3',
      },
      height: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      width: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      margin: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      padding: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    content: [
      'components/**/*.{vue,js}',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.{js,ts}',
      'nuxt.config.{js,ts}',
      'content/**/*.md',
    ],
  },
}
