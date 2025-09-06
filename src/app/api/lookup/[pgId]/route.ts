import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Valideer PG ID formaat
function validatePokegradeId(pgId: string): boolean {
  const pgIdPattern = /^PG-\d{8}-\d{3}$/;
  return pgIdPattern.test(pgId);
}

// Extract jaar uit set naam
function extractYearFromSet(setName: string): number | null {
  const yearMatch = setName.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? parseInt(yearMatch[0]) : null;
}

// Extract Pokemon nummer uit card nummer
function extractPokemonNumber(cardNumber: string): number | null {
  const numberMatch = cardNumber.match(/^\d+/);
  return numberMatch ? parseInt(numberMatch[0]) : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { pgId: string } }
) {
  const pgId = params.pgId.toUpperCase();

  // Valideer ID formaat
  if (!validatePokegradeId(pgId)) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid PokeGrade ID format',
        code: 'INVALID_FORMAT' 
      },
      { status: 400 }
    );
  }

  try {
    // Supabase client
    const supabase = createClient();

    console.log(`Looking up PG ID: ${pgId} in Supabase cards table`);

    // Direct zoeken op pokegrade_id veld (we zien dat dit bestaat!)
    let { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('pokegrade_id', pgId)
      .maybeSingle();

    console.log('Supabase lookup result:', { data, error });

    console.log('Supabase query result:', { data, error });

    if (error || !data) {
      console.log('Card not found in Supabase:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Card not found',
          code: 'CARD_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Transform Supabase data naar ons response formaat
    // Gebruik de echte veldnamen uit de database
    const cardResponse = {
      pokegrade_id: data.pokegrade_id,
      card_name: data.card_name, // Correct veldnaam uit database
      set_name: data.set_name,
      year: data.year || extractYearFromSet(data.set_name) || 1999,
      grade: data.grade || 0, // Echte grade uit database
      date_graded: data.date_graded || data.created_at,
      language: data.language || 'English',
      pokemon_number: data.pokemon_number || extractPokemonNumber(data.card_number) || 0,
      pokemon_total: data.pokemon_total || 151,
      sub_grades: data.sub_grades, // Echte subgrades uit database
      qr_code_url: data.qr_code_url || `/assets/img/qr/${pgId}.png`,
      verified: true
    };

    return NextResponse.json({
      success: true,
      card: cardResponse
    });

  } catch (error) {
    console.error('Lookup API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        code: 'INTERNAL_ERROR' 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
