// src/app/layout.jsx
import './globals.css'; // THIS IS ESSENTIAL
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = { /* ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head></head>
      <body>
        {children}
      </body>
    </html>
  );
}