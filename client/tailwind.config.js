module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx}"
  ],
  theme: {
    extend: {
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategoy: 'class',
    }),
    require('daisyui'),
    require('@tailwindcss/typography')
  ]
}
