import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import ReduxProvider from "@/store/provider";
import Header from "@/components/layout/Header/Header";
import "flag-icons/css/flag-icons.min.css";
import "./globals.scss";
import styles from "@/styles/layout.module.scss";

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
        <ReduxProvider>
          <div className={styles.layout}>
            <Header />
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
