import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'react-hot-toast'

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Saad Furniture-web", 
  description: "Latest design furniture for your home and office with best quality and price.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased`}
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster  position="bottom-right" toastOptions={{
            style:{
              background:'#000000',
              color:'#ffffff'
            }
          }}/>
        </body>
      </html>
    </ClerkProvider>
  );
}
