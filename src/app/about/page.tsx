import React from "react";
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about PokeGrade Nederland - the Netherlands premier Pokémon card grading service. Founded by collectors, powered by expertise and advanced technology.",
  keywords: [
    "about pokegrade",
    "pokemon card grading company",
    "netherlands tcg services",
    "card grading team",
    "pokemon grading history",
    "tcg authentication experts",
    "card collecting netherlands",
  ],
  openGraph: {
    title: "About PokeGrade Nederland",
    description: "Learn about the Netherlands premier Pokémon card grading service. Founded by collectors, powered by expertise.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
