// src/app/layout.js

"use client"; // Add this line

import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import Controls from "@/components/Controls";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Change the theme color for the mobile navigation bar
    const navColor = theme === "dark" ? "#222222" : "#f8f8f8"; // Use appropriate colors
    document.querySelector('meta[name="theme-color"]').setAttribute("content", navColor);
  }, [theme]);

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f8f8f8" /> {/* Default color */}
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
