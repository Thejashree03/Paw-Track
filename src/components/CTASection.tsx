
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="bg-pawtrack-blue">
      <div className="container px-4 py-12 mx-auto text-center sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block">Create your account today.</span>
        </h2>
        <div className="flex justify-center mt-8">
          <div className="inline-flex rounded-md shadow">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-pawtrack-blue hover:bg-gray-50">
                Sign up for free
              </Button>
            </Link>
          </div>
          <div className="inline-flex ml-3">
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-pawtrack-blue-dark">
                Contact sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
