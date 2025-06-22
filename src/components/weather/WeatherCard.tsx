
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cloud, MapPin, RefreshCw, Volume2 } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  location: string;
  lastUpdated: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { t } = useLanguage();

  const speakWeather = () => {
    const text = `Current weather in ${weather.location}: ${weather.temperature} degrees celsius, ${weather.condition}. Humidity is ${weather.humidity} percent, wind speed ${weather.windSpeed} kilometers per hour.`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {weather.location}
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {t('current', 'Current')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Cloud className="h-8 w-8" />
            </div>
            <div>
              <p className="text-4xl font-bold">{weather.temperature}°C</p>
              <p className="text-blue-100">{weather.condition}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div>
            <p className="text-blue-100 text-sm">{t('humidity', 'Humidity')}</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">{t('wind_speed', 'Wind Speed')}</p>
            <p className="font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <p className="text-blue-100 text-sm">
            {t('last_updated', 'Last updated')}: {weather.lastUpdated}
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={speakWeather}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
