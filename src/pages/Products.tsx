
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Food",
    price: 456,
    image: "https://media.istockphoto.com/id/539071535/photo/bowl-of-dog-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=YQ57eyiNCZhB52CdwPjkYKI3QLHjBBqRk3NTjTNvm7Y=",
    description: "High-quality, nutritionally balanced dog food suitable for all breeds and ages.",
    inStock: true
  },
  {
    id: 2,
    name: "Luxury Cat Bed",
    category: "Bedding",
    price: 789,
    image: "https://th.bing.com/th/id/OIP.1Rr8kJ4wcenHehgUUBv0eAHaD4?cb=iwc1&rs=1&pid=ImgDetMain",
    description: "Soft, comfortable bed for your feline friend with raised edges for security.",
    inStock: true
  },
  {
    id: 3,
    name: "Interactive Dog Toy",
    category: "Toys",
    price: 375,
    image: "https://images.unsplash.com/photo-1546491764-67a5b8d5b3ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Durable toy that dispenses treats and keeps your dog entertained for hours.",
    inStock: true
  },
  {
    id: 4,
    name: "Automatic Water Fountain",
    category: "Accessories",
    price: 866,
    image: "https://m.media-amazon.com/images/I/713tyuCOAOL._AC_SL1500_.jpg",
    description: "Fresh flowing water to encourage pets to drink more and stay hydrated.",
    inStock: true
  },
  {
    id: 5,
    name: "Cat Scratching Post",
    category: "Furniture",
    price: 1090,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Sturdy scratching post with a sisal surface to protect your furniture.",
    inStock: true
  },
  {
    id: 6,
    name: "Pet Grooming Kit",
    category: "Grooming",
    price: 1540,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Complete grooming set including brushes, combs, and nail clippers.",
    inStock: true
  },
  {
    id: 7,
    name: "Adjustable Dog Harness",
    category: "Accessories",
    price: 620,
    image: "https://m.media-amazon.com/images/I/81pb9D19quL._AC_SL1500_.jpg",
    description: "Comfortable and secure harness with adjustable straps for dogs of all sizes.",
    inStock: true
  },
  {
    id: 8,
    name: "Organic Catnip",
    category: "Toys",
    price: 150,
    image: "https://thecatconnection.com/cdn/shop/files/catnip-loose.png?v=1715020647",
    description: "Premium quality organic catnip to stimulate playful behavior in cats.",
    inStock: true
  },
  {
    id: 9,
    name: "Pet Travel Carrier",
    category: "Accessories",
    price: 1350,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUa_RjvObrKLuvWD7Rb4aFqaL6-lhfOXgkpNeLQ2q1F11lt_Zsm5g3wJR-D6-DwuNyGLI&usqp=CAU",
    description: "Airline-approved travel carrier for safe and comfortable pet journeys.",
    inStock: true
  },
  {
    id: 10,
    name: "Dog Raincoat",
    category: "Clothing",
    price: 499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLy2t2_M_DbRK5B2aq1jcWGHtxtDuxXFPXSw&s",
    description: "Waterproof dog raincoat with adjustable hood to keep your pet dry in the rain.",
    inStock: false
  },
  {
    id: 11,
    name: "Pet Feeding Mat",
    category: "Accessories",
    price: 240,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv7kZPMsL3bADAsw7MAyuLxjzPJzIbDo2row&s",
    description: "Non-slip silicone mat to keep food and water bowls in place.",
    inStock: true
  },
  {
    id: 12,
    name: "Squeaky Plush Toy",
    category: "Toys",
    price: 199,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoADm029wgVLTuCl0s3BqJCO7ix5GBthWq2Q&s",
    description: "Soft and squeaky toy perfect for indoor playtime with dogs.",
    inStock: true
  },
  {
    id: 13,
    name: "Cat Grooming Glove",
    category: "Grooming",
    price: 330,
    image: "https://media.gettyimages.com/id/2157276745/photo/brushing-cat-fur-or-hair-with-glove-at-home.jpg?s=612x612&w=gi&k=20&c=be6sjakOw7vCDaVtqBTKgiig5bdGHY1TVZX2zObH_4E=",
    description: "Easy-to-use grooming glove that removes loose hair while petting your cat.",
    inStock: true
  },
  {
    id: 14,
    name: "Pet Toothbrush Set",
    category: "Grooming",
    price: 180,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7Hzy_g-vWTbtk8N5iQCqX5k2FYl0NS3dlg&s",
    description: "Dental care kit including brushes and pet-safe toothpaste.",
    inStock: true
  },
  {
    id: 15,
    name: "Collapsible Pet Bowl",
    category: "Accessories",
    price: 210,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx7rd77nCKWH7-2v7MmDHtZPyz7NCD7mGuWw&s",
    description: "Portable, space-saving silicone bowl for food or water on the go.",
    inStock: true
  },
  {
  id: 16,
  name: "Premium cat Food",
  category: "Food",
  price: 456,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVZ9gGHu8wiW85moXiKCgcJT-BGycjRhY-aQ&s",
  description: "High-quality, nutritionally balanced dog food suitable for all breeds and ages.",
  inStock: true
  }
  
];

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(mockProducts.map(product => product.category)))];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = categoryFilter === 'All' || product.category === categoryFilter;
    
    return matchesSearch && matchesFilter;
  });

  const addToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error(`${product.name} is currently out of stock.`);
      return;
    }
    
    // In a real app, this would call an API to add to cart
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2">Pet Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our selection of premium pet products, from food to toys and accessories.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter(category)}
                  className={categoryFilter === category ? 'bg-pawtrack-blue' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                      <span className="text-pawtrack-orange font-medium">Rs.{product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <Button 
                      className="w-full bg-pawtrack-blue hover:bg-pawtrack-blue-dark"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg">No products found matching your search.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('All');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
