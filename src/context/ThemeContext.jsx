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

  // Function to change the Android navigation bar color
  const setNavigationBarColor = (color) => {
    if (typeof window !== 'undefined' && window.navigator.userAgent.includes('Android')) {
      const navMeta = document.querySelector('meta[name="theme-color"]');
      if (!navMeta) {
        const newMeta = document.createElement('meta');
        newMeta.name = "theme-color";
        newMeta.content = color;
        document.head.appendChild(newMeta);
      } else {
        navMeta.setAttribute("content", color);
      }

      // Additional way to set the Android navigation bar color (if necessary)
      if (window.AndroidNavbar) {
        window.AndroidNavbar.setNavigationBarColor(color);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Update the navigation bar color based on the theme
    const newColor = theme === "dark" ? "#000" : "#fff";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", newColor);
    setNavigationBarColor(newColor);  // Set to the appropriate color
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
