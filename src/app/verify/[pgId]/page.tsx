import { redirect } from 'next/navigation';
import { Metadata } from 'next';

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
  
  return {
    title: `Verify ${pgId} - PokeGrade Nederland`,
    description: `Verify the authenticity and view details of PokeGrade card ${pgId}`,
  };
}

export default async function VerifyPage({ params }: Props) {
  const pgId = params.pgId.toUpperCase();

  // Validate the PG ID format
  if (!validatePokegradeId(pgId)) {
    // Redirect to lookup page with error
    redirect(`/lookup?error=invalid_format`);
  }

  // Redirect to lookup page with PG ID in URL path
  redirect(`/lookup/${pgId}`);
}
