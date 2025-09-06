'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { 
  QrCodeIcon, 
  CameraIcon,
  XMarkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface QRScannerProps {
  onScan: (qrData: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function QRScanner({ onScan, onClose, isOpen }: QRScannerProps) {
  const [manualInput, setManualInput] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  if (!isOpen) return null;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      // Try to parse as JSON first, if it fails use as PG ID
      try {
        JSON.parse(manualInput);
        onScan(manualInput);
      } catch {
        // Create QR JSON format for PG ID
        const qrData = JSON.stringify({
          pokegrade_id: manualInput.trim().toUpperCase(),
          verification_url: `https://pokegrade.nl/verify/${manualInput.trim().toUpperCase()}`,
          timestamp: new Date().toISOString()
        });
        onScan(qrData);
      }
      setManualInput('');
      setShowManualInput(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <QrCodeIcon className="h-6 w-6 mr-2 text-primary-500" />
                QR Code Scanner
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showManualInput ? (
              <>
                {/* Camera Scanner Placeholder */}
                <div className="bg-neutral-100 rounded-lg p-8 text-center">
                  <CameraIcon className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600 mb-4">
                    QR scanner would appear here.<br/>
                    For now, use manual input below.
                  </p>
                  <p className="text-sm text-neutral-500">
                    Camera integration requires additional dependencies
                  </p>
                </div>

                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowManualInput(true)}
                    className="w-full"
                  >
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    Enter QR Data Manually
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    QR Code JSON or PG ID
                  </label>
                  <textarea
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder='{"pokegrade_id": "PG-20250906-001", ...} or just PG-20250906-001'
                    className="w-full p-3 border border-neutral-300 rounded-lg h-32 text-sm font-mono"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Enter the full QR JSON data or just the PG ID
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowManualInput(false);
                      setManualInput('');
                    }}
                    className="flex-1"
                  >
                    Back to Scanner
                  </Button>
                  <Button
                    type="submit"
                    disabled={!manualInput.trim()}
                    className="flex-1"
                  >
                    Process QR Data
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
