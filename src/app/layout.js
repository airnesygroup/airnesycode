import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import Controls from "@/components/Controls";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "hoolicon - What's trending",
  description: "hoolicon – Discover what’s trending now. From viral sensations to breaking news, join millions of viewers and stay in tune with the moments that matter most. Explore the hottest trends with all the live commentary.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body className={inter.className}>
          <AuthProvider>
            <ThemeContextProvider>
              <ThemeProvider>
                <Navbar />
                <div className="container">
                  <div className="wrapper">{children}</div>
                </div>
                <Footer />
                <Controls />
              </ThemeProvider>
            </ThemeContextProvider>
          </AuthProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
