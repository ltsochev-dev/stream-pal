import React, { useState, useEffect } from "react";
import VirtualKeyboard from "../components/VirtualKeyboard/VirtualKeyboard";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleSearch = () => {
    console.log("todo search", debouncedQuery);
  };

  const handleVirtualInput = (key: string) => {
    setQuery((prev) => prev + key);
  };

  const handleClearInput = () => {
    setQuery("");
  };

  const handleSubmit = () => {
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedQuery, handleSearch]);

  return (
    <div className="container mx-auto bg-gray-900 p-4 h-fit">
      <div className="grid grid-cols-[32rem_1fr] gap-6">
        <VirtualKeyboard
          onInput={handleVirtualInput}
          onClear={handleClearInput}
          onSubmit={handleSubmit}
        />
        <div className="search-form">
          <h1 className="text-3xl font-bold mb-4">
            Search TV Shows &amp; Movies
          </h1>
          <form onSubmit={(e) => e.preventDefault()} className="mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a show..."
              className="w-full p-2 border border-gray-300 rounded mb-2 text-gray-700"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Search
            </button>
          </form>
          <div>
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((result) => (
                  <li
                    key={result.id}
                    className="p-2 bg-white border border-gray-300 rounded"
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
