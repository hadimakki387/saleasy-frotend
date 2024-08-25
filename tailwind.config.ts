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
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "primary-bg": "rgb(230, 230, 230)",
        "secondary-bg": "#ffffff",
        "button-color": "rgb(210, 63, 87)",
        "top-bottom-bg": "#2b3445",
        error: "#ff4d49",
        success: "#72e128",
        yellow: "#ffb304",
        "primary-text-light": "#4c4e64de",
        "light-gray": "rgba(76, 78, 100, 0.12)",
        "light-gray-text": "rgba(76, 78, 100, 0.38)",
        "title-text": "#4b5563",
        "sub-title-text": "#6b7280",
        "deactivated-text": "#9ca3af",
        "colored-text": "#ffffff",
        "icon-color": "#d1d5db",
        "deactivated-button": "#e5e7eb",
        sidebar: "rgba(236, 236, 239, 1)",
        "sidebar-color": "#003f6d",
        gray: "#808080",
        "icon-bg": "#acd3fd",
        "dark-text": "#2f3e4e",
        "primary-transparent": "rgba(2, 119, 189, 0.05)",
        hint: "rgba(76, 78, 100, 0.6)",
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
