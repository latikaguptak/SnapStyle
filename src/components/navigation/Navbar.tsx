import React from 'react';
import { Heart } from 'lucide-react';
import { User } from '../../types/wardrobe';
import { NavigationItem, View } from '../../types/navigation';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  user: User | null;
  theme: 'light' | 'dark';
  navigation: NavigationItem[];
  currentView: View;
  onViewChange: (view: View) => void;
  onThemeToggle: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  theme,
  navigation,
  currentView,
  onViewChange,
  onThemeToggle,
  onLogin,
  onLogout,
}) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-primary-500 dark:text-primary-400" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
              SnapStyle
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <DesktopNav
              navigation={navigation}
              currentView={currentView}
              onViewChange={onViewChange}
            />
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <UserMenu
              user={user}
              onLogin={onLogin}
              onLogout={onLogout}
            />
          </div>
        </div>

        <MobileNav
          navigation={navigation}
          currentView={currentView}
          onViewChange={onViewChange}
        />
      </div>
    </header>
  );
};

export default Navbar;