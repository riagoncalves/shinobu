const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    fontFamily: {
      'main': ['Montserrat', 'sans-seriff'],
    },
    backgroundSize: {
      '100%': '100%',
    },
    extend: {
      colors: {
        'brand': '#d49100',
        'secondary': '#d42700',
      },
      zIndex: {
        '1': '1',
        '100': '100',
      },
    },
  },
  plugins: [],
};
