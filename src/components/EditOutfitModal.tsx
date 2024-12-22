import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { outfitLabelsState } from '../store/atoms';
import { X } from 'lucide-react';
import { SavedOutfit } from '../types/wardrobe';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  outfit: SavedOutfit;
  onSave: (updatedOutfit: SavedOutfit) => void;
}

const EditOutfitModal: React.FC<Props> = ({ isOpen, onClose, outfit, onSave }) => {
  const [name, setName] = useState(outfit.name);
  const [selectedLabel, setSelectedLabel] = useState(outfit.label);
  const [date, setDate] = useState(outfit.plannedDate ? new Date(outfit.plannedDate).toISOString().split('T')[0] : '');
  
  const labels = useRecoilValue(outfitLabelsState);

  const handleSave = () => {
    onSave({
      ...outfit,
      name,
      label: selectedLabel,
      plannedDate: date ? new Date(date) : undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Outfit</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Outfit Name
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
              Label
            </label>
            <select
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a label</option>
              {labels.map(label => (
                <option key={label.id} value={label.id}>
                  {label.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan for Date (Optional)
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {outfit.items.map(item => (
              <img
                key={item.id}
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-16 object-cover rounded"
              />
            ))}
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

export default EditOutfitModal;