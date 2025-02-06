"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    router.push(`/vacancies?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="max-w-[400px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Hledat pracovní nabídky..."
          className="focus:outline-none p-2 rounded-l-md text-blue-600 font-semibold pl-4 pr-16"
        />
        <button
          type="submit"
          className="hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md"
        >
          Hledat
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
