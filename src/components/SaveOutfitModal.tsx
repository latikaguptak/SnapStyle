import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedOutfitState, savedOutfitsState, outfitLabelsState } from '../store/atoms';
import { X } from 'lucide-react';
import { outfitSchema, type OutfitFormData } from '../schemas/forms';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SaveOutfitModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const selectedOutfit = useRecoilValue(selectedOutfitState);
  const setSavedOutfits = useSetRecoilState(savedOutfitsState);
  const labels = useRecoilValue(outfitLabelsState);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<OutfitFormData>({
    resolver: zodResolver(outfitSchema),
    defaultValues: {
      name: '',
      label: '',
      plannedDate: '',
    },
  });

  const onSubmit = (data: OutfitFormData) => {
    if (selectedOutfit.length === 0) {
      toast.error('Add items to your outfit before saving');
      return;
    }

    setSavedOutfits(prev => [...prev, {
      id: Date.now().toString(),
      name: data.name,
      label: data.label,
      items: selectedOutfit,
      createdAt: new Date(),
      plannedDate: data.plannedDate ? new Date(data.plannedDate) : undefined,
    }]);

    toast.success('Outfit saved successfully!');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Save Outfit</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Outfit Name
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Summer Party Look"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <select
              {...register('label')}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a label</option>
              {labels.map(label => (
                <option key={label.id} value={label.id}>
                  {label.name}
                </option>
              ))}
            </select>
            {errors.label && (
              <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan for Date (Optional)
            </label>
            <input
              type="date"
              {...register('plannedDate')}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-colors"
          >
            Save Outfit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveOutfitModal;