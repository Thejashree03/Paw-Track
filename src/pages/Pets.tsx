
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  type: string;
  image: string;
  description: string;
  available: boolean;
}

const mockPets: Pet[] = [
  {
    id: 1,
    name: "Max",
    breed: "Golden Retriever",
    age: 3,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.",
    available: true
  },
  {
    id: 2,
    name: "Bella",
    breed: "Siamese",
    age: 2,
    type: "Cat",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Bella is a gentle and affectionate Siamese cat who enjoys lounging in sunny spots and being petted.",
    available: true
  },
  {
    id: 3,
    name: "Charlie",
    breed: "Beagle",
    age: 4,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Charlie is an adventurous Beagle with a keen sense of smell. He's great with children and other pets.",
    available: true
  },
  {
    id: 4,
    name: "Luna",
    breed: "Maine Coon",
    age: 3,
    type: "Cat",
    image: "https://images.unsplash.com/photo-1586289883499-f11d28abb4b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Luna is a majestic Maine Coon with a fluffy coat and friendly personality. She loves interactive toys.",
    available: false
  },
  {
    id: 5,
    name: "Cooper",
    breed: "Labrador Retriever",
    age: 5,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Cooper is a loyal and intelligent Labrador who excels at obedience training and loves to swim.",
    available: true
  },
  {
    id: 6,
    name: "Oliver",
    breed: "Scottish Fold",
    age: 2,
    type: "Cat",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Oliver is a curious and playful Scottish Fold who enjoys exploring and chasing toys.",
    available: true
  }
];

const Pets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('All');
  
  const filteredPets = mockPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'All' || pet.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2">Our Pets</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our adorable pets looking for a loving home. Browse through our selection and find your perfect companion.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search pets by name or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'All' ? 'default' : 'outline'}
                onClick={() => setFilterType('All')}
                className={filterType === 'All' ? 'bg-pawtrack-blue' : ''}
              >
                All
              </Button>
              <Button
                variant={filterType === 'Dog' ? 'default' : 'outline'}
                onClick={() => setFilterType('Dog')}
                className={filterType === 'Dog' ? 'bg-pawtrack-blue' : ''}
              >
                Dogs
              </Button>
              <Button
                variant={filterType === 'Cat' ? 'default' : 'outline'}
                onClick={() => setFilterType('Cat')}
                className={filterType === 'Cat' ? 'bg-pawtrack-blue' : ''}
              >
                Cats
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={pet.image} 
                      alt={pet.name} 
                      className="w-full h-full object-cover"
                    />
                    {!pet.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Adopted</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                      <span className="text-pawtrack-orange font-medium">{pet.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{pet.breed} · {pet.age} years old</p>
                    <p className="text-gray-600 mb-4 line-clamp-2">{pet.description}</p>
                    <Button 
                      className="w-full bg-pawtrack-blue hover:bg-pawtrack-blue-dark"
                      disabled={!pet.available}
                    >
                      {pet.available ? 'Learn More' : 'Not Available'}
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg">No pets found matching your search.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('All');
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

export default Pets;
