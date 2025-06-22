
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, X, MapPin } from 'lucide-react';

export const AlertBanner = () => {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'warning',
      title: 'Heavy Rain Warning',
      message: 'Heavy rainfall expected in Northern Province. Take necessary precautions.',
      region: 'Northern Province',
      isActive: true,
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'info',
      title: 'Temperature Advisory',
      message: 'High temperatures expected today. Stay hydrated and avoid direct sunlight.',
      region: 'All Regions',
      isActive: true,
      timestamp: new Date(),
    }
  ]);

  const { t } = useLanguage();

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: false } : alert
    ));
  };

  const activeAlerts = alerts.filter(alert => alert.isActive);

  if (activeAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {activeAlerts.map(alert => (
        <Alert 
          key={alert.id} 
          className={`${
            alert.type === 'warning' 
              ? 'border-yellow-500 bg-yellow-50' 
              : 'border-blue-500 bg-blue-50'
          }`}
        >
          <AlertTriangle className={`h-4 w-4 ${
            alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
          }`} />
          <AlertDescription className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{alert.title}</h4>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-3 w-3" />
                  {alert.region}
                </div>
              </div>
              <p className="text-sm">{alert.message}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissAlert(alert.id)}
              className="ml-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};
