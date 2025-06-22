
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';
import { AlertsPage } from '@/components/alerts/AlertsPage';
import { ForecastPage } from '@/components/forecast/ForecastPage';
import { MapPage } from '@/components/map/MapPage';
import { CommunityPage } from '@/components/community/CommunityPage';
import { AdminPage } from '@/components/admin/AdminPage';
import { AuthPage } from '@/components/auth/AuthPage';
import { Navigation } from '@/components/layout/Navigation';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/*" element={
              <>
                <Navigation />
                <main className="container mx-auto px-4 py-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/alerts" element={<AlertsPage />} />
                    <Route path="/forecast" element={<ForecastPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
