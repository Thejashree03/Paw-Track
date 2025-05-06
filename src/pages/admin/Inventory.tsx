
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

// Mock inventory data
const mockInventory = [
  { id: 1, name: 'Premium Dog Food', category: 'Food', stock: 75, price: 29.99, sku: 'DOG-FOOD-001' },
  { id: 2, name: 'Cat Scratching Post', category: 'Furniture', stock: 12, price: 45.99, sku: 'CAT-POST-002' },
  { id: 3, name: 'Dog Collar (Medium)', category: 'Accessories', stock: 32, price: 15.50, sku: 'DOG-COLL-003' },
  { id: 4, name: 'Pet Carrier', category: 'Travel', stock: 8, price: 65.00, sku: 'PET-CARR-004' },
  { id: 5, name: 'Interactive Cat Toy', category: 'Toys', stock: 5, price: 12.99, sku: 'CAT-TOY-005' },
  { id: 6, name: 'Fish Food Flakes', category: 'Food', stock: 45, price: 8.99, sku: 'FISH-FOOD-006' },
  { id: 7, name: 'Bird Cage (Large)', category: 'Housing', stock: 3, price: 89.99, sku: 'BIRD-CAGE-007' },
  { id: 8, name: 'Dog Bed', category: 'Bedding', stock: 18, price: 48.50, sku: 'DOG-BED-008' },
];

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(mockInventory.map(item => item.category)))];

  const handleAddItem = () => {
    toast.info('Add inventory item functionality would be implemented here');
  };

  const handleEditItem = (id: number) => {
    toast.info(`Edit inventory item with ID: ${id}`);
  };

  const handleDeleteItem = (id: number) => {
    toast.success(`Inventory item with ID: ${id} has been deleted`);
  };

  const handleRestock = (id: number) => {
    toast.success(`Restock order placed for item ID: ${id}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-gray-500">Manage your product inventory and stock levels.</p>
        </div>
        <Button 
          className="mt-4 sm:mt-0 bg-pawtrack-blue hover:bg-pawtrack-blue-dark"
          onClick={handleAddItem}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-bold">{mockInventory.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                <p className="text-2xl font-bold">{mockInventory.filter(item => item.stock < 10).length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">$4,285.45</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category} Category</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="hidden sm:table-cell">SKU</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                        ${item.stock > 20 ? 'bg-green-100 text-green-800' : 
                        item.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                        {item.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden sm:table-cell font-mono text-xs">{item.sku}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {item.stock < 10 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestock(item.id)}
                            className="hidden sm:inline-flex h-8"
                          >
                            Restock
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditItem(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredInventory.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No inventory items found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// This component is missing from lucide-react in our provided list, 
// so I'll create a simple version of it
const Package = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16.5 9.4l-9-5.19"></path>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
    <polyline points="3.29 7 12 12 20.71 7"></polyline>
    <line x1="12" y1="22" x2="12" y2="12"></line>
  </svg>
);

// DollarSign icon for the inventory value card
const DollarSign = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default Inventory;
