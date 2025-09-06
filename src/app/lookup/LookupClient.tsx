'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { pokegradeService, PokegradeCardData } from '@/services/pokegradeService';
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  StarIcon,
  CalendarDaysIcon,
  IdentificationIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function LookupClient() {
  const { t } = useLanguage();
  const [pgId, setPgId] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState<PokegradeCardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pgId.trim()) {
      setError(t('lookup.invalid_id'));
      return;
    }

    setLoading(true);
    setError(null);
    setCardData(null);
    setSearchPerformed(true);

    try {
      const result = await pokegradeService.lookupCard(pgId.trim().toUpperCase());
      
      if (result.success && result.card) {
        setCardData(result.card);
      } else {
        switch (result.code) {
          case 'INVALID_FORMAT':
            setError(t('lookup.invalid_id'));
            break;
          case 'CARD_NOT_FOUND':
            setError(t('lookup.not_found'));
            break;
          default:
            setError(t('lookup.error'));
        }
      }
    } catch (err) {
      setError(t('lookup.error'));
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setPgId('');
    setCardData(null);
    setError(null);
    setSearchPerformed(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t('common.name') === 'Naam' ? 'nl-NL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 9.5) return 'text-green-600 bg-green-50';
    if (grade >= 8.5) return 'text-blue-600 bg-blue-50';
    if (grade >= 7.5) return 'text-purple-600 bg-purple-50';
    if (grade >= 6.5) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t('lookup.hero_title')}
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('lookup.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MagnifyingGlassIcon className="h-6 w-6 text-primary-500 mr-2" />
                  {t('lookup.hero_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      {t('lookup.pg_id_label')}
                    </label>
                    <Input
                      type="text"
                      value={pgId}
                      onChange={(e) => setPgId(e.target.value)}
                      placeholder={t('lookup.pg_id_placeholder')}
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={loading || !pgId.trim()}
                      className="flex-1"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t('common.loading')}
                        </>
                      ) : (
                        <>
                          <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                          {t('lookup.search_button')}
                        </>
                      )}
                    </Button>
                    
                    {(searchPerformed || error || cardData) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetSearch}
                      >
                        {t('lookup.try_again')}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {searchPerformed && (
        <section className="pb-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Error State */}
              {error && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="flex items-start space-x-4">
                    <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-900 mb-2">
                        {error === t('lookup.invalid_id') && t('lookup.invalid_id')}
                        {error === t('lookup.not_found') && t('lookup.not_found')}
                        {error === t('lookup.error') && t('lookup.error')}
                      </h3>
                      <p className="text-red-700">
                        {error === t('lookup.invalid_id') && t('lookup.invalid_id_desc')}
                        {error === t('lookup.not_found') && t('lookup.not_found_desc')}
                        {error === t('lookup.error') && t('lookup.error_desc')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Success State - Card Information */}
              {cardData && (
                <div className="space-y-6">
                  {/* Header Card */}
                  <Card className="bg-gradient-to-r from-primary-50 to-secondary-50">
                    <CardContent>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="h-8 w-8 text-green-500" />
                          <div>
                            <h2 className="text-2xl font-bold text-neutral-900">
                              {cardData.card_name}
                            </h2>
                            <p className="text-neutral-600">
                              {cardData.pokegrade_id} • {t('lookup.verified')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className={`px-4 py-2 rounded-lg font-bold text-2xl ${getGradeColor(cardData.grade)}`}>
                            <StarIcon className="h-5 w-5 inline mr-1" />
                            {cardData.grade}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <IdentificationIcon className="h-5 w-5 text-primary-500 mr-2" />
                          {t('lookup.card_info')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">{t('lookup.card_name')}:</span>
                          <span className="font-medium">{cardData.card_name}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-neutral-600">{t('lookup.set_name')}:</span>
                          <span className="font-medium">{cardData.set_name}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-neutral-600">{t('lookup.year')}:</span>
                          <span className="font-medium">{cardData.year}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-neutral-600">{t('lookup.language')}:</span>
                          <span className="font-medium">{cardData.language}</span>
                        </div>
                        
                        {cardData.pokemon_number && cardData.pokemon_total && (
                          <div className="flex justify-between">
                            <span className="text-neutral-600">{t('lookup.pokemon_number')}:</span>
                            <span className="font-medium">{cardData.pokemon_number}/{cardData.pokemon_total}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <ShieldCheckIcon className="h-5 w-5 text-primary-500 mr-2" />
                          {t('lookup.grade')} & {t('lookup.date_graded')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-600">{t('lookup.grade')}:</span>
                          <div className={`px-3 py-1 rounded-lg font-bold text-lg ${getGradeColor(cardData.grade)}`}>
                            {cardData.grade}
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-neutral-600">{t('lookup.date_graded')}:</span>
                          <span className="font-medium flex items-center">
                            <CalendarDaysIcon className="h-4 w-4 mr-1" />
                            {formatDate(cardData.date_graded)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-neutral-600">PokeGrade ID:</span>
                          <span className="font-mono text-sm font-medium">{cardData.pokegrade_id}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Subgrades */}
                  {cardData.sub_grades && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <StarIcon className="h-5 w-5 text-primary-500 mr-2" />
                          {t('lookup.subgrades')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <p className="text-neutral-600 text-sm mb-1">{t('lookup.centering')}</p>
                            <div className={`px-3 py-2 rounded-lg font-bold ${getGradeColor(cardData.sub_grades.centering)}`}>
                              {cardData.sub_grades.centering}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-neutral-600 text-sm mb-1">{t('lookup.corners')}</p>
                            <div className={`px-3 py-2 rounded-lg font-bold ${getGradeColor(cardData.sub_grades.corners)}`}>
                              {cardData.sub_grades.corners}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-neutral-600 text-sm mb-1">{t('lookup.edges')}</p>
                            <div className={`px-3 py-2 rounded-lg font-bold ${getGradeColor(cardData.sub_grades.edges)}`}>
                              {cardData.sub_grades.edges}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-neutral-600 text-sm mb-1">{t('lookup.surface')}</p>
                            <div className={`px-3 py-2 rounded-lg font-bold ${getGradeColor(cardData.sub_grades.surface)}`}>
                              {cardData.sub_grades.surface}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* QR Code */}
                  {cardData.qr_code_url && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <QrCodeIcon className="h-5 w-5 text-primary-500 mr-2" />
                          QR Code
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <img
                              src={cardData.qr_code_url}
                              alt={`QR code for ${cardData.card_name}`}
                              className="w-32 h-32"
                            />
                          </div>
                          <div className="text-center sm:text-left">
                            <p className="text-neutral-600 mb-2">
                              Scan deze QR code om snel toegang te krijgen tot deze kaart informatie.
                            </p>
                            <p className="text-sm text-neutral-500">
                              QR code bevat: {cardData.pokegrade_id}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Info Section - Always visible */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-neutral-900 mb-4">
                Hoe werkt PG ID Lookup?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Voer PG ID in
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Typ het PokeGrade ID van je gegraded kaart in het formaat PG-YYYYMMDD-XXX.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Verificatie
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Ons systeem controleert de echtheid en haalt alle kaart informatie op.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Bekijk Details
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Zie alle informatie inclusief grade, subgrades, datum en kaart details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
