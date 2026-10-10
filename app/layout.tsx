import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lexus | Investissement",
  description: "Application d'investissement Lexus - FCFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
