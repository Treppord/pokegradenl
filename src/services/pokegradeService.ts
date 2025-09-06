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
    // In production, deze zou vanuit environment variables komen
    this.apiUrl = process.env.NEXT_PUBLIC_POKEGRADE_API_URL || 'https://api.pokegrade.nl';
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

    try {
      const response = await fetch(`${this.apiUrl}/api/v1/lookup/${pokegradeId}`, {
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
          error: 'Lookup failed',
          code: 'LOOKUP_FAILED'
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
