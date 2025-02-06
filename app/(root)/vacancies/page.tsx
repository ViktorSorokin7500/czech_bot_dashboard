import JobCard from "@/components/dashboard/job-card";
import SearchForm from "@/components/dashboard/search-form";
import { Title } from "@/components/shared/title";
import { fetchAllJobs } from "@/lib/data";
import Image from "next/image";
import React from "react";
import Navbar from "@/components/dashboard/navbar/navbar";
import { SearchParamsProps } from "../(dashboard)/page";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pracovní nabídky",
  description: "Dashboard pracovní nabídky",
};

const Vacancies = async ({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) => {
  const jobs = await fetchAllJobs(searchParams);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="h-full overflow-hidden p-5">
        <Navbar />
        <div className="pt-4" />
        <SearchForm />
        <Title
          text="Žádné nabídky ještě nejsou"
          size="2xl"
          className="font-bold"
        />
        <div className="relative size-[300px] sm:size-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src="/nousers.webp" alt="No jobs" fill />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <Navbar />
      <div className="pt-4" />
      <SearchForm />
      <div className="flex items-center gap-2 pb-2">
        <span className="text-2xl font-bold">Dostupné pracovní nabídky:</span>
        <span className="text-2xl font-semibold">{jobs.length}</span>
      </div>
      <div className="p-4 flex flex-col gap-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id.toString()}
            id={job._id.toString()}
            name={job.name}
            description={job.description}
            salary={job.salary}
            city={job.city}
            voivodeship={job.voivodeship}
            responsibilities={job.responsibilities}
            bonuses={job.bonuses}
          />
        ))}
      </div>
    </div>
  );
};

export default Vacancies;
