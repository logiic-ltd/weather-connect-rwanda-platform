
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Layers, Thermometer, CloudRain, Wind, AlertTriangle } from 'lucide-react';

export const MapPage = () => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLayer, setSelectedLayer] = useState('temperature');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Mock map data for Rwanda regions
  const regions = [
    {
      id: 'kigali',
      name: 'Kigali City',
      center: { lat: -1.9706, lng: 30.1044 },
      temperature: 24,
      rainfall: 5,
      windSpeed: 12,
      alerts: ['high-temperature'],
      riskLevel: 'medium'
    },
    {
      id: 'north',
      name: 'Northern Province',
      center: { lat: -1.5, lng: 29.8 },
      temperature: 20,
      rainfall: 15,
      windSpeed: 18,
      alerts: ['heavy-rain'],
      riskLevel: 'high'
    },
    {
      id: 'south',
      name: 'Southern Province',
      center: { lat: -2.3, lng: 29.7 },
      temperature: 26,
      rainfall: 2,
      windSpeed: 8,
      alerts: [],
      riskLevel: 'low'
    },
    {
      id: 'east',
      name: 'Eastern Province',
      center: { lat: -1.8, lng: 30.5 },
      temperature: 28,
      rainfall: 1,
      windSpeed: 10,
      alerts: ['drought-watch'],
      riskLevel: 'medium'
    },
    {
      id: 'west',
      name: 'Western Province',
      center: { lat: -2.0, lng: 29.3 },
      temperature: 22,
      rainfall: 8,
      windSpeed: 14,
      alerts: [],
      riskLevel: 'low'
    }
  ];

  const layers = [
    { id: 'temperature', name: t('temperature', 'Temperature'), icon: Thermometer, color: 'text-red-500' },
    { id: 'rainfall', name: t('rainfall', 'Rainfall'), icon: CloudRain, color: 'text-blue-500' },
    { id: 'wind', name: t('wind', 'Wind Speed'), icon: Wind, color: 'text-green-500' },
    { id: 'alerts', name: t('alerts', 'Alerts'), icon: AlertTriangle, color: 'text-yellow-500' }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getLayerValue = (region: any, layer: string) => {
    switch (layer) {
      case 'temperature': return `${region.temperature}°C`;
      case 'rainfall': return `${region.rainfall}mm`;
      case 'wind': return `${region.windSpeed} km/h`;
      case 'alerts': return region.alerts.length;
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('weather_map', 'Weather Map')}
          </h1>
          <p className="text-gray-600">
            {t('map_subtitle', 'Interactive weather data visualization for Rwanda')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              {t('map_layers', 'Map Layers')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {layers.map(layer => (
              <Button
                key={layer.id}
                variant={selectedLayer === layer.id ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setSelectedLayer(layer.id)}
              >
                <layer.icon className={`h-4 w-4 mr-2 ${layer.color}`} />
                {layer.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Map Area */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('rwanda_weather_map', 'Rwanda Weather Map')}
              <Badge variant="secondary">{selectedLayer}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={mapRef}
              className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
            >
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 opacity-30"></div>
              
              {/* Region Markers */}
              {regions.map(region => (
                <div
                  key={region.id}
                  className={`absolute w-20 h-16 ${getRiskColor(region.riskLevel)} border-2 rounded-lg cursor-pointer hover:shadow-lg transition-all transform hover:scale-105`}
                  style={{
                    left: `${((region.center.lng + 30.5) / 2) * 100}%`,
                    top: `${((region.center.lat + 2.5) / 2) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <div className="p-2 text-center">
                    <p className="text-xs font-semibold truncate">{region.name.split(' ')[0]}</p>
                    <p className="text-sm font-bold">{getLayerValue(region, selectedLayer)}</p>
                    {region.alerts.length > 0 && (
                      <AlertTriangle className="h-3 w-3 text-red-500 mx-auto" />
                    )}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg">
                <h4 className="font-semibold text-sm mb-2">{t('legend', 'Legend')}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-200 border border-red-500 rounded"></div>
                    <span>{t('high_risk', 'High Risk')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-200 border border-yellow-500 rounded"></div>
                    <span>{t('medium_risk', 'Medium Risk')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-200 border border-green-500 rounded"></div>
                    <span>{t('low_risk', 'Low Risk')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note about map simulation */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>{t('note', 'Note')}:</strong> {t('map_simulation_note', 'This is a simplified map visualization. In production, this would integrate with Leaflet.js or similar mapping library with actual GeoJSON data for Rwanda provinces and districts.')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Region Details */}
      {selectedRegion && (
        <Card>
          <CardHeader>
            <CardTitle>
              {regions.find(r => r.id === selectedRegion)?.name} - {t('detailed_info', 'Detailed Information')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const region = regions.find(r => r.id === selectedRegion);
              if (!region) return null;
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Thermometer className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <p className="text-sm text-gray-600">{t('temperature', 'Temperature')}</p>
                    <p className="text-2xl font-bold">{region.temperature}°C</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <CloudRain className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm text-gray-600">{t('rainfall', 'Rainfall')}</p>
                    <p className="text-2xl font-bold">{region.rainfall}mm</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Wind className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm text-gray-600">{t('wind_speed', 'Wind Speed')}</p>
                    <p className="text-2xl font-bold">{region.windSpeed} km/h</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-sm text-gray-600">{t('active_alerts', 'Active Alerts')}</p>
                    <p className="text-2xl font-bold">{region.alerts.length}</p>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
