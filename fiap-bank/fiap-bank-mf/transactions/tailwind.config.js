import { join } from "path";

/** @type {import('tailwindcss').Config} */
export const content = [
  join(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
  join(__dirname, "./components/**/*.{js,ts,jsx,tsx}"),

  join(__dirname, "../transactions/pages/**/*.{js,ts,jsx,tsx}"),
  join(__dirname, "../transactions/components/**/*.{js,ts,jsx,tsx}"),
  join(__dirname, "../transactions/remotes/**/*.{js,ts,jsx,tsx}"),
];
export const theme = {
  extend: {
    colors: {
      fiapPink: "#e6007e",
      fiapLight: "#fafafa",
    },
  },
};
export const plugins = [];
