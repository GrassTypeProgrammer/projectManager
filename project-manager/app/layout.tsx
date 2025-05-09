import { Container, Theme } from '@radix-ui/themes'
import './globals.css'
import './theme-config.css'
import '@radix-ui/themes/styles.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';
import { NextAuthProvider } from './components';
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

export default async function RootLayout({
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
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="grass" grayColor="gray" className={inter.variable}>
              <Navbar />
              <main className='p-5'>
                <Container>
                  <NextAuthProvider>
                    {children}
                  </NextAuthProvider>
                </Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
