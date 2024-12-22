import React, { useState, useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Heart, Moon, Sun, LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Wardrobe from './components/Wardrobe';
import OutfitBuilder from './components/OutfitBuilder';
import SavedOutfits from './components/SavedOutfits';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import AuthModal from './components/auth/AuthModal';
import { userState, themeState } from './store/atoms';

const AppContent = () => {
  const [user, setUser] = useRecoilState(userState);
  const [theme, setTheme] = useRecoilState(themeState);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'wardrobe' | 'calendar' | 'statistics'>('wardrobe');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleLogout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-primary-900/50 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-primary-500 dark:text-primary-400" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
                  SnapStyle
                </h1>
              </div>
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <nav className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <button
                  onClick={() => setCurrentView('wardrobe')}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    currentView === 'wardrobe'
                      ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Wardrobe
                </button>
                <button
                  onClick={() => setCurrentView('calendar')}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    currentView === 'calendar'
                      ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setCurrentView('statistics')}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    currentView === 'statistics'
                      ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Statistics
                </button>
              </nav>

              <div className="hidden sm:flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Welcome, {user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'wardrobe' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Wardrobe />
              <SavedOutfits />
            </div>
            <div className="lg:sticky lg:top-8 h-fit">
              <OutfitBuilder />
            </div>
          </div>
        )}
        
        {currentView === 'calendar' && <Calendar />}
        {currentView === 'statistics' && <Statistics />}
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <AppContent />
      </DndProvider>
    </RecoilRoot>
  );
}

export default App;