module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}' ,'./stories/**/*.js'],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#6C23EE',
          '900': '#250c52',
          // '900': '#1B093C',
          '800': '#361277',
          // '900': '#0B0418',
          // '800': '#1B093C',
          // '700': '#361277',
          // '600': '#511AB3',
          // '500': '#6C23EE',
          '700': '#511AB3',
          '600': '#6C23EE',
          '500': '#894FF1',
          '400': '#894FF1',
          '300': '#A77BF5',
          '200': '#C4A7F8',
          '100': '#E2D3FC',
          '50': '#F1EAFE'
        }
      }
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
