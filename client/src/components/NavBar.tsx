import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogIn, LogOut } from "lucide-react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demonstration purposes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-primary">TripGenius</h1>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <a href="#features" className="nav-item text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">Features</a>
            <a href="#destinations" className="nav-item text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">Destinations</a>
            <a href="#how-it-works" className="nav-item text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">How It Works</a>
            <a href="#testimonials" className="nav-item text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">Testimonials</a>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="account-btn ml-6 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                >
                  <User size={20} className="text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="animate-in slide-in-from-top-5 duration-300">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem onSelect={() => {}} className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                      <User className="mr-2 h-4 w-4 text-primary" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                      <LogOut className="mr-2 h-4 w-4 text-primary" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onSelect={handleLogin} className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                    <LogIn className="mr-2 h-4 w-4 text-primary" />
                    <span>Sign In</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <button 
              className="md:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#features" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Features</a>
          <a href="#destinations" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Destinations</a>
          <a href="#how-it-works" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">How It Works</a>
          <a href="#testimonials" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
          {!isLoggedIn ? (
            <a 
              href="#" 
              className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLogin}
            >
              Sign In
            </a>
          ) : (
            <>
              <a href="#" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                My Profile
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleLogout}
              >
                Sign Out
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
