import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PokeGrade Nederland",
    default: "PokeGrade Nederland - Pokémon Kaarten Grading & Authentication | Professional Pokemon Card Grading Netherlands",
  },
  description:
    "Professional Pokémon card grading service in Netherlands. Expert authentication & grading voor alle Pokémon kaarten. PSA alternative with fast turnaround, competitive prices. Pokémon kaarten laten keuren door gecertificeerde experts.",
  keywords: [
    // Dutch keywords
    "Pokémon kaarten grading Nederland",
    "Pokémon kaarten laten keuren", 
    "Pokemon kaarten authenticatie",
    "TCG grading Nederland",
    "Pokémon kaarten grading kosten",
    "Pokémon kaarten grading Amsterdam",
    "Pokémon kaarten grading Rotterdam", 
    "Pokémon kaarten grading Utrecht",
    // English keywords
    "Pokemon card grading Netherlands",
    "Grade your Pokemon cards in the Netherlands",
    "Pokemon card authentication Netherlands",
    "PSA grading Netherlands",
    "Beckett grading Netherlands",
    "Pokemon card grading cost Netherlands",
    "professional Pokemon card grading NL",
    // General TCG
    "TCG grading service",
    "Pokemon collection Netherlands",
    "card condition grading",
    "Pokemon card value assessment"
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
    languages: {
      'nl-NL': '/nl',
      'en-NL': '/en',
    }
  },
  openGraph: {
    title: "PokeGrade Nederland - Pokémon Kaarten Grading & Pokemon Card Authentication",
    description:
      "Netherlands' trusted Pokémon card grading service. Professional authentication and grading for all Pokemon cards with fast turnaround and competitive pricing.",
    url: "https://pokegrade.nl",
    siteName: "PokeGrade Nederland",
    images: [
      {
        url: "/assets/img/logo.png",
        width: 1056,
        height: 1056,
        alt: "PokeGrade Nederland Logo - Pokémon Card Grading Netherlands",
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PokeGrade Nederland - Professional Pokémon Card Grading Service",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokeGrade Nederland - Pokémon Kaarten Grading & Pokemon Card Authentication",
    description:
      "Netherlands' trusted Pokémon card grading service. Professional authentication and grading with fast turnaround.",
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
  other: {
    // Local Business Schema will be added via JSON-LD script tag
    'geo.region': 'NL',
    'geo.placename': 'Netherlands',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Font preconnect for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PokeGrade Nederland",
              "description": "Professional Pokémon card grading and authentication service in the Netherlands",
              "url": "https://pokegrade.nl",
              "telephone": "+31-20-123-4567",
              "email": "info@pokegrade.nl",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Hoofdstraat 123",
                "addressLocality": "Amsterdam", 
                "postalCode": "1012 AB",
                "addressCountry": "NL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "52.3676",
                "longitude": "4.9041"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Amsterdam"
                },
                {
                  "@type": "City", 
                  "name": "Rotterdam"
                },
                {
                  "@type": "City",
                  "name": "Utrecht"
                },
                {
                  "@type": "City",
                  "name": "Den Haag"
                },
                {
                  "@type": "Country",
                  "name": "Netherlands"
                }
              ],
              "serviceType": [
                "Pokémon card grading",
                "TCG authentication", 
                "Card condition assessment",
                "Pokemon card certification"
              ],
              "priceRange": "€15-€45",
              "openingHours": "Mo-Fr 09:00-17:00",
              "sameAs": [
                "https://facebook.com/pokegradenedarland",
                "https://twitter.com/pokegradnl",
                "https://instagram.com/pokegradenedarland"
              ]
            })
          }}
        />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Hoeveel kost Pokémon kaarten grading in Nederland?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "PokeGrade Nederland biedt grading vanaf €15 per kaart voor de Value service, €25 voor Standard, en €45 voor Premium express service."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "Hoe lang duurt PSA grading in Nederland?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Onze grading services hebben verschillende doorlooptijden: Value (20 werkdagen), Standard (10 werkdagen), Premium (5 werkdagen)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where to grade Pokemon cards in Netherlands?", 
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "PokeGrade Nederland is the leading Pokemon card grading service in the Netherlands, offering professional authentication and grading with multiple service tiers."
                  }
                }
              ]
            })
          }}
        />

        {/* Hreflang tags for multilingual */}
        <link rel="alternate" hrefLang="nl-NL" href="https://pokegrade.nl/nl" />
        <link rel="alternate" hrefLang="en-NL" href="https://pokegrade.nl/en" />
        <link rel="alternate" hrefLang="x-default" href="https://pokegrade.nl" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
