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
        url: "/images/kvrao-art.jpeg",
        width: 4500,
        height: 2700,
        alt: "Lava Rápido KVRÃO — estética automotiva em São José dos Campos",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lava Rápido KVRÃO | Estética Automotiva em São José dos Campos",
    description:
      "Seu carro limpo como novo. Lavagem completa, higienização de bancos e estética automotiva na Vila Tesouro, São José dos Campos.",
    images: ["/images/kvrao-art.jpeg"],
  },
  icons: {
    // PNG transparente primeiro — browsers modernos preferem a ICO cached
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icon-152.png", sizes: "152x152", type: "image/png" },
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
