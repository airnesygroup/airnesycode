"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Dynamically change the system navigation bar color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (theme === "dark") {
      metaThemeColor.setAttribute("content", "#000000"); // Set dark color for the navigation bar
    } else {
      metaThemeColor.setAttribute("content", "#ffffff"); // Set light color for the navigation bar
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
