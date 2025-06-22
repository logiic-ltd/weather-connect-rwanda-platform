
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, Clock, MapPin, Search, Filter, Share, Eye, Zap } from 'lucide-react';

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
      case 'high': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg shadow-red-500/30';
      case 'medium': return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-lg shadow-amber-500/30';
      case 'low': return 'bg-gradient-to-r from-emerald-400 to-green-500 text-white border-0 shadow-lg shadow-emerald-500/30';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0 shadow-lg shadow-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-md';
      case 'storm': return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md';
      case 'flood': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md';
      case 'advisory': return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'storm': return <Zap className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {t('weather_alerts', 'Weather Alerts')}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {t('alerts_subtitle', 'Stay informed with real-time weather warnings and advisories')}
              </p>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-medium shadow-lg animate-pulse">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {filteredAlerts.filter(a => a.isActive).length} {t('active', 'Active Alerts')}
            </Badge>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <Card className="animate-slide-up shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              {t('filters', 'Search & Filters')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder={t('search_alerts', 'Search alerts...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 bg-white/50"
                />
              </div>
              
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 bg-white/50">
                  <SelectValue placeholder={t('select_region', 'Select Region')} />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  {regions.map(region => (
                    <SelectItem key={region} value={region === 'All Regions' ? 'all' : region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 bg-white/50">
                  <SelectValue placeholder={t('select_type', 'Select Type')} />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
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
        <div className="space-y-6">
          {filteredAlerts.length === 0 ? (
            <Card className="animate-scale-in shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="text-center py-16">
                <div className="p-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <AlertTriangle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Alerts</h3>
                <p className="text-gray-500">{t('no_alerts', 'No alerts match your criteria')}</p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert, index) => (
              <Card 
                key={alert.id} 
                className="animate-slide-up shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Severity indicator bar */}
                    <div className={`w-2 ${getSeverityColor(alert.severity).includes('red') ? 'bg-gradient-to-b from-red-400 to-red-600' : 
                      getSeverityColor(alert.severity).includes('amber') ? 'bg-gradient-to-b from-amber-400 to-orange-500' :
                      'bg-gradient-to-b from-emerald-400 to-green-500'}`} />
                    
                    <div className="flex-1 p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          {/* Alert Header */}
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                              {getAlertIcon(alert.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-3 mb-3">
                                <Badge className={getSeverityColor(alert.severity)}>
                                  {alert.severity.toUpperCase()}
                                </Badge>
                                <Badge className={getTypeColor(alert.type)}>
                                  {alert.type.toUpperCase()}
                                </Badge>
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {alert.title}
                              </h3>
                            </div>
                          </div>
                          
                          {/* Alert Content */}
                          <p className="text-gray-700 leading-relaxed text-lg">{alert.message}</p>
                          
                          {/* Alert Meta Info */}
                          <div className="flex flex-wrap items-center gap-6 text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-blue-500" />
                              <span className="font-medium">{alert.region}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-blue-500" />
                              <span>{alert.timestamp.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          {/* Communication Channels */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500">Sent via:</span>
                            <div className="flex gap-2">
                              {alert.channels.map(channel => (
                                <Badge key={channel} variant="outline" className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                                  {channel.toUpperCase()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex lg:flex-col gap-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                          >
                            <Share className="h-4 w-4 mr-2" />
                            {t('share', 'Share')}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            {t('details', 'Details')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
