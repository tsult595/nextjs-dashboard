import { notFound } from 'next/navigation';
import { getApartmentById } from '@/app/lib/apartmentsActions';
import Link from 'next/link';
import { ArrowLeftIcon, MapPinIcon, BuildingOfficeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const apartment = await getApartmentById(id);
  
  if (!apartment) {
    notFound();
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Кнопка назад */}
      <Link 
        href="/apartments"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Apartments</span>
      </Link>

      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {apartment.name || 'Apartment Details'}
        </h1>
        <p className="text-xl text-gray-600">
          {apartment.city}, {apartment.building} - Apt {apartment.apartment_number}
        </p>
      </div>

      {/* Карточка с деталями */}
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Цена */}
        <div className="flex items-center gap-3 pb-6 border-b">
          <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Price per month</p>
            <p className="text-3xl font-bold text-gray-900">${apartment.price}</p>
          </div>
        </div>

        {/* Локация */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
          
          <div className="flex items-start gap-3">
            <MapPinIcon className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900">City</p>
              <p className="text-gray-600">{apartment.city}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BuildingOfficeIcon className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Building</p>
              <p className="text-gray-600">{apartment.building}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-6 w-6 flex items-center justify-center bg-blue-100 rounded text-blue-600 font-bold mt-1">
              #
            </div>
            <div>
              <p className="font-medium text-gray-900">Apartment Number</p>
              <p className="text-gray-600">{apartment.apartment_number}</p>
            </div>
          </div>

          {apartment.location && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900 mb-1">Additional Info</p>
              <p className="text-gray-600">{apartment.location}</p>
            </div>
          )}
        </div>

        {/* Кнопки действий */}
        <div className="flex gap-4 pt-6 border-t">
          <Link
            href={`/apartments/${id}/edit`}
            className="flex-1 bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition font-medium"
          >
            Edit Apartment
          </Link>
          <button
            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Full Address</h3>
        <p className="text-gray-700">
          {apartment.city}, {apartment.building}, Apartment {apartment.apartment_number}
        </p>
      </div>
    </main>
  );
}