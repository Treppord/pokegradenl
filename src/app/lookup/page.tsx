import React from "react";
import type { Metadata } from "next";
import LookupClient from "./LookupClient";

export const metadata: Metadata = {
  title: "PG ID Lookup - Pokémon Kaart Zoeken | PokeGrade Nederland",
  description:
    "Zoek je gegraded Pokémon kaart op met je PokeGrade ID. Bekijk alle kaart informatie, grade, subgrades en verificatie status. Veilig en snel opzoeken.",
  keywords: [
    // Dutch keywords
    "PG ID lookup Nederland",
    "Pokémon kaart opzoeken",
    "PokeGrade ID zoeken",
    "gegraded kaart informatie",
    "Pokémon kaart verificatie",
    "kaart grade opzoeken",
    "TCG kaart lookup Nederland",
    // English keywords  
    "PG ID lookup Netherlands",
    "Pokemon card lookup",
    "PokeGrade ID search",
    "graded card information",
    "Pokemon card verification",
    "card grade lookup",
    "TCG card search Netherlands",
  ],
  openGraph: {
    title: "PG ID Lookup - Find Your Graded Pokemon Card",
    description: "Search your graded Pokemon card using PokeGrade ID. View all card information, grades, and verification status.",
    url: "/lookup",
  },
};

export default function LookupPage() {
  return <LookupClient />;
}
