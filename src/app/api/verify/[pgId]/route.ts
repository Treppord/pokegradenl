import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Valideer PG ID formaat
function validatePokegradeId(pgId: string): boolean {
  const pgIdPattern = /^PG-\d{8}-\d{3}$/;
  return pgIdPattern.test(pgId);
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

    console.log(`Verifying PG ID: ${pgId} in Supabase cards table`);

    // Direct zoeken op pokegrade_id veld
    let { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('pokegrade_id', pgId)
      .maybeSingle();

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

    // Return limited public verification data (as per QR_Integration.md spec)
    const verificationResponse = {
      pokegrade_id: data.pokegrade_id,
      card_name: data.card_name,
      set_name: data.set_name,
      year: data.year || 1999,
      grade: data.grade || 0,
      date_graded: data.date_graded || data.created_at,
      language: data.language || 'English',
      verified: true
    };

    return NextResponse.json({
      success: true,
      ...verificationResponse
    });

  } catch (error) {
    console.error('Verify API Error:', error);
    
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
