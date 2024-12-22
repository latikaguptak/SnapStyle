import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  id, 
  label, 
  icon: Icon, 
  isActive, 
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isActive
          ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }
        ${className}
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
};

export default NavLink;