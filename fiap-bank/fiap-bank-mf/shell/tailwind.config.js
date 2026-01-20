import { join } from "path";

export const content = [
  join(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
  join(__dirname, "./components/**/*.{js,ts,jsx,tsx}"),
  join(__dirname, "./remotes/**/*.{js,ts,jsx,tsx}"),

  // 🔥 agora o shell enxerga o transactions no container
  join(__dirname, "../transactions/pages/**/*.{js,ts,jsx,tsx}"),
  join(__dirname, "../transactions/components/**/*.{js,ts,jsx,tsx}"),
  join(__dirname, "../transactions/context/**/*.{js,ts,jsx,tsx}"),
  join(__dirname, "../transactions/remotes/**/*.{js,ts,jsx,tsx}"),
];
export const theme = {
  extend: {
    colors: {
      fiapPink: "#e6007e",
      fiapLight: "#fafafa",
    },
    boxShadow: {
      card: "0 10px 30px rgba(0,0,0,0.12)",
    },
    backgroundImage: {
      "fiap-gradient": "linear-gradient(135deg, #000000 0%, #e6007e 100%)",
    },
  },
};
export const plugins = [];
