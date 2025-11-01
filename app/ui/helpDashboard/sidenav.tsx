import Link from 'next/link';
import NavLinks from '@/app/ui/helpDashboard/nav-links';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-green-600 p-4 md:h-40"
        href="/helpDashboard"
      >
        <div className="w-32 text-white md:w-40 flex items-center gap-2">
          <QuestionMarkCircleIcon className="h-12 w-12" />
          <span className="text-2xl font-bold">Help Center</span>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}