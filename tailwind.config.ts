import type { Config } from "tailwindcss";
import tailwindanimate from "tailwindcss-animate";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui, tailwindanimate],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      "light",
      "dark",
      "retro",
      "luxury",
      "synthwave",
      {
        chinaTheme: {
          primary: "#ce1620",
          "primary-content": "#f5f5f5",
          secondary: "#1f3c83",
          "secondary-content": "#f2c14e",
          accent: "#ff6700",
          "accent-content": "#160400",
          neutral: "#2d5d42",
          "neutral-content": "#cbc9c9",
          "base-100": "#f5f5f5",
          "base-200": "#d8dede",
          "base-300": "#b8bebe",
          "base-content": "#151616",
          info: "#00bbd5",
          "info-content": "#000d10",
          success: "#00ce60",
          "success-content": "#000f03",
          warning: "#ffb400",
          "warning-content": "#160c00",
          error: "#ff829b",
          "error-content": "#160609",
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;
