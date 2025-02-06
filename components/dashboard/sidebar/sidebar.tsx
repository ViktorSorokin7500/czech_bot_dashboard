"use client";
import React, { Suspense } from "react";
import { LogOut } from "lucide-react";
import Filter from "./filter";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie =
      "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    router.push("/login");
  };
  return (
    <div className="h-screen flex flex-col justify-between py-5 px-9">
      <Suspense fallback={<div>Načítání...</div>}>
        <Filter />
      </Suspense>

      <button
        onClick={handleLogout}
        className="w-full p-1 flex items-center gap-4 justify-center border-2 border-rose-50 rounded-lg bg-backgroundSoft hover:bg-background transition-all duration-300"
      >
        <LogOut />
        <span className="text-2xl">Odhlaste se</span>
      </button>
    </div>
  );
};

export default Sidebar;
