import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/store/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const poppinsFont = localFont({
  src: [ 
    {
      path: "./fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Poppins/Poppins-Bold.ttf",
      weight: "600",
    }
  ]
});


export const metadata: Metadata = {
  title: "Calculadora de Ingredientes",
  description: "Recetario para comedores escolares",
  manifest: "/manifest.json",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${ poppinsFont.className } ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-row h-2">
          <div className="w-1/6 bg-blue-400"></div>
          <div className="w-1/6 bg-orange-400"></div>
          <div className="w-1/6 bg-red-400"></div>
          <div className="w-1/6 bg-green-400"></div>
          <div className="w-1/6 bg-yellow-300"></div>
          <div className="w-1/6 bg-violet-400"></div>
        </div>
        <div className="bg-green-50 min-h-screen py-2 md:py-8 md:px-0 px-4">
          <Providers>
            { children }
          </Providers>
        </div>
      </body>
    </html>
  );
}
