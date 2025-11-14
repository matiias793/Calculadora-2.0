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
  icons: {
    icon: [
      { url: "/logonuevoverde.png", sizes: "any" },
      { url: "/logonuevoverde.png", type: "image/png", sizes: "512x512" },
      { url: "/logonuevoverde.png", type: "image/png", sizes: "192x192" }
    ],
    apple: [
      { url: "/logonuevoverde.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/logonuevoverde.png"
  },
  openGraph: {
    title: "Calculadora de Ingredientes",
    description: "Recetario para comedores escolares",
    images: ["/logonuevoverde.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de Ingredientes",
    description: "Recetario para comedores escolares",
    images: ["/logonuevoverde.png"],
  },
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
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
          <div className="w-1/6 bg-green-400"></div>
          <div className="w-1/6 bg-orange-400"></div>
          <div className="w-1/6 bg-red-400"></div>
          <div className="w-1/6 bg-green-400"></div>
          <div className="w-1/6 bg-yellow-300"></div>
          <div className="w-1/6 bg-violet-400"></div>
        </div>
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen py-3 sm:py-4 md:py-8 px-2 sm:px-4">
          <Providers>
            { children }
          </Providers>
        </div>
      </body>
    </html>
  );
}
