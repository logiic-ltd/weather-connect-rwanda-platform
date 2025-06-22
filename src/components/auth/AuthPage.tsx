
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Cloud, Mail, Lock, User, MapPin, Globe } from 'lucide-react';

export const AuthPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const { login, signup, user } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    phone: '',
    preferredLanguage: language
  });

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const regions = [
    'Kigali City',
    'Northern Province',
    'Southern Province',
    'Eastern Province',
    'Western Province'
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(loginForm.email, loginForm.password);
      toast({
        title: t('login_success', 'Login successful'),
        description: t('welcome_back', 'Welcome back to MeteoConnect'),
      });
    } catch (error: any) {
      toast({
        title: t('login_error', 'Login failed'),
        description: error.message || t('login_error_message', 'Please check your credentials and try again'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: t('password_mismatch', 'Password mismatch'),
        description: t('password_mismatch_message', 'Passwords do not match'),
        variant: 'destructive'
      });
      setIsLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      toast({
        title: t('password_too_short', 'Password too short'),
        description: t('password_length_message', 'Password must be at least 6 characters'),
        variant: 'destructive'
      });
      setIsLoading(false);
      return;
    }

    try {
      await signup(signupForm.email, signupForm.password, {
        name: signupForm.name,
        region: signupForm.region,
        phone: signupForm.phone,
        preferred_language: signupForm.preferredLanguage
      });
      
      toast({
        title: t('signup_success', 'Account created successfully'),
        description: t('signup_success_message', 'Welcome to MeteoConnect! Please check your email to verify your account.'),
      });
    } catch (error: any) {
      toast({
        title: t('signup_error', 'Signup failed'),
        description: error.message || t('signup_error_message', 'Failed to create account. Please try again.'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-40">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="rw">Kinyarwanda</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Cloud className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">MeteoConnect</CardTitle>
            <p className="text-gray-600">
              {t('auth_subtitle', 'Rwanda Meteorology Agency Weather Platform')}
            </p>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t('login', 'Login')}</TabsTrigger>
                <TabsTrigger value="signup">{t('signup', 'Sign Up')}</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t('email', 'Email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder={t('enter_email', 'Enter your email')}
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t('password', 'Password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder={t('enter_password', 'Enter your password')}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t('logging_in', 'Logging in...') : t('login', 'Login')}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">{t('full_name', 'Full Name')}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder={t('enter_name', 'Enter your full name')}
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t('email', 'Email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder={t('enter_email', 'Enter your email')}
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-region">{t('region', 'Region')}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                      <Select value={signupForm.region} onValueChange={(value) => setSignupForm({...signupForm, region: value})}>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder={t('select_region', 'Select your region')} />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map(region => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t('password', 'Password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder={t('enter_password', 'Enter your password')}
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">{t('confirm_password', 'Confirm Password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder={t('confirm_password', 'Confirm your password')}
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t('creating_account', 'Creating account...') : t('create_account', 'Create Account')}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>{t('guest_access', 'You can also browse forecasts as a guest without creating an account.')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
