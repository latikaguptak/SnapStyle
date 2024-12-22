import React from 'react';
import { useRecoilValue } from 'recoil';
import { wardrobeState, savedOutfitsState, outfitLabelsState } from '../store/atoms';
import { PieChart, BarChart2, TrendingUp, Tag } from 'lucide-react';

const Statistics: React.FC = () => {
  const wardrobe = useRecoilValue(wardrobeState);
  const savedOutfits = useRecoilValue(savedOutfitsState);
  const labels = useRecoilValue(outfitLabelsState);

  // Calculate category distribution
  const categoryStats = wardrobe.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate season distribution
  const seasonStats = wardrobe.reduce((acc, item) => {
    item.season.forEach(season => {
      acc[season] = (acc[season] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Calculate outfit distribution by label
  const outfitLabelStats = savedOutfits.reduce((acc, outfit) => {
    if (outfit.label) {
      acc[outfit.label] = (acc[outfit.label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate most used items in outfits
  const itemUsageStats = savedOutfits.reduce((acc, outfit) => {
    outfit.items.forEach(item => {
      acc[item.id] = (acc[item.id] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const mostUsedItems = Object.entries(itemUsageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([itemId, count]) => ({
      item: wardrobe.find(item => item.id === itemId)!,
      count,
    }));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-200">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        Wardrobe Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Category Distribution
          </h3>
          <div className="space-y-2">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{category}</span>
                  <span>{count} items</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 dark:bg-primary-400 rounded-full"
                    style={{
                      width: `${(count / wardrobe.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Season Distribution */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            Season Distribution
          </h3>
          <div className="space-y-2">
            {Object.entries(seasonStats).map(([season, count]) => (
              <div key={season} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{season}</span>
                  <span>{count} items</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-500 dark:bg-accent-400 rounded-full"
                    style={{
                      width: `${(count / Object.values(seasonStats).reduce((a, b) => a + b, 0)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outfit Distribution by Label */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Outfits by Label
          </h3>
          <div className="space-y-2">
            {labels.map(label => {
              const count = outfitLabelStats[label.id] || 0;
              const totalOutfits = savedOutfits.length;
              
              return (
                <div key={label.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: label.color }}
                      />
                      {label.name}
                    </span>
                    <span>{count} outfits</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: label.color,
                        width: totalOutfits > 0 ? `${(count / totalOutfits) * 100}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Used Items */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Most Used Items in Outfits</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {mostUsedItems.map(({ item, count }) => (
              <div key={item.id} className="space-y-2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="text-sm">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">Used {count} times</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;