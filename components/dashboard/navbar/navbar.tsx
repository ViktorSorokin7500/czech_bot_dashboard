"use client";

import React from "react";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Динамически импортируем MobileNav только если это не главная страница
const MobileNav = dynamic(
  () => import("./mobile-nav").then((mod) => mod.default),
  { ssr: false, loading: () => null }
);

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      {pathname == "/" && (
        <div className="block lg:hidden">
          <MobileNav>
            <Menu size={40} />
          </MobileNav>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-2 px-4 bg-gray-100 rounded-lg shadow-sm">
        <Link
          href="/"
          className={`${
            pathname === "/"
              ? "bg-blue-600 rounded-full px-4 py-1 hover:bg-blue-700"
              : "text-blue-600 hover:text-blue-800 hover:underline"
          }`}
        >
          Kandidáti
        </Link>
        <Link
          href="/vacancies"
          className={`${
            pathname === "/vacancies"
              ? "bg-blue-600 rounded-full px-4 py-1 hover:bg-blue-700"
              : "text-blue-600 hover:text-blue-800 hover:underline"
          }`}
        >
          Pracovní nabídky
        </Link>
        <Link
          href="/create-vacancies"
          className={`${
            pathname === "/create-vacancies"
              ? "bg-blue-600 rounded-full px-4 py-1 hover:bg-blue-700"
              : "text-blue-600 hover:text-blue-800 hover:underline"
          }`}
        >
          Vytvořte pracovní nabídku
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
