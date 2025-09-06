import { Metadata } from 'next';
import LookupClient from '../LookupClient';

interface Props {
  params: { pgId: string };
}

// Validate PG ID format
function validatePokegradeId(pgId: string): boolean {
  const pgIdPattern = /^PG-\d{8}-\d{3}$/;
  return pgIdPattern.test(pgId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pgId = params.pgId.toUpperCase();
  
  if (!validatePokegradeId(pgId)) {
    return {
      title: 'Invalid Card ID - PokeGrade Nederland',
      description: 'The provided card ID format is invalid.',
    };
  }

  return {
    title: `${pgId} Lookup - PokeGrade Nederland`,
    description: `View detailed information and verification for PokeGrade card ${pgId}`,
    openGraph: {
      title: `${pgId} - PokeGrade Nederland`,
      description: `Verified graded Pokémon card information for ${pgId}`,
    },
  };
}

export default function LookupWithId({ params }: Props) {
  return <LookupClient initialPgId={params.pgId} />;
}
