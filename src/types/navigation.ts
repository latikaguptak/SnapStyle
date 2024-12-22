import { LucideIcon } from 'lucide-react';

export type View = 'wardrobe' | 'calendar' | 'statistics';

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}