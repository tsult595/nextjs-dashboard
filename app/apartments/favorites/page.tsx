import React from 'react';
import { getFavoriteApartments } from '../../lib/apartmentsActions';
import FavoriteApartmentCard from '../../ui/apartments/favoritesapArtmentsCard'; // ← ИСПРАВЬ ЭТО!
import Link from 'next/link';
import { HeartIcon, HomeIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic'; // ← добавь это
export const revalidate = 0; // ← и это

export default async function FavoritesPage() {
  const favorites = await getFavoriteApartments();

  console.log('📊 Favorites:', favorites); // ← дебаг

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <HeartIcon className="h-10 w-10 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Избранные квартиры
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {favorites.length === 0
              ? 'У вас пока нет избранных квартир'
              : `${favorites.length} ${favorites.length === 1 ? 'квартира' : 'квартир'} в избранном`}
          </p>
        </div>

        {/* Список избранных */}
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Нет избранных квартир
              </h3>
              <p className="text-gray-600 mb-8">
                Добавьте квартиры в избранное, чтобы легко найти их позже
              </p>
              <Link
                href="/apartments"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                <HomeIcon className="h-5 w-5" />
                Посмотреть квартиры
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((apartment) => (
              <FavoriteApartmentCard
                key={apartment.id}
                id={apartment.id}
                name={apartment.name}
                location={apartment.location}
                city={apartment.city}
                price={apartment.price}
                favoritedAt={apartment.favorited_at}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}