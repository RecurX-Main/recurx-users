import { createContext, useContext } from "react";

// Create a theme context
export const ThemeContext = createContext({
  isBool: Boolean || null,
  themeClasses: {
    backgroudPrimary: String || null
  },
  toggleTheme: () => null,
});

// Export the theme Provider
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Context Error");
  }
  return context;
}
