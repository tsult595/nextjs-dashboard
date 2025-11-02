'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, CurrencyDollarIcon, TrashIcon } from '@heroicons/react/24/outline';
import { removeApartmentFromFavorites } from '@/app/lib/apartmentsActions';

export default function FavoriteApartmentCard({
  id,
  name,
  location,
  city,
  price,
  favoritedAt,
}: {
  id: string;
  name: string;
  location: string;
  city: string;
  price: number;
  favoritedAt: Date;
}) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsRemoving(true);
    setTimeout(() => {
      startTransition(async () => {
        await removeApartmentFromFavorites(id);
      });
    }, 100);
  };

  return (
    <Link href={`/apartments/${id}`}>
      <div
        className={`relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
          isRemoving ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {/* Badge "В избранном" */}
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 z-10">
          <HeartSolidIcon className="h-4 w-4" />
          В избранном
        </div>

        {/* Кнопка удаления */}
        <button
          onClick={handleRemove}
          disabled={isPending}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur hover:bg-red-500 hover:text-white rounded-full transition z-10 shadow-md"
          title="Удалить из избранного"
        >
          <TrashIcon className="h-5 w-5" />
        </button>

        {/* Контент карточки */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
            {name}
          </h2>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPinIcon className="h-5 w-5" />
              <span>{location}, {city}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              <span>${price}/month</span>
            </div>
          </div>

          {/* Дата добавления в избранное */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Добавлено: {new Date(favoritedAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Hover эффект */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  );
}