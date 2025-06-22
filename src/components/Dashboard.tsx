
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { AlertBanner } from '@/components/alerts/AlertBanner';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cloud, Thermometer, Droplets, Wind } from 'lucide-react';

export const Dashboard = () => {
  const { t } = useLanguage();

  const currentWeather = {
    temperature: 24,
    humidity: 68,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    location: 'Kigali',
    lastUpdated: new Date().toLocaleString()
  };

  const todayForecast = [
    { time: '6:00', temp: 18, icon: 'sunrise', condition: 'Clear' },
    { time: '12:00', temp: 26, icon: 'sun', condition: 'Sunny' },
    { time: '18:00', temp: 22, icon: 'cloud-sun', condition: 'Partly Cloudy' },
    { time: '24:00', temp: 19, icon: 'moon', condition: 'Clear' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {t('welcome_title', 'MeteoConnect Rwanda')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('welcome_subtitle', 'Real-time weather information and alerts for Rwanda')}
        </p>
      </div>

      {/* Alert Banner */}
      <AlertBanner />

      {/* Current Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeatherCard weather={currentWeather} />
        </div>
        
        {/* Weather Stats */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">{t('temperature', 'Temperature')}</p>
                  <p className="text-2xl font-bold">{currentWeather.temperature}°C</p>
                </div>
                <Thermometer className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-sm">{t('humidity', 'Humidity')}</p>
                  <p className="text-2xl font-bold">{currentWeather.humidity}%</p>
                </div>
                <Droplets className="h-8 w-8 text-cyan-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">{t('wind_speed', 'Wind Speed')}</p>
                  <p className="text-2xl font-bold">{currentWeather.windSpeed} km/h</p>
                </div>
                <Wind className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            {t('today_forecast', "Today's Forecast")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {todayForecast.map((item, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">{item.time}</p>
                <div className="w-12 h-12 mx-auto mb-2 bg-yellow-200 rounded-full flex items-center justify-center">
                  <Cloud className="h-6 w-6 text-yellow-600" />
                </div>
                <p className="font-semibold text-lg">{item.temp}°</p>
                <p className="text-xs text-gray-500">{item.condition}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};
