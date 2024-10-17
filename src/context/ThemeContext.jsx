import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set the theme color for mobile browsers
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
  }, [theme]);

  if (mounted) {
    return <div className={theme}>{children}</div>;
  }

  return null; // Or return a loading state
};

export default ThemeProvider;
