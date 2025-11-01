'use client';

import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { addApartmentToFavorites, removeApartmentFromFavorites } from '@/app/lib/apartmentsActions';
import { useState, useTransition } from 'react';

export default function FavoriteButton({
  apartmentId,
  initialIsFavorites,
}: {
  apartmentId: string;
  initialIsFavorites: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorites);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();     
    e.stopPropagation();
    startTransition(async () => {
      if (isFavorite) {
        const result = await removeApartmentFromFavorites(apartmentId);
        if (result.success) {
          setIsFavorite(false);
        }
      } else {
        const result = await addApartmentToFavorites(apartmentId);
        if (result.success) {
          setIsFavorite(true);
        }
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="p-2 hover:bg-gray-100 rounded-full transition"
    >
      {isFavorite ? (
        <HeartSolidIcon className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
      )}
    </button>
  );
}