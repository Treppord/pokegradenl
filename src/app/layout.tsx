import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | PokeGrade Nederland",
    default: "PokeGrade Nederland - Professional Pokémon Card Grading",
  },
  description:
    "Professional Pokémon card grading service in the Netherlands. Precision grading, passionately delivered. Get your cards authenticated and graded by certified experts.",
  keywords: [
    "Pokemon card grading",
    "Pokemon cards",
    "card authentication",
    "TCG grading",
    "Nederland",
    "Netherlands",
    "Pokemon collection",
    "card condition",
    "PSA alternative",
  ],
  authors: [{ name: "PokeGrade Nederland" }],
  creator: "PokeGrade Nederland",
  publisher: "PokeGrade Nederland",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pokegrade.nl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PokeGrade Nederland - Professional Pokémon Card Grading",
    description:
      "Professional Pokémon card grading service in the Netherlands. Precision grading, passionately delivered.",
    url: "https://pokegrade.nl",
    siteName: "PokeGrade Nederland",
    images: [
      {
        url: "/assets/img/logo.png",
        width: 1056,
        height: 1056,
        alt: "PokeGrade Nederland Logo",
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PokeGrade Nederland - Professional Pokémon Card Grading",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokeGrade Nederland - Professional Pokémon Card Grading",
    description:
      "Professional Pokémon card grading service in the Netherlands. Precision grading, passionately delivered.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
