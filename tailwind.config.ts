import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui-kits/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/reactflow/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        mobile: "475px",
      },
      colors: {
        nodetx: "#64748B",
        nodeborder: "#F0F3F7",
        birthborder: "#D4DDE7",
        birthtext: "#2C3647",
        birthlefttxt: "#DCE1E7",
        borderss: "#000",
      },
      fontSize: {
        6: "6px",
        7: "7px",
        8: "8px",
        9: "9px",
        10: "10px",
        13: "13px",
        15: "15px",
        17: "17px",
        22: "22px",
        25: "25px",
        26: "26px",
        28: "28px",
        32: "32px",
        44: "44px",
        60: "60px",
        80: "80px",
        100: "100px",
      },
    },
  },
  plugins: [],
};
export default config;
