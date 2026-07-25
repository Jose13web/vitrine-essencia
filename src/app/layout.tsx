import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Vitrine Shopee - Melhores Ofertas e Cupons de Desconto",
    template: "%s | Vitrine Shopee",
  },
  description:
    "Encontre as melhores ofertas, cupons de desconto e promoções da Shopee. Economize em smartphones, eletrônicos, casa, beleza e muito mais.",
  keywords: [
    "shopee",
    "ofertas",
    "cupons",
    "desconto",
    "promoções",
    "cashback",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Vitrine Shopee",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
