"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, 
  FaFilter, FaSort, FaEye
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { categories as productCategories } from '@/app/homepage/Banner/Categories';

// Sample product data
const initialProducts = [
  {
    _id: 1,
    name: 'Organic Apples',
    category: 'Fruits',
    brand: 'Nature\'s Best',
    price: 4.99,
    stock: 120,
    image: '/images/placeholder.png',
    status: 'Active'
  },
  {
    _id: 2,
    name: 'Fresh Milk',
    category: 'Dairy',
    brand: 'Farm Fresh',
    price: 2.49,
    stock: 85,
    image: '/images/placeholder.png',
    status: 'Active'
  },
  {
    _id: 3,
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    brand: 'Healthy Bake',
    price: 3.99,
    stock: 45,
    image: '/images/placeholder.png',
    status: 'Active'
  },
  {
    _id: 4,
    name: 'Free Range Eggs',
    category: 'Dairy',
    brand: 'Farm Fresh',
    price: 5.49,
    stock: 60,
    image: '/images/placeholder.png',
    status: 'Active'
  },
  {
    _id: 5,
    name: 'Organic Spinach',
    category: 'Vegetables',
    brand: 'Nature\'s Best',
    price: 2.99,
    stock: 75,
    image: '/images/placeholder.png',
    status: 'Inactive'
  }
];

