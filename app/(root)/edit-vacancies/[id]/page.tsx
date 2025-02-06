import { Suspense } from "react";
import Navbar from "@/components/dashboard/navbar/navbar";
import EditVacancies from "@/components/dashboard/editVacancies";
import { fetchJobById } from "@/lib/data";
import { Title } from "@/components/shared/title";
import Image from "next/image";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Upravit pracovní nabídku",
  description: "Dashboard upravit pracovní nabídku",
};

export default async function EditVacanciesPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await fetchJobById(params.id);

  if (!job) {
    return (
      <div className="h-full overflow-hidden p-5">
        <Navbar />
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
    <Suspense fallback={<div>Načítání...</div>}>
      <div className="p-5 max-w-screen-xl mx-auto">
        <Navbar />
      </div>
      <EditVacancies job={job} />
    </Suspense>
  );
}
