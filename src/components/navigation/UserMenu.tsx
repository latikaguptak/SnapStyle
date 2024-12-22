import React from 'react';
import { LogOut } from 'lucide-react';
import { User } from '../../types/wardrobe';

interface UserMenuProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogin, onLogout }) => {
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
          Welcome, {user.name}
        </span>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onLogin}
      className="px-4 py-2 bg-primary-500 dark:bg-primary-400 text-white rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors"
    >
      Login
    </button>
  );
};

export default UserMenu;