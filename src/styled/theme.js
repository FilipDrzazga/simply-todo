const size = {
  // mobileS: "320px", not in use
  // mobileM: "375px", not in use
  // mobileL: "425px", not in use
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
};

const breakpoints = {
  mobile: `(min-width:${size.mobile})`,
  tablet: `(min-width:${size.tablet})`,
  laptop: `(min-width:${size.laptop})`,
  desktop: `(min-width:${size.desktop})`,
};

const rules = {
  margin: ["0.4rem", "0.9rem", "1.2rem", "1.5rem", "1.8rem", "2.4rem", "2.6rem"],
  padding: ["0rem", "0.3rem", "0.6rem", "0.9rem", "1.2rem", "1.3rem", "1.8rem"],
  fontSizes: ["0.8rem", "1rem", "1.2rem", "1.5rem", "2rem", "3rem"],
  colors: {
    font: {
      primary: "#FAFAFA",
      secondary: "#191919",
      accent: "#474747",
      accentGreen: "#479F45",
      delete: "#EA4335",
    },
    button: {
      primary: "#479F45",
      secondary: "#FAFAFA",
      delete: "#EA4335",
      add: "#479F45",
      checkbox: "#479F45",
    },
    background: {
      primary: "#191919",
      secondary: "#474747",
      white: "#FAFAFA",
      green: "#479F45",
    },
    input: {
      background: "#191919",
      border: "#FAFAFA",
      label: "#FAFAFA",
      placeholder: "#474747",
      font: "#FAFAFA",
      focus: "#1C53F4",
      invalid: "#EA4335",
      valid: "#34A853",
    },
    icon: {
      default: "#FAFAFA",
      delete: "#EA4335",
      checkbox: "#34A853",
      secondary: "#191919",
    },
    borderLine: "#474747",
  },
};

export { rules, breakpoints };
