// These are really bad

const tintColorLight = "#eb9797";
const tintColorDark = "#eb9797";

export default {
  defaultTheme: {
    dark: false,
    colors: {
      primary: tintColorLight,
      secondary: "rgb(199, 199, 204)",
      text: '#000',
      background: '#fff',
      tint: tintColorLight,
      tabIconDefault: '#ccc',
      tabIconSelected: '#ccc',
      card:  '#ccc',
      border: '#ccc',
      notification: '#ccc',
    }
  },
  darkTheme: {
    dark: true,
    colors: {
      primary: tintColorDark,
      secondary: "rgb(199, 199, 204)",
      text: '#000',
      background: '#fff',
      tint: tintColorDark,
      tabIconDefault: '#ccc',
      tabIconSelected: '#ccc',
      card:  '#ccc',
      border: '#ccc',
      notification: '#ccc',
    }
  }
};