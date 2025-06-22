
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare, TrendingUp, Users } from 'lucide-react';

export const QuickActions = () => {
  const { t } = useLanguage();

  const actions = [
    {
      title: t('view_map', 'View Weather Map'),
      description: t('view_map_desc', 'Interactive map with weather zones and risk areas'),
      icon: MapPin,
      link: '/map',
      color: 'bg-blue-500',
    },
    {
      title: t('submit_report', 'Submit Weather Report'),
      description: t('submit_report_desc', 'Help improve our forecasts with your observations'),
      icon: MessageSquare,
      link: '/community',
      color: 'bg-green-500',
    },
    {
      title: t('view_forecast', 'Extended Forecast'),
      description: t('view_forecast_desc', '5-day detailed weather forecast'),
      icon: TrendingUp,
      link: '/forecast',
      color: 'bg-purple-500',
    },
    {
      title: t('community_reports', 'Community Reports'),
      description: t('community_reports_desc', 'See what others are reporting in your area'),
      icon: Users,
      link: '/community',
      color: 'bg-orange-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('quick_actions', 'Quick Actions')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-start space-y-2">
                  <div className={`p-2 rounded-full ${action.color} text-white`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
