
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cloud, CloudRain, Sun, MapPin, Calendar, TrendingUp, Droplets, Wind, Eye } from 'lucide-react';

export const ForecastPage = () => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState('kigali');
  const [forecastType, setForecastType] = useState('5day');

  const regions = [
    { value: 'kigali', label: 'Kigali City' },
    { value: 'north', label: 'Northern Province' },
    { value: 'south', label: 'Southern Province' },
    { value: 'east', label: 'Eastern Province' },
    { value: 'west', label: 'Western Province' }
  ];

  const fiveDayForecast = [
    {
      date: 'Today',
      day: 'Monday',
      high: 26,
      low: 18,
      condition: 'Partly Cloudy',
      icon: Cloud,
      precipitation: 20,
      humidity: 65,
      windSpeed: 12,
      visibility: 10
    },
    {
      date: 'Tomorrow',
      day: 'Tuesday',
      high: 24,
      low: 16,
      condition: 'Light Rain',
      icon: CloudRain,
      precipitation: 80,
      humidity: 75,
      windSpeed: 15,
      visibility: 8
    },
    {
      date: 'Wed',
      day: 'Wednesday',
      high: 28,
      low: 19,
      condition: 'Sunny',
      icon: Sun,
      precipitation: 5,
      humidity: 60,
      windSpeed: 10,
      visibility: 15
    },
    {
      date: 'Thu',
      day: 'Thursday',
      high: 25,
      low: 17,
      condition: 'Partly Cloudy',
      icon: Cloud,
      precipitation: 30,
      humidity: 70,
      windSpeed: 14,
      visibility: 12
    },
    {
      date: 'Fri',
      day: 'Friday',
      high: 23,
      low: 15,
      condition: 'Light Rain',
      icon: CloudRain,
      precipitation: 70,
      humidity: 80,
      windSpeed: 18,
      visibility: 7
    }
  ];

  const hourlyForecast = Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    temp: Math.round(18 + Math.sin(i * Math.PI / 12) * 8),
    condition: i >= 6 && i <= 18 ? 'Sunny' : 'Clear',
    icon: i >= 6 && i <= 18 ? Sun : Cloud,
    precipitation: Math.random() * 100
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('weather_forecast', 'Weather Forecast')}
          </h1>
          <p className="text-gray-600">
            {t('forecast_subtitle', 'Detailed weather predictions for your region')}
          </p>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={forecastType} onValueChange={setForecastType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">{t('hourly', '24-Hour Forecast')}</SelectItem>
                  <SelectItem value="5day">{t('5day', '5-Day Forecast')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {forecastType === '5day' ? (
        <div className="space-y-4">
          {fiveDayForecast.map((day, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-lg">{day.date}</h3>
                    <p className="text-gray-600">{day.day}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <day.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{day.condition}</p>
                      <p className="text-sm text-gray-600">{day.precipitation}% rain</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold">{day.high}°</p>
                    <p className="text-gray-600">{day.low}°</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                      <p>{day.humidity}%</p>
                    </div>
                    <div className="text-center">
                      <Wind className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                      <p>{day.windSpeed} km/h</p>
                    </div>
                    <div className="text-center">
                      <Eye className="h-4 w-4 mx-auto mb-1 text-green-500" />
                      <p>{day.visibility} km</p>
                    </div>
                  </div>
                  
                  <div>
                    <Button variant="outline" size="sm" className="w-full">
                      {t('details', 'Details')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t('hourly_forecast', '24-Hour Forecast')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {hourlyForecast.map((hour, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <p className="text-sm text-gray-600 mb-2">{hour.time}</p>
                  <div className="w-8 h-8 mx-auto mb-2 bg-yellow-200 rounded-full flex items-center justify-center">
                    <hour.icon className="h-4 w-4 text-yellow-600" />
                  </div>
                  <p className="font-semibold">{hour.temp}°</p>
                  <p className="text-xs text-gray-500">{Math.round(hour.precipitation)}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agricultural Advisory */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">
            {t('agricultural_advisory', 'Agricultural Advisory')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-green-700">
              <strong>{t('crop_recommendation', 'Crop Recommendation')}:</strong> Good conditions for planting beans and maize this week.
            </p>
            <p className="text-green-700">
              <strong>{t('irrigation_advice', 'Irrigation Advice')}:</strong> Light irrigation recommended for Tuesday due to expected rainfall.
            </p>
            <p className="text-green-700">
              <strong>{t('pest_alert', 'Pest Alert')}:</strong> Monitor for increased pest activity after rainfall period.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
