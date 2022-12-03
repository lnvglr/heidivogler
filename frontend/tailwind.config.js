const defaultColors = require('tailwindcss/colors')
const stone = {
  '50': 'hsl(46,25%,96%)',
  '100': 'hsl(43,22%,93%)',
  '200': 'hsl(40,18%,90%)',
  '300': 'hsl(38,17%,83%)',
  '400': 'hsl(37,13%,66%)',
  '500': 'hsl(35,10%,52%)',
  '600': 'hsl(30,8%,44%)',
  '700': 'hsl(30,7%,36%)',
  '800': 'hsl(25,9%,28%)',
  '900': 'hsl(25,12%,20%)',
}
const gold = {
  '50': 'hsl(46,80%,95%)',
  '100': 'hsl(43,75%,89%)',
  '200': 'hsl(40,70%,80%)',
  '300': 'hsl(38,60%,71%)',
  '400': 'hsl(37,50%,60%)',
  '500': 'hsl(35,44%,52%)',
  '600': 'hsl(33,35%,44%)',
  '700': 'hsl(30,32%,36%)',
  '800': 'hsl(25,37%,28%)',
  '900': 'hsl(25,39%,20%)',
}
const forest = {
  '50': 'hsl(78, 92%, 95%)',
  '100': 'hsl(80, 80%, 80%)',
  '200': 'hsl(81, 60%, 68%)',
  '300': 'hsl(82, 45%, 55%)',
  '400': 'hsl(83, 40%, 43%)',
  '500': 'hsl(84, 40%, 34%)',
  '600': 'hsl(85, 42%, 25%)',
  '700': 'hsl(86, 45%, 17%)',
  '800': 'hsl(86, 50%, 12%)',
  '900': 'hsl(88, 52%, 9%)',
}
const colors = {
  primary: gold,
  neutral: defaultColors.neutral,
  gold,
  stone,
  info: defaultColors.blue,
  success: forest,
  warning: defaultColors.amber,
  alert: defaultColors.red,
  black: defaultColors.black,
  white: defaultColors.white,
}

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  safelist: [
    ...['1', '2', '3', '4', '5', '6'].map((e) => `col-span-${e}`),
    ...['1', '2', '3', '4', '5', '6'].map((e) => `lg:col-span-${e}`),
    ...['1', '2', '3', '4', '5', '6'].map((e) => `col-start-${e}`),
    ...['1', '2', '3', '4', '5', '6'].map((e) => `lg:col-start-${e}`),
    ...['1', '2', '3', '4', '5', '6'].map((e) => `row-start-${e}`),
    ...['1', '2', '3', '4', '5', '6'].map((e) => `order-${e}`),
  ],
  tailwindcss: {
    viewer: true,
  },
  theme: {
    fontFamily: {
      sans: ['Gramatika', 'sans-serif'],
      display: ['Noe Display', 'Gramatika', 'sans-serif'],
    },
    colors,
    extend: {
      fontSize: {
        '10xl': '160px',
        '11xl': '176px',
        '12xl': '192px',
        '13xl': '208px',
        '14xl': '224px',
        '15xl': '240px',
        '16xl': '256px',
      },
      gridTemplateRows: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].reduce((acc, curr) => {
        return { ...acc, [curr]: `repeat(${curr}, minmax(0, 1fr))` }
      }, {}),
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("tailwindcss-hyphens"),
    require('tailwind-css-variables')({
      screens: false,
      lineHeight: false,
      letterSpacing: false,
      backgroundSize: false,
      boxShadow: false,
      zIndex: false,
      transitionDuration: 'transition-duration',
      transitionProperty: 'transition-property',
      transitionDelay: 'transition-delay',
      transitionDuration: 'transition-duration',
      transitionTimingFunction: 'transition-timing-function',
      outlineStyle: 'outline-style',
      outlineWidth: 'outline-width',
      outlineOffset: 'outline-offset',
      outlineColor: 'outline-color',
    }),
  ],
  darkMode: 'class',
}