// Sample categories and brands for filters
const brands = ['All', 'Nature\'s Best', 'Farm Fresh', 'Healthy Bake'];

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    originalPrice: '',
    discount: '',
    stock: '',
    image: '/images/placeholder.png',
    status: 'Active',
    nutritionalInfo: {
      calories: '',
      protein: '',
      fat: '',
      carbohydrates: '',
      fiber: ''
    },
    isNewProduct: false,
    tag: '',
    rating: '',
    weight: '',
    sku: '',
    description: '',
    ingredients: []
  });

  // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
        const response = await axios.get('https://nest-mart-backend.vercel.app/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'All') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply brand filter
    if (brandFilter !== 'All') {
      result = result.filter(product => product.brand === brandFilter);
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
    
    setFilteredProducts(result);
  }, [products, searchTerm, categoryFilter, brandFilter, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle add product
  const handleAddProduct = async () => {
    try {
      const productToAdd = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock)
      };

      const response = await axios.post('https://nest-mart-backend.vercel.app/api/products', productToAdd);
      setProducts([...products, response.data]);
      setFilteredProducts([...products, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Handle edit product
  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`https://nest-mart-backend.vercel.app/api/products/${currentProduct._id}`, currentProduct);
      const updatedProducts = products.map(product => 
        product._id === currentProduct._id ? response.data : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle delete product
  const handleDeleteProduct = () => {
    const updatedProducts = products.filter(product => product._id !== currentProduct._id);
    setProducts(updatedProducts);
    setIsDeleteModalOpen(false);
  };

  // Handle input change for new product
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('nutritionalInfo')) {
      const [, key] = name.split('.');
      setNewProduct((prev) => ({
        ...prev,
        nutritionalInfo: {
          ...prev.nutritionalInfo,
          [key]: value
        }
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle input change for current product
  const handleCurrentProductChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('nutritionalInfo')) {
      const [, key] = name.split('.');
      setCurrentProduct((prev) => ({
        ...prev,
        nutritionalInfo: {
          ...prev.nutritionalInfo,
          [key]: value
        }
      }));
    } else {
      setCurrentProduct((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Replace the categories array with the imported categories
  const categories = ['All', ...productCategories.map(category => category.name)];

    return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Products Management</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 md:mt-0 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Product
        </button>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
                        <input
                            type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category filter */}
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Brand filter */}
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>
                    </div>
                </div>

      {/* Products table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center">
                    Category
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('brand')}
                >
                  <div className="flex items-center">
                    Brand
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    Price
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center">
                    Stock
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                                </tr>
                            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                                        </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <FaEdit />
                                                </button>
                                                <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <FaTrash />
                                                </button>
                        <Link href={`/admin/products/${product._id}`} className="text-gray-600 hover:text-gray-900">
                          <FaEye />
                        </Link>
                                            </div>
                                        </td>
                                    </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
                            </tbody>
                        </table>
                    </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select Category</option>
                    {productCategories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="brand" className="text-sm font-medium">Brand</label>
                  <Select
                    value={newProduct.brand}
                    onValueChange={(value) => setNewProduct({...newProduct, brand: value})}
                  >
                    <select
                      id="brand"
                      name="brand"
                      value={newProduct.brand}
                      onChange={handleNewProductChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      <option value="">Select Brand</option>
                      {brands.filter(b => b !== 'All').map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
                  <Input
                    id="price"
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleNewProductChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="stock" className="text-sm font-medium">Stock</label>
                  <Input
                    id="stock"
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleNewProductChange}
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <Select
                    value={newProduct.status}
                    onValueChange={(value) => setNewProduct({...newProduct, status: value})}
                  >
                    <select
                      id="status"
                      name="status"
                      value={newProduct.status}
                      onChange={handleNewProductChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="calories" className="text-sm font-medium">Calories</label>
                  <Input
                    id="calories"
                    type="number"
                    name="nutritionalInfo.calories"
                    value={newProduct.nutritionalInfo.calories}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="protein" className="text-sm font-medium">Protein</label>
                  <Input
                    id="protein"
                    name="nutritionalInfo.protein"
                    value={newProduct.nutritionalInfo.protein}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fat" className="text-sm font-medium">Fat</label>
                  <Input
                    id="fat"
                    name="nutritionalInfo.fat"
                    value={newProduct.nutritionalInfo.fat}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="carbs" className="text-sm font-medium">Carbohydrates</label>
                  <Input
                    id="carbs"
                    name="nutritionalInfo.carbohydrates"
                    value={newProduct.nutritionalInfo.carbohydrates}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fiber" className="text-sm font-medium">Fiber</label>
                  <Input
                    id="fiber"
                    name="nutritionalInfo.fiber"
                    value={newProduct.nutritionalInfo.fiber}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="originalPrice" className="text-sm font-medium">Original Price</label>
                  <Input
                    id="originalPrice"
                    type="number"
                    name="originalPrice"
                    value={newProduct.originalPrice}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="discount" className="text-sm font-medium">Discount (%)</label>
                  <Input
                    id="discount"
                    type="number"
                    name="discount"
                    value={newProduct.discount}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isNewProduct"
                    checked={newProduct.isNewProduct}
                    onCheckedChange={(checked) => 
                      setNewProduct((prev) => ({ ...prev, isNewProduct: !!checked }))
                    }
                  />
                  <label htmlFor="isNewProduct" className="text-sm font-medium">Is New Product</label>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tag" className="text-sm font-medium">Tag</label>
                  <Input
                    id="tag"
                    name="tag"
                    value={newProduct.tag}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="rating" className="text-sm font-medium">Rating</label>
                  <Input
                    id="rating"
                    type="number"
                    name="rating"
                    value={newProduct.rating}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium">Weight</label>
                  <Input
                    id="weight"
                    name="weight"
                    value={newProduct.weight}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="sku" className="text-sm font-medium">SKU</label>
                  <Input
                    id="sku"
                    name="sku"
                    value={newProduct.sku}
                    onChange={handleNewProductChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleNewProductChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="ingredients" className="text-sm font-medium">Ingredients</label>
                  <Input
                    id="ingredients"
                    name="ingredients"
                    value={newProduct.ingredients.join(', ')}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, ingredients: e.target.value.split(',').map(i => i.trim()) }))}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="image" className="text-sm font-medium">Image Link</label>
                  <Input
                    id="image"
                    name="image"
                    value={newProduct.image}
                    onChange={handleNewProductChange}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Add Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && currentProduct && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); handleEditProduct(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Product Name</label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleCurrentProductChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-category" className="text-sm font-medium">Category</label>
                  <select
                    id="edit-category"
                    name="category"
                    value={currentProduct.category}
                    onChange={handleCurrentProductChange}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select Category</option>
                    {productCategories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-brand" className="text-sm font-medium">Brand</label>
                  <Select
                    value={currentProduct.brand}
                    onValueChange={(value) => setCurrentProduct({...currentProduct, brand: value})}
                  >
                    <select
                      id="edit-brand"
                      name="brand"
                      value={currentProduct.brand}
                      onChange={handleCurrentProductChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      <option value="">Select Brand</option>
                      {brands.filter(b => b !== 'All').map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-price" className="text-sm font-medium">Price ($)</label>
                  <Input
                    id="edit-price"
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleCurrentProductChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-stock" className="text-sm font-medium">Stock</label>
                  <Input
                    id="edit-stock"
                    type="number"
                    name="stock"
                    value={currentProduct.stock}
                    onChange={handleCurrentProductChange}
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                  <Select
                    value={currentProduct.status}
                    onValueChange={(value) => setCurrentProduct({...currentProduct, status: value})}
                  >
                    <select
                      id="edit-status"
                      name="status"
                      value={currentProduct.status}
                      onChange={handleCurrentProductChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-calories" className="text-sm font-medium">Calories</label>
                  <Input
                    id="edit-calories"
                    type="number"
                    name="nutritionalInfo.calories"
                    value={currentProduct.nutritionalInfo.calories}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-protein" className="text-sm font-medium">Protein</label>
                  <Input
                    id="edit-protein"
                    name="nutritionalInfo.protein"
                    value={currentProduct.nutritionalInfo.protein}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-fat" className="text-sm font-medium">Fat</label>
                  <Input
                    id="edit-fat"
                    name="nutritionalInfo.fat"
                    value={currentProduct.nutritionalInfo.fat}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-carbs" className="text-sm font-medium">Carbohydrates</label>
                  <Input
                    id="edit-carbs"
                    name="nutritionalInfo.carbohydrates"
                    value={currentProduct.nutritionalInfo.carbohydrates}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-fiber" className="text-sm font-medium">Fiber</label>
                  <Input
                    id="edit-fiber"
                    name="nutritionalInfo.fiber"
                    value={currentProduct.nutritionalInfo.fiber}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-originalPrice" className="text-sm font-medium">Original Price</label>
                  <Input
                    id="edit-originalPrice"
                    type="number"
                    name="originalPrice"
                    value={currentProduct.originalPrice}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-discount" className="text-sm font-medium">Discount (%)</label>
                  <Input
                    id="edit-discount"
                    type="number"
                    name="discount"
                    value={currentProduct.discount}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-isNewProduct"
                    checked={currentProduct.isNewProduct}
                    onCheckedChange={(checked) => 
                      setCurrentProduct((prev) => ({ ...prev, isNewProduct: !!checked }))
                    }
                  />
                  <label htmlFor="edit-isNewProduct" className="text-sm font-medium">Is New Product</label>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-tag" className="text-sm font-medium">Tag</label>
                  <Input
                    id="edit-tag"
                    name="tag"
                    value={currentProduct.tag}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-rating" className="text-sm font-medium">Rating</label>
                  <Input
                    id="edit-rating"
                    type="number"
                    name="rating"
                    value={currentProduct.rating}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-weight" className="text-sm font-medium">Weight</label>
                  <Input
                    id="edit-weight"
                    name="weight"
                    value={currentProduct.weight}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-sku" className="text-sm font-medium">SKU</label>
                  <Input
                    id="edit-sku"
                    name="sku"
                    value={currentProduct.sku}
                    onChange={handleCurrentProductChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={currentProduct.description}
                    onChange={handleCurrentProductChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="edit-ingredients" className="text-sm font-medium">Ingredients</label>
                  <Input
                    id="edit-ingredients"
                    name="ingredients"
                    value={currentProduct.ingredients.join(', ')}
                    onChange={(e) => setCurrentProduct((prev) => ({ ...prev, ingredients: e.target.value.split(',').map(i => i.trim()) }))}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="edit-image" className="text-sm font-medium">Image Link</label>
                  <Input
                    id="edit-image"
                    name="image"
                    value={currentProduct.image}
                    onChange={handleCurrentProductChange}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Update Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{currentProduct.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default ProductsPage;
