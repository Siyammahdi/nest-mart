import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Brand {
  _id: number;
  name: string;
  productsCount: number;
}

interface DeleteBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBrand: Brand | null;
  handleDelete: () => void;
}

const DeleteBrandModal: React.FC<DeleteBrandModalProps> = ({
  isOpen,
  onClose,
  currentBrand,
  handleDelete
}) => {
  if (!currentBrand) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete the brand <span className="font-semibold">{currentBrand.name}</span>? 
            This action cannot be undone.
          </p>
          {currentBrand.productsCount > 0 && (
            <p className="mt-2 text-amber-600">
              Warning: This brand has {currentBrand.productsCount} products associated with it. 
              Deleting this brand may affect these products.
            </p>
          )}
        </div>
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete Brand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBrandModal; 