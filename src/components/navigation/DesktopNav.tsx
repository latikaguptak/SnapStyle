import React from 'react';
import { View } from '../../types/navigation';
import { NavigationItem } from '../../types/navigation';
import NavLink from './NavLink';

interface DesktopNavProps {
  navigation: NavigationItem[];
  currentView: View;
  onViewChange: (view: View) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ 
  navigation, 
  currentView, 
  onViewChange 
}) => {
  return (
    <nav className="hidden md:flex items-center gap-2">
      {navigation.map((item) => (
        <NavLink
          key={item.id}
          {...item}
          isActive={currentView === item.id}
          onClick={() => onViewChange(item.id as View)}
        />
      ))}
    </nav>
  );
};

export default DesktopNav;