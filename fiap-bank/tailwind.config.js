/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        fiapPink: "#e6007e",
        fiapDark: "#121212",
        fiapGray: "#2b2b2b",
        fiapLight: "#f7f7f8"
      },
      backgroundImage: {
        "fiap-gradient": "linear-gradient(135deg, #e6007e 0%, #ff66b2 100%)"
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.45)"
      }
    }
  },
  plugins: []
}
