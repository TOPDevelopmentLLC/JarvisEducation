module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        jarvisPrimary: '#9cb43c',
        unpressedDetailButton: '#000085',
        pressedDetailButton: '#8080c2',
        pressedDefaultButton: '#ceda9e',
      }
    },
  },
  plugins: [],
}
