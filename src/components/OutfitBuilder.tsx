import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedOutfitState, userState } from '../store/atoms';
import { ClothingItem as ClothingItemType } from '../types/wardrobe';
import { X, Save } from 'lucide-react';
import SaveOutfitModal from './SaveOutfitModal';
import toast from 'react-hot-toast';

const OutfitBuilder: React.FC = () => {
  const [selectedOutfit, setSelectedOutfit] = useRecoilState(selectedOutfitState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useRecoilValue(userState);

  const [{ isOver }, drop] = useDrop({
    accept: 'CLOTHING_ITEM',
    drop: (item: ClothingItemType) => {
      if (!selectedOutfit.find(i => i.id === item.id)) {
        setSelectedOutfit(prev => [...prev, item]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const removeItem = (itemId: string) => {
    setSelectedOutfit(prev => prev.filter(item => item.id !== itemId));
  };

  const handleSaveClick = () => {
    if (!user) {
      toast.error('Please login to save outfits');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        ref={drop}
        className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-200 ${
          isOver ? 'ring-2 ring-primary-300 dark:ring-primary-500' : ''
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Outfit Builder</h2>
          {selectedOutfit.length > 0 && (
            <button
              onClick={handleSaveClick}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 dark:bg-primary-400 text-white rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Outfit
            </button>
          )}
        </div>

        <div 
          className={`min-h-[400px] border-2 border-dashed rounded-lg p-4 transition-colors ${
            isOver 
              ? 'border-primary-300 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-gray-200 dark:border-gray-700'
          }`}
        >
          {selectedOutfit.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500">Drag items here to create an outfit</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {selectedOutfit.map((item) => (
                <div key={item.id} className="relative group">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {user && (
        <SaveOutfitModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default OutfitBuilder;