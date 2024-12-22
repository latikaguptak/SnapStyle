import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import UploadModal from './UploadModal';

const UploadButton: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6">
      <label 
        htmlFor="upload-image" 
        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg cursor-pointer hover:bg-primary-200 transition-colors"
      >
        <Upload className="w-5 h-5" />
        <span>Upload Item</span>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>

      {selectedFile && (
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFile(null);
            setPreviewUrl('');
          }}
          imageFile={selectedFile}
          previewUrl={previewUrl}
        />
      )}
    </div>
  );
};

export default UploadButton;