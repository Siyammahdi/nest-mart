import React from 'react';
import Image from 'next/image';
import { FaEdit, FaTrash, FaSort } from 'react-icons/fa';

interface Brand {
  _id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  status: string;
  featured: boolean;
  productsCount: number;
}

interface BrandsTableProps {
  brands: Brand[];
  handleSort: (field: string) => void;
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
}

const BrandsTable: React.FC<BrandsTableProps> = ({
  brands,
  handleSort,
  onEdit,
  onDelete
}) => {
  if (brands.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No brands found. Try adjusting your filters or add a new brand.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center gap-1"
                onClick={() => handleSort('name')}
              >
                Brand <FaSort className="text-gray-400" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Logo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center gap-1"
                onClick={() => handleSort('productsCount')}
              >
                Products <FaSort className="text-gray-400" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center gap-1"
                onClick={() => handleSort('status')}
              >
                Status <FaSort className="text-gray-400" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center gap-1"
                onClick={() => handleSort('featured')}
              >
                Featured <FaSort className="text-gray-400" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {brands.map((brand) => (
            <tr key={brand._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{brand.description}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex-shrink-0 h-10 w-10 relative">
                  <Image 
                    src={brand.logo || '/images/placeholder.png'} 
                    alt={brand.name}
                    className="rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{brand.productsCount}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  brand.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {brand.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  brand.featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {brand.featured ? 'Featured' : 'Not Featured'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(brand)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(brand)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandsTable; 