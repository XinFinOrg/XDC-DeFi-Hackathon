module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "header":"Locust,sans-serif",
        "fontDM":"DM Sans, sans-serif",
        "fontJost":"Jost, sans-serif"
      },
      colors: {
        "dk-bluish": "#010929",
        "btn-blue": "#00DDE0",
        "btn-purple": "#FB00FF",
        "card-white":"#ffffff40",
        "card-gray":"#3f3e3ed9",
        "card-hover":"#2e2e4d",
        "card-logo":"#40228c",
        "vision":"#000626",
        "comm":"#232643"
      },
      animation: {
        glow: "glow 8s linear infinite",
      },
      keyframes: {
        glow: {
          "100%": { backgroundPosition: "300%" },
        },
      },
      backgroundSize:{
        '300':"300%"
      },
      boxShadow:{
        'card': '0 0 10px 0 rgb(245 245 245 / 36%)'
      }
      
      }
    },
  plugins: [],
};
