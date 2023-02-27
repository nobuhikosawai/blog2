/** @type {import('tailwindcss').Config} */

const lightAnchor = (theme) => {
  return {
    color: theme('colors.fuchsia.700'),
    textDecoration: 'underline',
  };
};

const darkAnchor = (theme) => {
  return {
    color: theme('colors.fuchsia.300'),
  };
};

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: (theme) => {
        const lightTheme = lightAnchor(theme);
        return {
          DEFAULT: {
            css: {
              a: lightTheme,
            },
          },
        };
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addBase, theme }) {
      const lightTheme = lightAnchor(theme);
      const darkTheme = darkAnchor(theme);

      addBase({
        a: lightTheme,
        'html[data-theme = "dark"]': {
          a: darkTheme,
        },
      });
    },
  ],
  darkMode: ['class', '[data-theme="dark"]'],
};
