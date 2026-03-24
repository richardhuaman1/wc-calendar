import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import ReduxProvider from "@/store/provider";
import "flag-icons/css/flag-icons.min.css";
import "./globals.scss";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calendario Mundial 2026 | Apuesta Total",
  description: "Calendario de apuestas del Mundial FIFA 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={rubik.variable}>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
