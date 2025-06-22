
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  AlertTriangle, 
  Users, 
  BarChart3, 
  Send, 
  Upload,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  Cloud
} from 'lucide-react';

export const AdminPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [newAlert, setNewAlert] = useState({
    title: '',
    message: '',
    region: '',
    severity: '',
    type: '',
    channels: [] as string[]
  });

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-red-600">{t('admin_access_denied', 'Access denied. Admin privileges required.')}</p>
        </CardContent>
      </Card>
    );
  }

  const stats = {
    totalUsers: 2547,
    activeAlerts: 3,
    reportsToday: 45,
    systemUptime: '99.8%'
  };

  const pendingReports = [
    {
      id: '1',
      user: 'Marie Uwimana',
      type: 'Heavy Rain',
      location: 'Gatsibo, Eastern Province',
      description: 'Intense rainfall causing flooding in agricultural areas',
      timestamp: new Date(),
      status: 'pending'
    },
    {
      id: '2',
      user: 'Paul Kagame',
      type: 'Strong Wind',
      location: 'Rubavu, Western Province',
      description: 'High winds damaging crops and infrastructure',
      timestamp: new Date(),
      status: 'pending'
    }
  ];

  const handleCreateAlert = () => {
    if (!newAlert.title || !newAlert.message || !newAlert.region) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Alert Created",
      description: `Alert "${newAlert.title}" has been sent to ${newAlert.region}`,
    });

    setNewAlert({
      title: '',
      message: '',
      region: '',
      severity: '',
      type: '',
      channels: []
    });
  };

  const handleReportAction = (reportId: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? "Report Approved" : "Report Rejected",
      description: `Report ${reportId} has been ${action}d`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('admin_dashboard', 'Admin Dashboard')}
          </h1>
          <p className="text-gray-600">
            {t('admin_subtitle', 'Manage weather alerts, forecasts, and community reports')}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{t('total_users', 'Total Users')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold">{stats.activeAlerts}</p>
            <p className="text-sm text-gray-600">{t('active_alerts', 'Active Alerts')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{stats.reportsToday}</p>
            <p className="text-sm text-gray-600">{t('reports_today', 'Reports Today')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{stats.systemUptime}</p>
            <p className="text-sm text-gray-600">{t('system_uptime', 'System Uptime')}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">{t('alerts', 'Alerts')}</TabsTrigger>
          <TabsTrigger value="forecasts">{t('forecasts', 'Forecasts')}</TabsTrigger>
          <TabsTrigger value="reports">{t('reports', 'Reports')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('analytics', 'Analytics')}</TabsTrigger>
        </TabsList>

        {/* Alerts Management */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {t('create_alert', 'Create New Alert')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('alert_title', 'Alert Title')} *
                  </label>
                  <Input
                    placeholder={t('enter_title', 'Enter alert title')}
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('target_region', 'Target Region')} *
                  </label>
                  <Select value={newAlert.region} onValueChange={(value) => setNewAlert({...newAlert, region: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_region', 'Select region')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="kigali">Kigali City</SelectItem>
                      <SelectItem value="north">Northern Province</SelectItem>
                      <SelectItem value="south">Southern Province</SelectItem>
                      <SelectItem value="east">Eastern Province</SelectItem>
                      <SelectItem value="west">Western Province</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('alert_type', 'Alert Type')}
                  </label>
                  <Select value={newAlert.type} onValueChange={(value) => setNewAlert({...newAlert, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_type', 'Select type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weather">Weather Warning</SelectItem>
                      <SelectItem value="flood">Flood Alert</SelectItem>
                      <SelectItem value="drought">Drought Advisory</SelectItem>
                      <SelectItem value="storm">Storm Warning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('severity', 'Severity Level')}
                  </label>
                  <Select value={newAlert.severity} onValueChange={(value) => setNewAlert({...newAlert, severity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_severity', 'Select severity')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('alert_message', 'Alert Message')} *
                </label>
                <Textarea
                  placeholder={t('enter_message', 'Enter detailed alert message')}
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('delivery_channels', 'Delivery Channels')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Web', 'SMS', 'WhatsApp', 'USSD'].map(channel => (
                    <Badge 
                      key={channel}
                      variant={newAlert.channels.includes(channel.toLowerCase()) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const channelLower = channel.toLowerCase();
                        setNewAlert({
                          ...newAlert,
                          channels: newAlert.channels.includes(channelLower)
                            ? newAlert.channels.filter(c => c !== channelLower)
                            : [...newAlert.channels, channelLower]
                        });
                      }}
                    >
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button onClick={handleCreateAlert} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {t('send_alert', 'Send Alert')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecasts Management */}
        <TabsContent value="forecasts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                {t('forecast_management', 'Forecast Management')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">{t('forecast_data_upload', 'Upload new forecast data or update existing forecasts')}</p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  {t('upload_data', 'Upload Data')}
                </Button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Cloud className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-2">{t('drag_drop_files', 'Drag and drop forecast files here')}</p>
                <p className="text-sm text-gray-400">{t('supported_formats', 'Supported formats: CSV, JSON, XML')}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Management */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {t('pending_reports', 'Pending Community Reports')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReports.map(report => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{report.user}</h4>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{report.location}</p>
                        <p className="text-gray-700 mb-3">{report.description}</p>
                        <p className="text-xs text-gray-500">{report.timestamp.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReportAction(report.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {t('approve', 'Approve')}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReportAction(report.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          {t('reject', 'Reject')}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {t('platform_analytics', 'Platform Analytics')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">{t('user_engagement', 'User Engagement')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Daily Active Users</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Active Users</span>
                      <span className="font-semibold">3,892</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Active Users</span>
                      <span className="font-semibold">12,456</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">{t('channel_performance', 'Channel Performance')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Web Platform</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SMS Delivery</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WhatsApp Bot</span>
                      <span className="font-semibold">87%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
