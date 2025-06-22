
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    welcome_title: 'MeteoConnect Rwanda',
    welcome_subtitle: 'Real-time weather information and alerts for Rwanda',
    dashboard: 'Dashboard',
    forecast: 'Forecast',
    alerts: 'Alerts',
    map: 'Map',
    community: 'Community',
    admin: 'Admin',
    temperature: 'Temperature',
    humidity: 'Humidity',
    wind_speed: 'Wind Speed',
    today_forecast: "Today's Forecast",
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
  },
  rw: {
    welcome_title: 'MeteoConnect Rwanda',
    welcome_subtitle: 'Amakuru y\'ikirere n\'amatangazo muri Rwanda',
    dashboard: 'Imbonerahamwe',
    forecast: 'Iteganyo',
    alerts: 'Amatangazo',
    map: 'Ikarita',
    community: 'Umuryango',
    admin: 'Ubuyobozi',
    temperature: 'Ubushyuhe',
    humidity: 'Ubushuhe',
    wind_speed: 'Umuvuduko w\'umuyaga',
    today_forecast: 'Iteganyo ry\'uyumunsi',
    settings: 'Amahitamo',
    logout: 'Gusohoka',
    login: 'Kwinjira',
  },
  fr: {
    welcome_title: 'MeteoConnect Rwanda',
    welcome_subtitle: 'Informations météorologiques et alertes en temps réel pour le Rwanda',
    dashboard: 'Tableau de bord',
    forecast: 'Prévisions',
    alerts: 'Alertes',
    map: 'Carte',
    community: 'Communauté',
    admin: 'Administration',
    temperature: 'Température',
    humidity: 'Humidité',
    wind_speed: 'Vitesse du vent',
    today_forecast: "Prévisions d'aujourd'hui",
    settings: 'Paramètres',
    logout: 'Déconnexion',
    login: 'Connexion',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string, defaultValue?: string) => {
    const languageTranslations = translations[language as keyof typeof translations];
    return languageTranslations?.[key as keyof typeof languageTranslations] || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
