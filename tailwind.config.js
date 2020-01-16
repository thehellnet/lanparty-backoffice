module.exports = {
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: {
          light: "var(--color-primary-variant)",
          default: "var(--color-primary)",
          dark: "var(--color-primary-dark)"
        },
        secondary: {
          light: "var(--color-secondary-light)",
          default: "var(--color-secondary)",
          dark: "var(--color-secondary-dark)"
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)"
        },
        error: {
          default: "var(--color-error)"
        },
        background: {
          light: "var(--color-background-light)",
          default: "var(--color-background)",
          dark: "var(--color-background-dark)"
        }
      }
    }
  },
  variants: {
    boxShadow: ["responsive"]
  },
  plugins: [],
  corePlugins: {
    fill: false
  }
};
