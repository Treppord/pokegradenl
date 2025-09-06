import { NextRequest, NextResponse } from 'next/server';

// Valideer PG ID formaat
function validatePokegradeId(pgId: string): boolean {
  const pgIdPattern = /^PG-\d{8}-\d{3}$/;
  return pgIdPattern.test(pgId);
}

// Parse en valideer QR data JSON
function parseQRData(qrData: string): any {
  try {
    const parsed = JSON.parse(qrData);
    
    // Controleer of vereiste velden aanwezig zijn
    if (!parsed.pokegrade_id) {
      return null;
    }
    
    // Valideer PG ID formaat
    if (!validatePokegradeId(parsed.pokegrade_id)) {
      return null;
    }
    
    return parsed;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qr_data } = body;

    if (!qr_data) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Missing qr_data parameter'
        },
        { status: 400 }
      );
    }

    // Parse en valideer QR data
    const parsedContent = parseQRData(qr_data);
    
    if (!parsedContent) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Invalid QR code data format'
        },
        { status: 400 }
      );
    }

    // Controleer timestamp freshness (optioneel)
    if (parsedContent.timestamp) {
      const qrTimestamp = new Date(parsedContent.timestamp);
      const now = new Date();
      const hoursDiff = (now.getTime() - qrTimestamp.getTime()) / (1000 * 60 * 60);
      
      // QR codes ouder dan 24 uur markeren als waarschuwing (maar nog steeds geldig)
      if (hoursDiff > 24) {
        console.log(`QR code is ${hoursDiff.toFixed(1)} hours old`);
      }
    }

    // Return gevalideerde QR content
    return NextResponse.json({
      valid: true,
      content: {
        pokegrade_id: parsedContent.pokegrade_id,
        verification_url: parsedContent.verification_url,
        grade: parsedContent.grade,
        card_name: parsedContent.card_name,
        date_graded: parsedContent.date_graded,
        set_name: parsedContent.set_name,
        year: parsedContent.year,
        timestamp: parsedContent.timestamp
      }
    });

  } catch (error) {
    console.error('QR Validation Error:', error);
    
    return NextResponse.json(
      {
        valid: false,
        error: 'QR validation failed'
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
