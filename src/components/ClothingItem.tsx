import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { wardrobeState } from '../store/atoms';
import { ClothingItem as ClothingItemType } from '../types/wardrobe';
import { Pencil, Trash2 } from 'lucide-react';
import UploadModal from './UploadModal';
import { seasonIcons } from '../constants/seasons';

interface Props {
  item: ClothingItemType;
}

const ClothingItem: React.FC<Props> = ({ item }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [wardrobe, setWardrobe] = useRecoilState(wardrobeState);

  const [{ isDragging }, drag] = useDrag({
    type: 'CLOTHING_ITEM',
    item: () => item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setWardrobe(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleUpdate = (updatedData: any) => {
    setWardrobe(prev => prev.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          ...updatedData,
        };
      }
      return i;
    }));
  };

  return (
    <>
      <div
        ref={drag}
        className={`relative rounded-xl overflow-hidden shadow-lg transition-all ${
          isDragging ? 'opacity-50 scale-95' : ''
        } group`}
      >
        {/* Image container with gradient overlay */}
        <div className="relative aspect-[3/4] bg-primary-100">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
        
        {/* Item details - Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-900/90 to-transparent md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-lg font-medium text-white mb-1">{item.name}</p>
          <p className="text-sm text-white/80 capitalize">{item.category}</p>
          
          {/* Seasons */}
          <div className="flex gap-2 mt-2">
            {item.season.map((season) => {
              const SeasonIcon = seasonIcons[season as keyof typeof seasonIcons].icon;
              return (
                <div
                  key={season}
                  className="p-1.5 rounded-lg bg-primary-500/20"
                >
                  <SeasonIcon className="w-4 h-4 text-primary-200" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons - Always visible on mobile, hover on desktop */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditModalOpen(true);
            }}
            className="p-2 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 backdrop-blur-sm transition-colors"
          >
            <Pencil className="w-4 h-4 text-primary-200" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-200" />
          </button>
        </div>
      </div>

      <UploadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        previewUrl={item.imageUrl}
        existingItem={{
          name: item.name,
          category: item.category,
          season: item.season,
        }}
        onSave={handleUpdate}
      />
    </>
  );
};

export default ClothingItem;