"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Brand, NewBrand } from './types';
import {
  BrandsHeader,
  BrandsFilter,
  BrandsTable,
  AddBrandModal,
  EditBrandModal,
  DeleteBrandModal
} from './components';

// Sample brands data based on real product information
const initialBrands = [
  {
    _id: 1,
    name: "Nature's Best",
    logo: "/images/brands/naturebest.png",
    description: "Premium organic and natural food products with a focus on quality and sustainability.",
    website: "https://naturesbest.com",
    status: "Active",
    featured: true,
    productsCount: 2
  },
  {
    _id: 2,
    name: "FruitLand",
    logo: "/images/brands/fruitland.png",
    description: "Specializing in fresh, organic fruits sourced from sustainable farms.",
    website: "https://fruitland.com",
    status: "Active",
    featured: true,
    productsCount: 1
  },
  {
    _id: 3,
    name: "PureOlive",
    logo: "/images/brands/pureoilve.png",
    description: "Premium olive oil and related products made from organically grown olives.",
    website: "https://pureoilve.com",
    status: "Active",
    featured: true,
    productsCount: 1
  },
  {
    _id: 4,
    name: "NutriFoods",
    logo: "/images/brands/nutrifoods.png",
    description: "Nutritious food products with a focus on nuts, seeds, and healthy snacks.",
    website: "https://nutrifoods.com",
    status: "Active",
    featured: false,
    productsCount: 1
  },
  {
    _id: 5,
    name: "GreenFarm",
    logo: "/images/brands/greenfarm.png",
    description: "Fresh vegetables and fruits grown using sustainable farming practices.",
    website: "https://greenfarm.com",
    status: "Active",
    featured: false,
    productsCount: 1
  },
  {
    _id: 6,
    name: "HealthPlus",
    logo: "/images/brands/healthplus.png",
    description: "Health-focused products including organic vinegars and supplements.",
    website: "https://healthplus.com",
    status: "Active",
    featured: true,
    productsCount: 1
  },
  {
    _id: 7,
    name: "NestFood",
    logo: "/images/brands/nestfood.png",
    description: "Organic grains and rice products with a focus on nutritional value.",
    website: "https://nestfood.com",
    status: "Active",
    featured: false,
    productsCount: 1
  },
  {
    _id: 8,
    name: "CocoLife",
    logo: "/images/brands/cocolife.png",
    description: "Organic cacao and chocolate products made from sustainably sourced ingredients.",
    website: "https://cocolife.com",
    status: "Active",
    featured: true,
    productsCount: 1
  }
];

const BrandsPage = () => {
  // State management
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(initialBrands);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  
  // New brand state
  const [newBrand, setNewBrand] = useState<NewBrand>({
    name: '',
    logo: '/images/brands/placeholder.png',
    description: '',
    website: '',
    status: 'Active',
    featured: false
  });

  // Filter options
  const statuses = ['All', 'Active', 'Inactive'];
  const featuredOptions = ['All', 'Featured', 'Not Featured'];

  // Fetch brands from API
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      // Attempt to fetch brands from API
      try {
        const response = await axios.get('https://nest-mart-backend.vercel.app/api/brands');
        setBrands(response.data);
        setFilteredBrands(response.data);
      } catch (apiError) {
        console.log('API not available, using local data');
        console.error('API Error:', apiError);
        
        // If API fails, use the product data to generate brands
        try {
          const productsResponse = await axios.get('https://nest-mart-backend.vercel.app/api/products');
          const products = productsResponse.data;
          
          // Extract unique brands from products
          const brandMap = new Map();
          
          products.forEach(product => {
            if (product.brand) {
              if (!brandMap.has(product.brand)) {
                brandMap.set(product.brand, {
                  _id: brandMap.size + 1,
                  name: product.brand,
                  logo: `/images/brands/${product.brand.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`,
                  description: `Quality products from ${product.brand}`,
                  website: `https://${product.brand.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
                  status: "Active",
                  featured: Math.random() > 0.5, // Randomly set featured status
                  productsCount: 1
                });
              } else {
                const brandData = brandMap.get(product.brand);
                brandData.productsCount += 1;
                brandMap.set(product.brand, brandData);
              }
            }
          });
          
          const extractedBrands = Array.from(brandMap.values());
          setBrands(extractedBrands);
          setFilteredBrands(extractedBrands);
        } catch (productsError) {
          console.error('Error fetching products:', productsError);
          // Fall back to initial brands data
          setBrands(initialBrands);
          setFilteredBrands(initialBrands);
        }
      }
    } catch (error) {
      console.error('Error in brand fetching process:', error);
      setBrands(initialBrands);
      setFilteredBrands(initialBrands);
    }
  };

  // Filter and sort brands
  useEffect(() => {
    let result = [...brands];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(brand => 
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(brand => brand.status === statusFilter);
    }
    
    // Apply featured filter
    if (featuredFilter !== 'All') {
      const isFeatured = featuredFilter === 'Featured';
      result = result.filter(brand => brand.featured === isFeatured);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredBrands(result);
  }, [brands, searchTerm, statusFilter, featuredFilter, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle add brand
  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Uncomment when API is available
      // const response = await axios.post('https://nest-mart-backend.vercel.app/api/brands', newBrand);
      // setBrands([...brands, response.data]);
      // setFilteredBrands([...brands, response.data]);
      
      // Using local data for now
      const brandToAdd = {
        ...newBrand,
        _id: brands.length + 1,
        productsCount: 0
      };
      
      setBrands([...brands, brandToAdd]);
      setFilteredBrands([...brands, brandToAdd]);
      setIsAddModalOpen(false);
      
      // Reset new brand form
      setNewBrand({
        name: '',
        logo: '/images/brands/placeholder.png',
        description: '',
        website: '',
        status: 'Active',
        featured: false
      });
    } catch (error) {
      console.error('Error adding brand:', error);
    }
  };

  // Handle edit brand
  const handleEditBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBrand) return;
    
    try {
      // Uncomment when API is available
      // const response = await axios.put(`https://nest-mart-backend.vercel.app/api/brands/${currentBrand._id}`, currentBrand);
      // const updatedBrands = brands.map(brand => 
      //   brand._id === currentBrand._id ? response.data : brand
      // );
      
      // Using local data for now
      const updatedBrands = brands.map(brand => 
        brand._id === currentBrand._id ? currentBrand : brand
      );
      
      setBrands(updatedBrands);
      setFilteredBrands(updatedBrands);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating brand:', error);
    }
  };

  // Handle delete brand
  const handleDeleteBrand = () => {
    if (!currentBrand) return;
    
    try {
      // Uncomment when API is available
      // await axios.delete(`https://nest-mart-backend.vercel.app/api/brands/${currentBrand._id}`);
      
      // Using local data for now
      const updatedBrands = brands.filter(brand => brand._id !== currentBrand._id);
      setBrands(updatedBrands);
      setFilteredBrands(updatedBrands);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  // Handle new brand change
  const handleNewBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkbox type differently
    if (type === 'checkbox') {
      setNewBrand(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setNewBrand(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle current brand change
  const handleCurrentBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentBrand) return;
    
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkbox type differently
    if (type === 'checkbox') {
      setCurrentBrand(prev => ({
        ...prev!,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setCurrentBrand(prev => ({
        ...prev!,
        [name]: value
      }));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <BrandsHeader onAddClick={() => setIsAddModalOpen(true)} />

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Filters */}
        <BrandsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          featuredFilter={featuredFilter}
          setFeaturedFilter={setFeaturedFilter}
          statuses={statuses}
          featuredOptions={featuredOptions}
        />

        {/* Table */}
        <BrandsTable
          brands={filteredBrands}
          handleSort={handleSort}
          onEdit={(brand) => {
            setCurrentBrand(brand);
            setIsEditModalOpen(true);
          }}
          onDelete={(brand) => {
            setCurrentBrand(brand);
            setIsDeleteModalOpen(true);
          }}
        />
      </div>

      {/* Modals */}
      <AddBrandModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        newBrand={newBrand}
        handleChange={handleNewBrandChange}
        handleSubmit={handleAddBrand}
      />

      <EditBrandModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentBrand={currentBrand}
        handleChange={handleCurrentBrandChange}
        handleSubmit={handleEditBrand}
      />

      <DeleteBrandModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        currentBrand={currentBrand}
        handleDelete={handleDeleteBrand}
      />
    </div>
  );
};

export default BrandsPage;