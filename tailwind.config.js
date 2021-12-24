const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './stories/**/*.js', './safelist.txt'],
  safelist: [
    {
      pattern: /bg-[a-z]{2,}-[0-9]{2,}/, // Background color
      variants: ['hover']
    },
    {
      pattern: /border-[a-z]{2,}-[0-9]{2,}/, // Border color
      variants: ['hover']
    },
    {
      pattern: /text-[a-z]{2,}-[0-9]{2,}/, // Text color
      variants: ['hover']
    },
    {
      pattern: /text-[0-9]?[a-z]{2,}/ // Text size
    },
    {
      pattern: /p[a-z]?-[0-9]{1,}.?[0-9]?/ // Padding (single direction, x or y, or all)
    },
    {
      pattern: /m[a-z]?-[0-9]{1,}.?[0-9]?/ // Margin (single direction, x or y, or all)
    },
    {
      pattern: /ring-[a-z]{2,}-[0-9]{2,}/, // Ring color
      variants: ['hover', 'active']
    },
    {
      pattern: /h-[0-9]{1,}.?[0-9]?/, // Height
      variants: ['hover']
    },
    {
      pattern: /w-[0-9]{1,}.?[0-9]?/ // Width
    },
    {
      pattern: /left-[0-9]{1,}.?[0-9]?/, // left
      variants: ['md']
    }
  ],
  media: false,
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      }
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
