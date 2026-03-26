import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Header from "@/shared/components/Header/Header";
import "flag-icons/css/flag-icons.min.css";
import "./globals.scss";
import styles from "@/styles/layout.module.scss";
import { Providers } from "@/shared/components/Providers/Providers";
import { PropsWithChildren } from "react";

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
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="es" className={rubik.variable}>
      <body>
        <Providers>
          <div className={styles.layout}>
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
