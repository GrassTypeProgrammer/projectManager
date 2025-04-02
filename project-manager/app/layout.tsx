import { Container, Theme } from '@radix-ui/themes'
import './globals.css'
import './theme-config.css'
import '@radix-ui/themes/styles.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Project manager",
  description: "An app for managing your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={inter.variable}
      >
        <Theme accentColor="grass" grayColor="gray" className={inter.variable}>
          <Navbar />
          <main className='p-5'>
            <Container>
              {children}
            </Container>
          </main>
        </Theme>
      </body>
    </html>
  );
}
