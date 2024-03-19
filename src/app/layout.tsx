import type { Metadata } from "next";
import Script from 'next/script'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "flomo2md",
  description: "导出 flomo 笔记为 Markdown 格式",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="en">
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
