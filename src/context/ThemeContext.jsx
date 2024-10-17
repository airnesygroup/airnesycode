// ThemeContext.js

"use client";

import { createContext, useEffect, useState } from "react";

const themes = {
  light: {
    backgroundColor: "#ffffff", // Light theme background color
    navBarColor: "#f8f8f8", // Light theme navigation bar color
  },
  dark: {
    backgroundColor: "#000000", // Dark theme background color
    navBarColor: "#222222", // Dark theme navigation bar color
  },
};

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getFromLocalStorage());

  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = themes[theme].backgroundColor;
    document.body.style.setProperty("--nav-bar-color", themes[theme].navBarColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
