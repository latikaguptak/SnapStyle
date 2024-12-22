import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ClothingCategory, ClothingItem } from '../types/wardrobe';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: ClothingItem;
  onSave: (updatedItem: ClothingItem) => void;
}

const categories: { value: ClothingCategory; label: string }[] = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'accessories', label: 'Accessories' }
];

const seasons = ['spring', 'summer', 'fall', 'winter'];

const EditItemModal: React.FC<Props> = ({ isOpen, onClose, item, onSave }) => {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState<ClothingCategory>(item.category);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>(item.season);
  const [color, setColor] = useState(item.color);

  const handleSave = () => {
    onSave({
      ...item,
      name,
      category,
      color,
      season: selectedSeasons,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Item</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ClothingCategory)}
              className="w-full px-3 py-2 border rounded-md"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seasons
            </label>
            <div className="flex flex-wrap gap-2">
              {seasons.map(season => (
                <label key={season} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSeasons.includes(season)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSeasons(prev => [...prev, season]);
                      } else {
                        setSelectedSeasons(prev => prev.filter(s => s !== season));
                      }
                    }}
                    className="mr-1"
                  />
                  <span className="text-sm capitalize">{season}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;