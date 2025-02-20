import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot as Lotus, Moon, Sun, Mail, Lock, User, Building2, AlertCircle, X, ChevronLeft, Sparkles } from 'lucide-react';
import { quotes } from '../lib/utils';

type UserRole = 'faculty' | 'student' | 'general' | null;
type AuthMode = 'login' | 'register';

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  age?: string;
  institution?: string;
  consent?: boolean;
}

const Auth: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [mode, setMode] = useState<AuthMode>('login');
  const [showAlert, setShowAlert] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
    age: '',
    institution: '',
    consent: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      // In a real app, you would validate credentials here
      // For now, we'll just simulate a successful login
      localStorage.setItem('manasveda_auth', JSON.stringify({
        role: selectedRole,
        email: formData.email
      }));
      window.location.href = '/'; // Redirect to dashboard
    } else {
      // Handle registration
      console.log('Registration data:', { role: selectedRole, ...formData });
      // After successful registration, automatically log them in
      localStorage.setItem('manasveda_auth', JSON.stringify({
        role: selectedRole,
        email: formData.email
      }));
      window.location.href = '/';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-primary-50 to-secondary-50'
    }`}>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-md ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-xl overflow-hidden`}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Lotus className="h-8 w-8 text-primary-500" />
                <span className="text-2xl font-bold">ManasVeda</span>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 p-4 rounded-lg ${
                    isDarkMode ? 'bg-red-900/50' : 'bg-red-50'
                  } text-red-600 flex items-start gap-3`}
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Account not found</p>
                    <p className="text-sm mt-1">You haven't created an account yet. Please register first.</p>
                  </div>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="p-1 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {!selectedRole ? (
                <motion.div
                  key="role-selection"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold text-center mb-6">
                    Welcome to ManasVeda
                  </h2>
                  <p className="text-center text-sm text-gray-500 mb-8">
                    Your Personalized Mental Wellness Companion
                  </p>
                  <button
                    onClick={() => setSelectedRole('faculty')}
                    className={`w-full p-4 rounded-lg flex items-center gap-3 transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-white border-2 border-primary-100 hover:border-primary-200'
                    }`}
                  >
                    <Building2 className="h-5 w-5 text-primary-500" />
                    <div className="text-left">
                      <div className="font-medium">Faculty/Workplace Admin</div>
                      <div className="text-sm text-gray-500">Manage and monitor wellness programs</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedRole('student')}
                    className={`w-full p-4 rounded-lg flex items-center gap-3 transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-white border-2 border-primary-100 hover:border-primary-200'
                    }`}
                  >
                    <User className="h-5 w-5 text-primary-500" />
                    <div className="text-left">
                      <div className="font-medium">Student/Employee</div>
                      <div className="text-sm text-gray-500">Access personalized wellness resources</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedRole('general')}
                    className={`w-full p-4 rounded-lg flex items-center gap-3 transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-white border-2 border-primary-100 hover:border-primary-200'
                    }`}
                  >
                    <Sparkles className="h-5 w-5 text-primary-500" />
                    <div className="text-left">
                      <div className="font-medium">General Access</div>
                      <div className="text-sm text-gray-500">Explore basic wellness features</div>
                    </div>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="auth-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button
                    onClick={() => setSelectedRole(null)}
                    className={`mb-6 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Change Role
                  </button>

                  <h2 className="text-xl font-semibold mb-6">
                    {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg transition-colors ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 focus:border-primary-500'
                                : 'border-gray-200 focus:border-primary-500'
                            } border focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50`}
                            placeholder="Your full name"
                            required
                          />
                        </div>

                        {selectedRole === 'student' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Age</label>
                            <input
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 rounded-lg transition-colors ${
                                isDarkMode
                                  ? 'bg-gray-700 border-gray-600 focus:border-primary-500'
                                  : 'border-gray-200 focus:border-primary-500'
                              } border focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50`}
                              placeholder="Your age"
                              required
                            />
                          </div>
                        )}

                        {selectedRole === 'faculty' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Institution/Company</label>
                            <input
                              type="text"
                              name="institution"
                              value={formData.institution}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 rounded-lg transition-colors ${
                                isDarkMode
                                  ? 'bg-gray-700 border-gray-600 focus:border-primary-500'
                                  : 'border-gray-200 focus:border-primary-500'
                              } border focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50`}
                              placeholder="Institution or company name"
                              required
                            />
                          </div>
                        )}
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 focus:border-primary-500'
                              : 'border-gray-200 focus:border-primary-500'
                          } border focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50`}
                          placeholder="Your email address"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 focus:border-primary-500'
                              : 'border-gray-200 focus:border-primary-500'
                          } border focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50`}
                          placeholder="Your password"
                          required
                        />
                      </div>
                    </div>

                    {mode === 'register' && (
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                        <label className="text-sm">
                          I agree to the Terms of Service and Privacy Policy. I consent to the collection and processing of my personal data for mental wellness tracking.
                        </label>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                        className="text-sm text-primary-500 hover:text-primary-600"
                      >
                        {mode === 'login'
                          ? "Don't have an account? Register"
                          : 'Already have an account? Sign in'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`p-6 ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}
          >
            <blockquote className="text-center">
              <p className="text-sm italic mb-2">{currentQuote.text}</p>
              <footer className="text-xs text-gray-500">— {currentQuote.author}</footer>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;