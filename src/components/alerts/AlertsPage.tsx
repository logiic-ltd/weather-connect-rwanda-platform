
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, Clock, MapPin, Search, Filter } from 'lucide-react';

export const AlertsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const alerts = [
    {
      id: '1',
      type: 'warning',
      severity: 'high',
      title: 'Heavy Rain Warning',
      message: 'Heavy rainfall expected in Northern Province. Flooding possible in low-lying areas. Take necessary precautions and avoid travel if possible.',
      region: 'Northern Province',
      timestamp: new Date('2024-01-15T10:30:00'),
      isActive: true,
      channels: ['web', 'sms', 'whatsapp']
    },
    {
      id: '2',
      type: 'advisory',
      severity: 'medium',
      title: 'High Temperature Advisory',
      message: 'Temperatures expected to reach 32°C today. Stay hydrated, wear light clothing, and avoid prolonged sun exposure.',
      region: 'Eastern Province',
      timestamp: new Date('2024-01-15T08:00:00'),
      isActive: true,
      channels: ['web', 'sms']
    },
    {
      id: '3',
      type: 'storm',
      severity: 'high',
      title: 'Thunderstorm Alert',
      message: 'Severe thunderstorms with strong winds and hail expected this evening. Secure loose objects and stay indoors.',
      region: 'Kigali City',
      timestamp: new Date('2024-01-15T14:45:00'),
      isActive: true,
      channels: ['web', 'sms', 'whatsapp', 'ussd']
    }
  ];

  const regions = ['All Regions', 'Kigali City', 'Northern Province', 'Southern Province', 'Eastern Province', 'Western Province'];
  const alertTypes = ['All Types', 'warning', 'advisory', 'storm', 'flood'];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'storm': return 'bg-purple-100 text-purple-800';
      case 'flood': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'all' || alert.region === filterRegion;
    const matchesType = filterType === 'all' || alert.type === filterType;
    
    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('weather_alerts', 'Weather Alerts')}
          </h1>
          <p className="text-gray-600">
            {t('alerts_subtitle', 'Stay informed with real-time weather warnings and advisories')}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="animate-pulse">
            {filteredAlerts.filter(a => a.isActive).length} {t('active', 'Active')}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('filters', 'Filters')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('search_alerts', 'Search alerts...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger>
                <SelectValue placeholder={t('select_region', 'Select Region')} />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region === 'All Regions' ? 'all' : region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder={t('select_type', 'Select Type')} />
              </SelectTrigger>
              <SelectContent>
                {alertTypes.map(type => (
                  <SelectItem key={type} value={type === 'All Types' ? 'all' : type}>
                    {type === 'All Types' ? type : type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">{t('no_alerts', 'No alerts match your criteria')}</p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map(alert => (
            <Card key={alert.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getTypeColor(alert.type)}>
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{alert.title}</h3>
                    <p className="text-gray-700 mb-3">{alert.message}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {alert.region}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {alert.timestamp.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-gray-500">Sent via:</span>
                      {alert.channels.map(channel => (
                        <Badge key={channel} variant="outline" className="text-xs">
                          {channel.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 md:min-w-0">
                    <Button variant="outline" size="sm">
                      {t('share', 'Share')}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t('details', 'Details')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
