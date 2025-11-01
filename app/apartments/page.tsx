import { getAllApartments } from '@/app/lib/apartmentsActions';
import ApartmentCards from '../ui/apartments/apartmentCards';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import Search from '../ui/search';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>; // ← Promise!
}) {
  const { query = '' } = await searchParams; // ← добавь await!
  const apartments = await getAllApartments(query);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Available Apartments
            </h1>
            <p className="text-gray-600">
              {apartments.length} {apartments.length === 1 ? 'apartment' : 'apartments'} available
            </p>
          </div>
          
          <Link
            href="/apartments/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="font-medium">Add New</span>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Search placeholder="Search apartments by name, city, or location..." />
        </div>

        {/* Список карточек */}
        {apartments.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              {query ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try searching with different keywords
                  </p>
                  <Link
                    href="/apartments"
                    className="text-blue-600 hover:underline"
                  >
                    Clear search
                  </Link>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PlusIcon className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No apartments yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start by creating your first apartment listing
                  </p>
                  <Link
                    href="/apartments/create"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    <PlusIcon className="h-5 w-5" />
                    Create First Apartment
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt) => (
              <Link 
                key={apt.id} 
                href={`/apartments/${apt.id}`}
                className="block transform transition hover:-translate-y-1"
              >
                <ApartmentCards
                  id={apt.id}
                  name={apt.name}
                  location={apt.location}
                  city={apt.city}
                  price={apt.price}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}