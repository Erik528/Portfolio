import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const siteIcon = encodeURI("/assets/0508-网页logo_画板 1.png");

export const metadata: Metadata = {
  title: "Erik Wu Portfolio",
  description: "Senior Designer & Creative Director",
  icons: {
    icon: [{ url: siteIcon, type: "image/png" }],
    apple: [{ url: siteIcon, type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
