import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { savedOutfitsState, outfitLabelsState } from '../store/atoms';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import EditOutfitModal from './EditOutfitModal';
import { SavedOutfit } from '../types/wardrobe';

const SavedOutfits: React.FC = () => {
  const [savedOutfits, setSavedOutfits] = useRecoilState(savedOutfitsState);
  const labels = useRecoilValue(outfitLabelsState);
  const [editingOutfit, setEditingOutfit] = useState<SavedOutfit | null>(null);

  const handleDelete = (outfitId: string) => {
    if (window.confirm('Are you sure you want to delete this outfit?')) {
      setSavedOutfits(prev => prev.filter(outfit => outfit.id !== outfitId));
    }
  };

  const handleUpdate = (updatedOutfit: SavedOutfit) => {
    setSavedOutfits(prev => 
      prev.map(outfit => outfit.id === updatedOutfit.id ? updatedOutfit : outfit)
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-200">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Saved Outfits</h2>
      
      <div className="space-y-4">
        {savedOutfits.map(outfit => {
          const label = labels.find(l => l.id === outfit.label);
          
          return (
            <div 
              key={outfit.id} 
              className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">{outfit.name}</h3>
                  {label && (
                    <span 
                      className="inline-block px-2 py-1 rounded-full text-xs"
                      style={{ backgroundColor: label.color + '40', color: label.color }}
                    >
                      {label.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {outfit.plannedDate && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(outfit.plannedDate).toLocaleDateString()}
                    </div>
                  )}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingOutfit(outfit)}
                      className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Pencil className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(outfit.id)}
                      className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {outfit.items.map(item => (
                  <img
                    key={item.id}
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          );
        })}
        
        {savedOutfits.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 py-8">
            No saved outfits yet. Create your first outfit!
          </p>
        )}
      </div>

      {editingOutfit && (
        <EditOutfitModal
          isOpen={!!editingOutfit}
          onClose={() => setEditingOutfit(null)}
          outfit={editingOutfit}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default SavedOutfits;