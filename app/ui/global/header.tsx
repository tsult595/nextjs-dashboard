import React from 'react';
import AcmeLogo from '../acme-logo';
import Link from 'next/link';
import { Button } from '../button';
import { 
  QuestionMarkCircleIcon, 
  HomeIcon, 
  UserCircleIcon,
  Bars3Icon 
} from '@heroicons/react/24/outline';
import { Heart } from 'lucide-react';
import { getFavoritesCount } from '@/app/lib/apartmentsActions';

// ← Добавь async!
const Header = async () => {
  // ← Добавь await!
  const favoritesCount = await getFavoritesCount();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <AcmeLogo />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">Booking.com</h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <Link 
              href="/apartments" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Apartments</span>
            </Link>

            <Link 
              href="/helpDashboard" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <QuestionMarkCircleIcon className="h-5 w-5" />
              <span>Help Center</span>
            </Link>

            <Link href="/apartments/create">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition ml-2">
                + New Apartment
              </Button>
            </Link>

            {/* Favorites Button */}
            <Link href="/favorites">
              <Button className="bg-red-500 text-white hover:bg-red-600 transition ml-2 relative">
                <Heart className="w-5 h-5 mr-2" />
               
                
                {/* Badge со счётчиком */}
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-red-500">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>

            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <UserCircleIcon className="h-8 w-8 text-gray-600" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;