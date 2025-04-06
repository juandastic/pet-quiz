import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PostHogProvider } from "../components/PostHogProvider";

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

export const metadata: Metadata = {
  title: "Pet Toy Quiz | Encuentra el juguete ideal para tu mascota",
  description: "Descubre los juguetes perfectos para tu mascota respondiendo unas simples preguntas sobre sus preferencias y personalidad.",
  keywords: "mascotas, juguetes para mascotas, perros, gatos, conejos, quiz, recomendaciones",
  authors: [{ name: "Pet Toy Quiz" }],
  openGraph: {
    title: "Pet Toy Quiz | Encuentra el juguete ideal para tu mascota",
    description: "Descubre los juguetes perfectos para tu mascota respondiendo unas simples preguntas sobre sus preferencias y personalidad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
