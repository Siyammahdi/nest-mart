import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-2xl shadow-sm h-full flex flex-col justify-between overflow-hidden animate-pulse">
      <div className="p-4">
        {/* Image placeholder */}
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
        
        {/* Category placeholder */}
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
        
        {/* Title placeholder */}
        <div className="h-5 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
        
        {/* Brand placeholder */}
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
        
        <div className="flex items-center justify-between">
          {/* Price placeholder */}
          <div className="flex gap-2 items-center">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
          
          {/* Button placeholder */}
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto py-8 animate-pulse">
      <div className="flex flex-col md:flex-row lg:gap-12">
        {/* Product image placeholder */}
        <div className="lg:w-1/2 flex justify-start items-center">
          <div className="w-2/3 h-96 bg-gray-200 rounded-3xl"></div>
        </div>
        
        {/* Product details placeholder */}
        <div className="lg:w-1/2">
          {/* Title placeholder */}
          <div className="h-10 bg-gray-200 rounded w-3/4 mt-10 md:mt-0 mb-4"></div>
          
          {/* Category placeholder */}
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          
          {/* Price placeholder */}
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          
          {/* Description placeholder */}
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          
          {/* Nutritional info placeholder */}
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="pl-6 mt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            ))}
          </div>
          
          {/* Buttons placeholder */}
          <div className="flex gap-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded w-28"></div>
            ))}
          </div>
          
          {/* Additional info placeholders */}
          <div className="flex justify-between mt-6">
            <div className="w-1/2">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="pl-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                ))}
              </div>
            </div>
            <div className="w-1/3 h-32 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Description sections placeholders */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="mt-8">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export const TrendingProductSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Category list */}
        <div className="md:w-1/4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg mb-3 w-full"></div>
          ))}
        </div>
        
        {/* Right side - Products grid */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-2xl shadow-sm h-full overflow-hidden">
                <div className="p-4">
                  {/* Image placeholder */}
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                  
                  {/* Title placeholder */}
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  
                  {/* Price placeholder */}
                  <div className="flex gap-2 items-center mb-3">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                  
                  {/* Rating placeholder */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                  
                  {/* Button placeholder */}
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminProductSkeleton = () => {
  return (
    <div className="animate-pulse p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="h-8 bg-gray-200 rounded w-full mb-4"></th>
                <th className="h-8 bg-gray-200 rounded w-full mb-4"></th>
                <th className="h-8 bg-gray-200 rounded w-full mb-4"></th>
                <th className="h-8 bg-gray-200 rounded w-full mb-4"></th>
                <th className="h-8 bg-gray-200 rounded w-full mb-4"></th>
                <th className="h-8 bg-gray-200 rounded w-full mb-4"></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="py-4">
                    <div className="h-12 bg-gray-200 rounded w-12"></div>
                  </td>
                  <td className="py-4">
                    <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="py-4">
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="py-4">
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="py-4">
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 rounded w-8"></div>
                      <div className="h-8 bg-gray-200 rounded w-8"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 