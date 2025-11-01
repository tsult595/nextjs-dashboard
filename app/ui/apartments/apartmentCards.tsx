"'use client';"

import { Heart } from 'lucide-react';
import React from 'react'
import FavoriteButton from './favoriteButton';

const ApartmentCards = ({name , location, city, price , id} :{ name: string; location: string; city: string; price: string; id: string; }) => {
  return (

        <div className="p-4 w-3/4 border rounded-lg shadow-sm hover:shadow-md transition-shadow text-center bg-white relative">
        <FavoriteButton apartmentId={id} initialIsFavorites={false}  />
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-600">{city}</p>
        <p className="text-gray-600">{price}</p>
        </div>

  )
}

export default ApartmentCards