import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getFromLocalStorage());

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Update the mobile browser's status bar color based on the theme
    if (theme === "dark") {
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "#000");
      
      // Set the navigation bar color for Android devices
      if (window.navigator.userAgent.includes("Android")) {
        document.documentElement.style.setProperty('--navbar-color', '#000');
      }
    } else {
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "#fff");
      
      // Set the navigation bar color for Android devices
      if (window.navigator.userAgent.includes("Android")) {
        document.documentElement.style.setProperty('--navbar-color', '#fff');
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
