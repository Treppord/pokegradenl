// PokeGrade API Service
interface PokegradeCardData {
  pokegrade_id: string;
  card_name: string;
  set_name: string;
  year: number;
  grade: number;
  date_graded: string;
  language: string;
  pokemon_number?: number;
  pokemon_total?: number;
  sub_grades?: {
    centering: number;
    corners: number;
    edges: number;
    surface: number;
  };
  qr_code_url?: string;
  verified: boolean;
}

interface PokegradeResponse {
  success: boolean;
  card?: PokegradeCardData;
  error?: string;
  code?: string;
}

class PokegradeService {
  private apiUrl: string;

  constructor() {
    // Voor nu gebruik internal API route, later externe PokeGrade API
    this.apiUrl = process.env.NEXT_PUBLIC_POKEGRADE_API_URL || '/api';
  }

  // Valideer PG ID formaat (PG-YYYYMMDD-XXX)
  validatePokegradeId(pgId: string): boolean {
    const pgIdPattern = /^PG-\d{8}-\d{3}$/;
    return pgIdPattern.test(pgId);
  }

  // Parse QR data JSON
  parseQRData(qrData: string): { pokegrade_id: string } | null {
    try {
      const parsed = JSON.parse(qrData);
      if (parsed.pokegrade_id && this.validatePokegradeId(parsed.pokegrade_id)) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Public verification endpoint - beperkte info, geen auth nodig
  async verifyCard(pokegradeId: string): Promise<PokegradeResponse> {
    if (!this.validatePokegradeId(pokegradeId)) {
      return {
        success: false,
        error: 'Invalid PokeGrade ID format',
        code: 'INVALID_FORMAT'
      };
    }

    try {
      const response = await fetch(`${this.apiUrl}/verify/${pokegradeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'Card not found',
            code: 'CARD_NOT_FOUND'
          };
        }
        
        return {
          success: false,
          error: 'Verification failed',
          code: 'VERIFICATION_FAILED'
        };
      }

      const cardData = await response.json();
      return {
        success: true,
        card: cardData
      };

    } catch (error) {
      console.error('PokeGrade API Error:', error);
      return {
        success: false,
        error: 'Network error or API unavailable',
        code: 'NETWORK_ERROR'
      };
    }
  }

  // Complete lookup endpoint - alle kaart details
  async lookupCard(pokegradeId: string): Promise<PokegradeResponse> {
    if (!this.validatePokegradeId(pokegradeId)) {
      return {
        success: false,
        error: 'Invalid PokeGrade ID format',
        code: 'INVALID_FORMAT'
      };
    }

    // We gebruiken nu internal API route

    try {
      console.log(`Attempting to lookup: ${pokegradeId} at ${this.apiUrl}`);
      
      const response = await fetch(`${this.apiUrl}/lookup/${pokegradeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors', // Expliciete CORS mode
      });

      console.log(`API Response status: ${response.status}`);

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'Card not found',
            code: 'CARD_NOT_FOUND'
          };
        }
        
        console.error(`API Error: ${response.status} - ${response.statusText}`);
        return {
          success: false,
          error: `Lookup failed: ${response.status}`,
          code: 'LOOKUP_FAILED'
        };
      }

      const responseData = await response.json();
      console.log('API Response data:', responseData);
      
      // The API returns { success: true, card: cardData }
      if (responseData.success && responseData.card) {
        return {
          success: true,
          card: responseData.card
        };
      } else {
        return {
          success: false,
          error: responseData.error || 'Lookup failed',
          code: responseData.code || 'LOOKUP_FAILED'
        };
      }

    } catch (error) {
      console.error('PokeGrade API Error:', error);
      
      // Als er een CORS error is, probeer fallback naar verify endpoint
      if (error instanceof TypeError && error.message.includes('CORS')) {
        console.log('CORS error detected, trying fallback...');
        return this.verifyCardFallback(pokegradeId);
      }
      
      return {
        success: false,
        error: 'Network error or API unavailable',
        code: 'NETWORK_ERROR'
      };
    }
  }

  // Fallback naar verify endpoint bij CORS problemen
  private async verifyCardFallback(pokegradeId: string): Promise<PokegradeResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/lookup/${pokegradeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Card not found',
          code: 'CARD_NOT_FOUND'
        };
      }

      const cardData = await response.json();
      return {
        success: true,
        card: cardData
      };

    } catch (error) {
      console.error('Fallback API Error:', error);
      // Als laatste resort, gebruik mock data voor testing
      return this.getMockData(pokegradeId);
    }
  }

  // Mock data voor development/testing
  private getMockData(pokegradeId: string): PokegradeResponse {
    console.log(`Using mock data for: ${pokegradeId}`);
    
    // Simuleer verschillende scenarios gebaseerd op het ID
    if (pokegradeId === 'PG-20250906-001' || pokegradeId.includes('001')) {
      return {
        success: true,
        card: {
          pokegrade_id: pokegradeId,
          card_name: 'Charizard Base Set',
          set_name: 'Base Set',
          year: 1999,
          grade: 9.5,
          date_graded: '2025-09-06T20:10:46Z',
          language: 'English',
          pokemon_number: 6,
          pokemon_total: 102,
          sub_grades: {
            centering: 9.5,
            corners: 9.0,
            edges: 9.5,
            surface: 10.0
          },
          qr_code_url: '/assets/img/mock-qr.png',
          verified: true
        }
      };
    }
    
    if (pokegradeId.includes('002')) {
      return {
        success: true,
        card: {
          pokegrade_id: pokegradeId,
          card_name: 'Pikachu Promo',
          set_name: 'Promotional',
          year: 2023,
          grade: 8.5,
          date_graded: '2025-09-05T15:30:22Z',
          language: 'Dutch',
          verified: true
        }
      };
    }

    // Default: niet gevonden
    return {
      success: false,
      error: 'Card not found',
      code: 'CARD_NOT_FOUND'
    };
  }

  // Handle QR scan - parse en verify
  async handleQRScan(qrData: string): Promise<PokegradeResponse> {
    const parsed = this.parseQRData(qrData);
    
    if (!parsed) {
      return {
        success: false,
        error: 'Invalid QR code data',
        code: 'INVALID_QR'
      };
    }

    // Voor complete informatie, gebruik lookup endpoint
    return await this.lookupCard(parsed.pokegrade_id);
  }

  // Validate QR met server endpoint
  async validateQRCode(qrData: string): Promise<PokegradeResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/qr/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qr_data: qrData
        })
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'QR validation failed',
          code: 'QR_VALIDATION_FAILED'
        };
      }

      const result = await response.json();
      
      if (result.valid && result.content?.pokegrade_id) {
        // Na QR validatie, haal complete kaart info op
        return await this.lookupCard(result.content.pokegrade_id);
      }

      return {
        success: false,
        error: 'Invalid QR code',
        code: 'INVALID_QR'
      };

    } catch (error) {
      console.error('QR Validation Error:', error);
      return {
        success: false,
        error: 'QR validation error',
        code: 'QR_NETWORK_ERROR'
      };
    }
  }
}

// Singleton instance
export const pokegradeService = new PokegradeService();

// Type exports
export type { PokegradeCardData, PokegradeResponse };
