import CreateVacancies from "@/components/dashboard/createVacancies";
import Navbar from "@/components/dashboard/navbar/navbar";
import { Metadata } from "next";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vytvořte pracovní nabídku",
  description: "Dashboard vytvořte pracovní nabídku",
};

export default function Page() {
  return (
    <Suspense fallback={<div>Načítání...</div>}>
      <div className="p-5 max-w-screen-xl mx-auto">
        <Navbar />
      </div>
      <CreateVacancies />
    </Suspense>
  );
}
