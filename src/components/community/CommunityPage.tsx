
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Users, MapPin, Clock, Camera, Send, ThumbsUp } from 'lucide-react';

export const CommunityPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [reportForm, setReportForm] = useState({
    type: '',
    location: '',
    description: '',
    severity: ''
  });

  const communityReports = [
    {
      id: '1',
      user: 'Jean Baptiste',
      location: 'Nyamirambo, Kigali',
      type: 'Heavy Rain',
      description: 'Very heavy rainfall started at 2 PM, flooding in low areas near the market.',
      timestamp: new Date('2024-01-15T14:30:00'),
      severity: 'high',
      verified: true,
      likes: 12,
      image: null
    },
    {
      id: '2',
      user: 'Marie Claire',
      location: 'Musanze, Northern Province',
      type: 'Temperature',
      description: 'Unusually cold morning, temperature felt much lower than forecast.',
      timestamp: new Date('2024-01-15T08:15:00'),
      severity: 'medium',
      verified: false,
      likes: 8,
      image: null
    },
    {
      id: '3',
      user: 'Emmanuel Nkusi',
      location: 'Huye, Southern Province',
      type: 'Wind',
      description: 'Strong winds damaged several trees in our area. Power lines affected.',
      timestamp: new Date('2024-01-15T16:45:00'),
      severity: 'high',
      verified: true,
      likes: 15,
      image: null
    }
  ];

  const reportTypes = [
    'Heavy Rain', 'Drought', 'Strong Wind', 'Hail', 'Temperature Anomaly', 'Flooding', 'Other'
  ];

  const severityLevels = [
    { value: 'low', label: 'Low - Minor observation' },
    { value: 'medium', label: 'Medium - Notable change' },
    { value: 'high', label: 'High - Significant impact' }
  ];

  const handleSubmitReport = () => {
    if (!reportForm.type || !reportForm.location || !reportForm.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Submitted",
      description: "Thank you for your weather observation. It will be reviewed by our team.",
    });

    setReportForm({ type: '', location: '', description: '', severity: '' });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('community_reports', 'Community Weather Reports')}
          </h1>
          <p className="text-gray-600">
            {t('community_subtitle', 'Share your weather observations and help improve forecasts')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {communityReports.length} {t('reports_today', 'reports today')}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Report Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {t('submit_report', 'Submit Weather Report')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('weather_type', 'Weather Type')} *
              </label>
              <Select value={reportForm.type} onValueChange={(value) => setReportForm({...reportForm, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_type', 'Select weather type')} />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('location', 'Location')} *
              </label>
              <Input
                placeholder={t('enter_location', 'Enter your location')}
                value={reportForm.location}
                onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('severity', 'Severity Level')}
              </label>
              <Select value={reportForm.severity} onValueChange={(value) => setReportForm({...reportForm, severity: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_severity', 'Select severity')} />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('description', 'Description')} *
              </label>
              <Textarea
                placeholder={t('describe_weather', 'Describe what you observed...')}
                value={reportForm.description}
                onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                {t('add_photo', 'Add Photo')}
              </Button>
            </div>

            <Button onClick={handleSubmitReport} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              {t('submit_report', 'Submit Report')}
            </Button>
          </CardContent>
        </Card>

        {/* Community Reports */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('recent_reports', 'Recent Community Reports')}
              </CardTitle>
            </CardHeader>
          </Card>

          {communityReports.map(report => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.user}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(report.severity)}>
                      {report.severity.toUpperCase()}
                    </Badge>
                    {report.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {t('verified', 'Verified')}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-blue-600 mb-2">{report.type}</h4>
                  <p className="text-gray-700">{report.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {report.timestamp.toLocaleString()}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {report.likes}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t('helpful', 'Helpful')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>{t('community_stats', 'Community Statistics')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-sm text-gray-600">{t('total_reports', 'Total Reports This Month')}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">89</p>
              <p className="text-sm text-gray-600">{t('verified_reports', 'Verified Reports')}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">45</p>
              <p className="text-sm text-gray-600">{t('active_contributors', 'Active Contributors')}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">98%</p>
              <p className="text-sm text-gray-600">{t('accuracy_rate', 'Accuracy Rate')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
