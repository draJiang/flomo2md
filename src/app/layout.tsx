import type { Metadata } from "next";
import BackgroundColor from './ui/BackgroundColor'
import Nav from './ui/Nav'
import Footer from './ui/Footer'

import Script from 'next/script'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "flomo2md",
  description: "导出 flomo 笔记为 Markdown 格式",
  // icons: {
  //   icon: "/favicon.ico"
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="zh-CN">
      <head>

        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-CF0HB84XR9`}
        />

        <Script id="google-analytics">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-CF0HB84XR9');
    `}
        </Script>



      </head>
      <body className={inter.className}>
        <BackgroundColor />
        <main className="flex min-h-screen flex-col items-center">
          <Nav />
          <div className="grow">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
