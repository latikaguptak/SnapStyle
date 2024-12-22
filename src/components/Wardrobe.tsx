import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { wardrobeState } from '../store/atoms';
import ClothingItem from './ClothingItem';
import UploadButton from './UploadButton';
import { seasonIcons } from '../constants/seasons';

const Wardrobe: React.FC = () => {
  const wardrobe = useRecoilValue(wardrobeState);

  const groupedBySeasons = useMemo(() => {
    const groups = wardrobe.reduce((acc, item) => {
      item.season.forEach(season => {
        if (!acc[season]) {
          acc[season] = [];
        }
        acc[season].push(item);
      });
      return acc;
    }, {} as Record<string, typeof wardrobe>);

    return Object.entries(groups);
  }, [wardrobe]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-200">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">My Wardrobe</h2>
      <UploadButton />

      <div className="space-y-6">
        {groupedBySeasons.map(([season, items]) => {
          const SeasonIcon = seasonIcons[season as keyof typeof seasonIcons].icon;
          const seasonColor = seasonIcons[season as keyof typeof seasonIcons].color;
          
          return (
            <div key={season}>
              <div className="flex items-center gap-2 mb-3">
                <SeasonIcon className="w-6 h-6" style={{ color: seasonColor }} />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                  {season}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <ClothingItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wardrobe;