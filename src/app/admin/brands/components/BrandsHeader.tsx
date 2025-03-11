import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface BrandsHeaderProps {
  onAddClick: () => void;
}

const BrandsHeader: React.FC<BrandsHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Brands Management</h1>
      <Button 
        onClick={onAddClick}
        className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
      >
        <FaPlus /> Add New Brand
      </Button>
    </div>
  );
};

export default BrandsHeader; 