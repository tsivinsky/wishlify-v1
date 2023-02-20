/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: (theme) => ({
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        primary: "var(--color-primary)",
        error: theme.colors.red[600],
      }),
    },
  },
};
