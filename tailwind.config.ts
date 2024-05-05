import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "on-open-chat": {
          from: { width: "0" },
          to: { width: "100vw" },
        },
        "on-close-chat": {
          from: { width: "100vw" },
          to: { width: "0" },
        },
      },
      animation: {
        "on-open-chat": "on-open-chat 0.5s ease-in-out forwards",
        "on-close-chat": "on-close-chat 0.5s ease-in-out forwards",
      },
      colors: {
        "background-primary": "#161C21",
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
