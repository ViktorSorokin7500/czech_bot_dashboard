"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [telegramId, setTelegramId] = useState(
    searchParams.get("telegramId") || ""
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("telegramId", telegramId);
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="text-blue-600 font-semibold flex flex-col md:flex-row gap-3 md:gap-0.5 items-center"
    >
      <label htmlFor="telegramId" className="text-lg mr-2">
        Hledat podle Telegram Id:
      </label>
      <input
        type="number"
        id="telegramId"
        value={telegramId}
        onChange={(e) => setTelegramId(e.target.value)}
        placeholder="Telegram ID"
        className="p-2 rounded border"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        Hledat
      </button>
    </form>
  );
}
