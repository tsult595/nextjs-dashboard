'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function InvoiceFilter({
  value,
  options,
}: {
  value?: string;
  options: { label: string; value: string }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (filter: string) => {
    const params = new URLSearchParams(searchParams);

    if (filter && filter !== 'all') {
      params.set('filter', filter);
    } else {
      params.delete('filter');
    }
    
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="filter" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="filter"
        value={searchParams.get('status') || 'all'}
        onChange={(e) => handleChange(e.target.value)}
        className="block rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}