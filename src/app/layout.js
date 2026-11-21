import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from './storeprovider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bobyan Riders",
  description: "Platform for the riders to preview performance, earning details and many more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://googleapis.com" />
        <link
          rel="preconnect"
          href="https://gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
