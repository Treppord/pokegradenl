import React from "react";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact PokeGrade Nederland for questions about Pokémon card grading services. Get expert support for submissions, pricing, and grading processes.",
  keywords: [
    "contact pokegrade nederland",
    "pokemon card grading support",
    "tcg grading help",
    "card grading questions",
    "pokemon grading contact",
    "netherlands card grading service",
  ],
  openGraph: {
    title: "Contact Us",
    description: "Contact PokeGrade Nederland for expert support with your Pokémon card grading needs.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
