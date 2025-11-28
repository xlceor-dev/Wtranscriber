import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WTranscriber",
  description: "Transcribe your audio easily, acurate, and free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >     
      <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black">
        <div className="h-20">         
           <Header />
           </div>
          {children}
      </div>
      </body>
    </html>
  );
}
