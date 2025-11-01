import CreateApartmentForm from '@/app/ui/apartments/form';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      {/* Кнопка назад */}
      <Link 
        href="/apartments"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Apartments</span>
      </Link>

      <h1 className="text-3xl font-bold mb-8">Create New Apartment</h1>

      <CreateApartmentForm />
    </main>
  );
}