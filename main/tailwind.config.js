module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'text-dark': '#E0E0E0',
        'background-dark': '#2B0E0E',
        'primary-dark': '#FFC107',
        'text-light': '#333333',
        'background-light': '#FFFDF4',
        'primary-light': '#E69138',
        'secondary': '#FF5E3E',
        'accent': '#B71C1C',
        'light-green': '#E8F5E9',
        'main-green': '#4CAF50',
        'dark-green': '#388E3C',
      },
    },
  },
  plugins: [],
}