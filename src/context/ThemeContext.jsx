"use client"; // Ensures this file is treated as a Client Component

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
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
  };

  const setNavigationBarColor = (color) => {
    if (typeof window !== 'undefined' && window.navigator.userAgent.includes('Android')) {
      const navMeta = document.querySelector('meta[name="theme-color"]');
      if (navMeta) {
        navMeta.setAttribute("content", color);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const newColor = theme === "dark" ? "#000" : "#fff";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", newColor);
    setNavigationBarColor(newColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
