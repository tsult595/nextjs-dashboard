import React from 'react';
import Search from '../ui/search';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query = '' } = await searchParams;

  // Твой текст
  const text = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel neque impedit fugiat cum incidunt qui ullam facilis dolores, dolorem, molestiae consequuntur, pariatur maiores repellat sequi dolore necessitatibus temporibus laborum omnis nemo modi eveniet earum. Officiis vel voluptas ex, optio rerum at velit, distinctio consequatur dolor quisquam vero praesentium commodi nisi?`;

  // Функция для подсветки найденных слов
  const highlightText = (text: string, query: string) => {
    if (!query) return <p>{text}</p>;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
      <p>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-300 font-semibold px-1 rounded">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </p>
    );
  };

  // Подсчёт найденных слов
  const countMatches = (text: string, query: string) => {
    if (!query) return 0;
    const regex = new RegExp(query, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  };

  const matchCount = countMatches(text, query);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Letters</h1>

        {/* Search */}
        <div className="mb-6">
          <Search placeholder="Search words in text..." />
        </div>

        {/* Результаты поиска */}
        {query && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              {matchCount > 0 ? (
                <>
                  Found <strong>{matchCount}</strong> match{matchCount !== 1 && 'es'} for "{query}"
                </>
              ) : (
                <>No matches found for "{query}"</>
              )}
            </p>
          </div>
        )}

        {/* Текст с подсветкой */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-gray-700 leading-relaxed text-lg">
            {highlightText(text, query)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;