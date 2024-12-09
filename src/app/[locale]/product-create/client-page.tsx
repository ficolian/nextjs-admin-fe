'use client';

// import type { Product } from '@arcjet/next';
import axios from 'axios';
import { useState } from 'react';

interface ProductModel {
  id: number | null,
  productId: number | null,
  productName: string | null;
  quantity: number | null;
  category: string | null;
}

export default function ClientPage() {
  const [isLoading, setIsLoading] = useState(false);  
  // const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel>({
    id: null,
    productId: null,
    productName: null,
    quantity: null,
    category: null
  });
  const backToDashBoard = async () =>{
    window.location.href = '/product';
  };
  const handleSaveEdit = async () => {
    if (!selectedProduct) return;

    selectedProduct.id = selectedProduct.productId
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token")
      const response = await axios.post(
        `https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products`,
        selectedProduct,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setIsLoading(false)
        alert(response.data.message);
        window.location.href = '/product';
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleFieldChange = (field: keyof ProductModel, value: any) => {
    setSelectedProduct((prevState) => {
      return {
        ...prevState, 
        [field]: value,
      };
    });
  };

  return (
    <div>
        <div className="flex w-full justify-center">
          <div className="edit-form max-w-md mx-auto bg-white p-6">
            <h4 className="text-2xl font-semibold text-center mb-6">Create Product</h4>
            <form className="space-y-4">
              {/* Product Name */}
              <div className="flex flex-col">
                <label htmlFor="productName" className="text-sm font-medium text-gray-700">
                  Product Name:
                </label>
                <input
                  id="productName"
                  type="text"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // value={selectedProduct.productName || ''}
                  onChange={(e) => handleFieldChange("productName", e.target.value)}
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // value={selectedProduct.quantity || ''}
                  onChange={(e) => handleFieldChange("quantity", e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category:
                </label>
                <input
                  id="category"
                  type="text"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // value={selectedProduct.category || ''}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={backToDashBoard}
                  className="w-1/2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg flex items-center justify-center">
              <div className="loader-border border-t-transparent border-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
              <p className="ml-4 text-lg text-gray-700">Loading...</p>
            </div>
          </div>
        )}
    </div>
    
  );
}
