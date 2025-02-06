"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Title } from "../shared/title";
import { WhiteBlock } from "../shared/white-block";
import { useRouter } from "next/navigation";
import { deleteJob } from "@/lib/data";

interface Props {
  id: string;
  name: string;
  description: string;
  salary: string;
  city: string;
  voivodeship: string;
  responsibilities: string[];
  bonuses: string[];
  className?: string;
}

const JobCard: React.FC<Props> = ({
  className,
  id,
  name,
  description,
  salary,
  city,
  voivodeship,
  responsibilities,
  bonuses,
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteJob(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };
  return (
    <WhiteBlock
      className={cn(className, "shadow-lg rounded-lg overflow-hidden")}
    >
      <div className="p-4 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <Title text={name} size="md" className="font-bold text-blue-800" />

          <div className="space-x-2">
            <Button
              onClick={() => router.push(`/edit-vacancies/${id}`)}
              className={cn(
                "px-3 py-2 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded"
              )}
            >
              Změnit
            </Button>
            <Button
              onClick={handleDelete}
              className={cn(
                "px-3 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded"
              )}
            >
              Odstranit nabídku
            </Button>
          </div>
        </div>

        <div className="text-gray-700 mt-2">
          <p>
            <b className="text-blue-700">Popis:</b>{" "}
            <span className="text-gray-700">{description}</span>
          </p>
          <div className="flex flex-wrap flex-row gap-4">
            <p>
              <b className="text-blue-700">Plat:</b>{" "}
              <span className="text-gray-700">{salary} kč</span>
            </p>
            <p>
              <b className="text-blue-700">Město:</b>{" "}
              <span className="text-gray-700">{city}</span>
            </p>
            <p>
              <b className="text-blue-700">Kraj:</b>{" "}
              <span className="text-gray-700">{voivodeship}</span>
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-700 mt-1">
          <p>
            <b className="text-blue-800">Odpovědnost:</b>{" "}
            <span className="text-gray-700">{responsibilities.join(", ")}</span>
          </p>
        </div>

        <div className="text-xs text-gray-700">
          <p>
            <b className="text-blue-800">Benefity:</b>{" "}
            <span className="text-gray-700">{bonuses.join(", ")}</span>
          </p>
        </div>
      </div>
    </WhiteBlock>
  );
};

export default JobCard;
