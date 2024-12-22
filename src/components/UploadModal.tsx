import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from 'recoil';
import { wardrobeState } from '../store/atoms';
import { X } from 'lucide-react';
import { clothingItemSchema, type ClothingItemFormData } from '../schemas/forms';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageFile?: File;
  previewUrl: string;
  existingItem?: ClothingItemFormData;
  onSave?: (item: ClothingItemFormData) => void;
}

const categories = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'accessories', label: 'Accessories' }
];

const seasons = ['spring', 'summer', 'fall', 'winter'];

const UploadModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  imageFile, 
  previewUrl,
  existingItem,
  onSave 
}) => {
  const [wardrobe, setWardrobe] = useRecoilState(wardrobeState);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClothingItemFormData>({
    resolver: zodResolver(clothingItemSchema),
    defaultValues: existingItem || {
      name: imageFile?.name.split('.')[0] || '',
      category: 'tops',
      season: ['spring'],
    },
  });

  const onSubmit = (data: ClothingItemFormData) => {
    if (onSave) {
      onSave(data);
    } else {
      if (wardrobe.length >= 20) {
        toast.error('Maximum wardrobe size reached. Please remove some items first.');
        return;
      }

      const newItem = {
        id: Date.now().toString(),
        name: data.name,
        category: data.category,
        imageUrl: previewUrl,
        season: data.season,
        tags: []
      };

      setWardrobe(prev => [...prev, newItem]);
      toast.success('Item added to wardrobe!');
    }
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {existingItem ? 'Edit Item' : 'Add Clothing Item'}
            </h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full aspect-[3/4] object-cover rounded-xl"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter item name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seasons
              </label>
              <div className="grid grid-cols-2 gap-3">
                {seasons.map(season => (
                  <label 
                    key={season}
                    className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      value={season}
                      {...register('season')}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm capitalize">{season}</span>
                  </label>
                ))}
              </div>
              {errors.season && (
                <p className="text-red-500 text-sm mt-1">{errors.season.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              {existingItem ? 'Save Changes' : 'Add to Wardrobe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;