import React from 'react';
import { View } from '../../types/navigation';
import { NavigationItem } from '../../types/navigation';
import NavLink from './NavLink';

interface MobileNavProps {
  navigation: NavigationItem[];
  currentView: View;
  onViewChange: (view: View) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  navigation, 
  currentView, 
  onViewChange 
}) => {
  return (
    <nav className="md:hidden flex items-center gap-2 mt-4 overflow-x-auto pb-2">
      {navigation.map((item) => (
        <NavLink
          key={item.id}
          {...item}
          isActive={currentView === item.id}
          onClick={() => onViewChange(item.id as View)}
          className="whitespace-nowrap"
        />
      ))}
    </nav>
  );
};

export default MobileNav;