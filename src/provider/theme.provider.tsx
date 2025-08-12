import { ThemeContext } from "@/context/theme.context";
import { ReactNode, useEffect, useState } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<Boolean | null>(null);

  // Get the theme from local storage and if not exist set it
  useEffect(() => {
    const theme = window.localStorage.getItem("theme-recurx");
    if (!theme) {
      window.localStorage.setItem("theme-recurx", JSON.stringify(false));
      setIsDark(false);
    } else {
      console.log(theme);
      setIsDark(JSON.parse(theme));
    }
  }, []);

  // Toggle the theme of the site
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    let theme = window.localStorage.getItem("theme-recurx");
    if (theme) {
      window.localStorage.setItem("theme-recurx", JSON.stringify(isDark));
    }
  };

  // Theme classes
  const themeClasses = {
    backgroudPrimary: isDark ? "bg-[#030C11]" : "bg-[#EBF8FF]",
  };

  const Value = {
    isDark,
    toggleTheme,
    themeClasses,
  };

  return (
    <ThemeContext.Provider value={Value}>{children}</ThemeContext.Provider>
  );
};
