import SearchForm from "@/components/dashboard/search-form-user";
import UserCard from "@/components/dashboard/user-card";
import { Title } from "@/components/shared/title";
import { fetchAllUsers } from "@/lib/data";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kandidáti",
  description: "Dashboard kandidáti",
};

export interface SearchParamsProps {
  gender?: string;
  ageFrom?: number;
  ageTo?: number;
  salaryFrom?: number;
  salaryTo?: number;
  region?: string;
  checked?: string;
  sortBy?: "name_asc" | "name_desc" | "date_asc" | "date_desc";
  search?: string;
  telegramId?: number;
}

const Dashboard = async ({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) => {
  const users = await fetchAllUsers(searchParams);

  if (!users || users.length === 0)
    return (
      <div className="h-full overflow-hidden">
        <Title text="No users yet" size="2xl" className="font-bold" />
        <SearchForm />
        <div className="relative size-[300px] sm:size-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src="/nousers.webp" alt="No users" fill />
        </div>
      </div>
    );

  return (
    <div className="pt-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-2">
        <div className="flex items-center">
          <span className="text-2xl font-bold">Uchazeči:</span>
          <span className="text-2xl font-semibold">{users.length}</span>
        </div>
        <SearchForm />
      </div>
      <div className="px-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:h-[calc(100vh-172px)] overflow-auto scrollbar">
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            fullName={user.fullName}
            imageUrl={user.photo}
            gender={user.gender}
            age={user.age}
            city={user.city}
            region={user.region}
            professions={user.professions}
            expectedSalary={user.expectedSalary}
            phone={user.phone}
            email={user.email}
            checked={user.checked}
            createdAt={user.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
