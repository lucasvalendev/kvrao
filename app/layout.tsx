import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kvrao.vercel.app"),
  title: "Lava Rápido KVRÃO | Estética Automotiva em São José dos Campos",
  description:
    "Seu carro limpo como novo. Lavagem completa, higienização de bancos e estética automotiva na Vila Tesouro, São José dos Campos. Chega sujo, sai brilhando.",
  openGraph: {
    title: "Lava Rápido KVRÃO | Estética Automotiva em São José dos Campos",
    description:
      "Seu carro limpo como novo. Lavagem completa, higienização de bancos e estética automotiva na Vila Tesouro, São José dos Campos. Chega sujo, sai brilhando.",
    url: "/",
    siteName: "Lava Rápido KVRÃO",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        // WhatsApp/FB leem og:image — não o favicon
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Lava Rápido KVRÃO — mascote e carro",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lava Rápido KVRÃO | Estética Automotiva em São José dos Campos",
    description:
      "Seu carro limpo como novo. Lavagem completa, higienização de bancos e estética automotiva na Vila Tesouro, São José dos Campos.",
    images: ["/og.png"],
  },
  icons: {
    // NÃO usar app/favicon.ico — Next injeta /favicon.ico sem hash e trava cache.
    // Path único + v=4 força browser/CDN a pegar a caveira nova.
    icon: [
      { url: "/favicon.ico?v=5", sizes: "any", type: "image/x-icon" },
      { url: "/kvrao.ico?v=5", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16.png?v=5", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png?v=5", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png?v=5", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg?v=5", type: "image/svg+xml" },
      { url: "/icon-192.png?v=5", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=5", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png?v=5", sizes: "180x180", type: "image/png" },
      { url: "/icon-152.png?v=5", sizes: "152x152", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#12141c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`bg-background ${anton.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
