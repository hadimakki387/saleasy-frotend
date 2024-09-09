import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Protest Guerrilla", "sans-serif"],
        display: ["Protest Guerrilla", "sans-serif"],
      },
      colors: {
        "item-card-bg": "var(--item-card-bg)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "primary-bg": "var(--primary-bg)",
        "secondary-bg": "var(--secondary-bg)",
        "button-color": "var(--button-color)",
        "top-bottom-bg": "var(--top-bottom-bg)",
        error: "var(--error)",
        success: "var(--success)",
        yellow: "var(--yellow)",
        "primary-text-light": "var(--primary-text-light)",
        "light-gray": "var(--light-gray)",
        "light-gray-text": "var(--light-gray-text)",
        "title-text": "var(--title-text)",
        "sub-title-text": "var(--sub-title-text)",
        "deactivated-text": "var(--deactivated-text)",
        "colored-text": "var(--colored-text)",
        "icon-color": "var(--icon-color)",
        "deactivated-button": "var(--deactivated-button)",
        sidebar: "var(--sidebar)",
        "sidebar-color": "var(--sidebar-color)",
        gray: "var(--gray)",
        "icon-bg": "var(--icon-bg)",
        "dark-text": "var(--dark-text)",
        "primary-transparent": "var(--primary-transparent)",
        hint: "var(--hint)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
