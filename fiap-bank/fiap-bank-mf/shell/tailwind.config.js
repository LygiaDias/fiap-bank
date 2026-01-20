/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./remotes/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    // layout
    "container",
    "min-h-screen",
    "flex",
    "grid",
    "items-center",
    "justify-center",
    "justify-between",
    "gap-2",
    "gap-3",
    "gap-4",
    "p-2",
    "p-4",
    "p-6",
    "p-8",
    "px-4",
    "px-6",
    "py-2",
    "py-3",
    "mb-3",
    "mb-4",
    "mb-6",
    "mb-8",
    "rounded-lg",
    "rounded-2xl",
    "rounded-3xl",
    "shadow",
    "shadow-lg",
    "border",

    // cores usadas no transactions
    "bg-fiapLight",
    "text-fiapPink",
    "bg-fiapPink",
    "text-white",
    "text-gray-500",
    "text-gray-600",
    "text-gray-400",
    "text-green-600",
    "text-red-600",

    // responsivo
    "md:grid-cols-2",
    "md:grid-cols-3",
    "md:grid-cols-4",
    "md:flex-row",
    "md:w-56",

    // hovers comuns
    "hover:bg-pink-600",
  ],

  theme: {
    extend: {
      colors: {
        fiapPink: "#e6007e",
        fiapLight: "#fafafa",
      },
      backgroundImage: {
        "fiap-gradient": "linear-gradient(135deg, #000000 0%, #e6007e 100%)",
      },
    },
  },
  plugins: [],
};
