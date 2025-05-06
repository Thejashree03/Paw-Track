import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface Service {
  id: number;
  name: string;
  icon: string;
  description: string;
  price: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    name: "Basic Grooming",
    icon: "🧼",
    description: "Essential grooming service for your pet's hygiene and comfort.",
    price: "Rs.569 only",
    features: [
      "Bath with premium pet shampoo",
      "Brush out & blow dry",
      "Nail trimming",
      "Ear cleaning",
      "30-minute session"
    ]
  },
  {
    id: 2,
    name: "Premium Grooming",
    icon: "✂️",
    description: "Complete grooming package to keep your pet looking and feeling their best.",
    price: "Rs.1089 only",
    features: [
      "All Basic Grooming services",
      "Haircut & styling",
      "Teeth brushing",
      "Paw pad trimming",
      "Scented finishing spray",
      "60-minute session"
    ]
  },
  {
    id: 3,
    name: "Dog Walking",
    icon: "🦮",
    description: "Regular exercise to keep your dog healthy and happy.",
    price: "Rs.200/walk",
    features: [
      "30-minute walks",
      "Flexible scheduling",
      "GPS tracking",
      "Post-walk report",
      "Fresh water provided"
    ]
  },
  {
    id: 4,
    name: "Pet Sitting",
    icon: "🏠",
    description: "In-home care when you're away, keeping your pet comfortable in familiar surroundings.",
    price: "Rs.399/day",
    features: [
      "Feeding & water refreshment",
      "Medication administration",
      "Playtime & exercise",
      "Litter box/waste cleanup",
      "Daily updates with photos"
    ]
  },
  {
    id: 5,
    name: "Veterinary Check-up",
    icon: "🩺",
    description: "Routine health examination by our licensed veterinarians.",
    price: "Rs.1599",
    features: [
      "Physical examination",
      "Weight monitoring",
      "Vaccination review",
      "Dental check",
      "Nutritional consultation",
      "45-minute appointment"
    ]
  },
  {
    id: 6,
    name: "Training Sessions",
    icon: "🏆",
    description: "Professional training to address behavior issues or teach new skills.",
    price: "Rs.899/session",
    features: [
      "Personalized training plan",
      "Basic commands",
      "Behavior modification",
      "Positive reinforcement techniques",
      "Progress tracking",
      "60-minute session"
    ]
  },
  {
    id: 7,
    name: "Pet Massage",
    icon: "💆‍♂️",
    description: "Relaxation therapy to improve your pet's well-being and reduce stress.",
    price: "Rs.499/session",
    features: [
      "Muscle relaxation techniques",
      "Stress relief",
      "Improves circulation",
      "Helps with joint pain",
      "20-minute session"
    ]
  },
  {
    id: 8,
    name: "Pet Photography",
    icon: "📸",
    description: "Capture special moments of your furry friend with professional photography.",
    price: "Rs.2000/session",
    features: [
      "Outdoor or indoor photoshoots",
      "High-quality prints",
      "Personalized photo album",
      "Pet-friendly photographer",
      "1-hour session"
    ]
  },
  {
    id: 9,
    name: "Pet Adoption Assistance",
    icon: "🏡",
    description: "Helping you find a loving home for your pet or adopt a new one.",
    price: "Free consultation",
    features: [
      "Pet matching",
      "Adoption paperwork assistance",
      "Home checks",
      "Adoption guidance",
      "Post-adoption support"
    ]
  },
  {
    id: 10,
    name: "Pet Taxi Service",
    icon: "🚗",
    description: "Safe and comfortable transportation for your pet to and from appointments.",
    price: "Rs.299/ride",
    features: [
      "Door-to-door service",
      "Air-conditioned vehicle",
      "GPS tracking",
      "Experienced drivers",
      "Flexible scheduling"
    ]
  },
  {
    id: 11,
    name: "Pet Travel Preparation",
    icon: "✈️",
    description: "Preparation services to make your pet’s travel stress-free.",
    price: "Rs.1500",
    features: [
      "Health certification",
      "Travel carrier preparation",
      "Travel documentation",
      "Vaccination check",
      "Travel tips & advice"
    ]
  },
  {
    id: 12,
    name: "Nail Painting",
    icon: "💅",
    description: "Give your pet a fun and colorful look with our nail painting service.",
    price: "Rs.299",
    features: [
      "Safe non-toxic nail polish",
      "Creative designs",
      "Quick and gentle application",
      "Pet-friendly professionals",
      "5-minute session"
    ]
  },
  {
    id: 13,
    name: "Pet Weight Management",
    icon: "⚖️",
    description: "Help your pet maintain a healthy weight with a personalized plan.",
    price: "Rs.999/month",
    features: [
      "Dietary consultation",
      "Weight tracking",
      "Exercise planning",
      "Monthly check-ins",
      "Progress reports"
    ]
  },
  {
    id: 14,
    name: "Pet Hydrotherapy",
    icon: "💦",
    description: "Water therapy to help your pet recover from injuries or surgeries.",
    price: "Rs.1200/session",
    features: [
      "Rehabilitation therapy",
      "Improves joint mobility",
      "Assists with pain relief",
      "Safe, supervised sessions",
      "30-minute session"
    ]
  },
  {
    id: 15,
    name: "Pet Daycare",
    icon: "🐾",
    description: "Daytime care for your pet while you’re at work or busy.",
    price: "Rs.699/day",
    features: [
      "Playtime with other pets",
      "Meal and water provided",
      "Walks and exercise",
      "Safety and comfort focus",
      "Daily updates and photos"
    ]
  }
];

const Services: React.FC = () => {
  const bookService = (serviceName: string) => {
    toast.success(`Booking request for ${serviceName} submitted!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional pet care services to keep your furry friends healthy, happy, and looking their best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <span className="text-4xl mb-2 block">{service.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                    <p className="text-pawtrack-orange font-bold text-xl mt-2">{service.price}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                  
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pawtrack-blue mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full bg-pawtrack-blue hover:bg-pawtrack-blue-dark"
                    onClick={() => bookService(service.name)}
                  >
                    Book Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-pawtrack-blue/10 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Custom Pet Care Plans</h2>
            <p className="text-gray-600 mb-4">
              Need a customized care plan for your pet? Contact us to discuss your specific requirements and we'll tailor our services to meet your needs.
            </p>
            <Button 
              variant="outline" 
              className="border-pawtrack-blue text-pawtrack-blue hover:bg-pawtrack-blue hover:text-white"
              onClick={() => toast.info("Contact form will open here")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
