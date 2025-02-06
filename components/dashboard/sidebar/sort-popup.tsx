import React from "react";
import { cn } from "@/lib/utils";
import { Popover } from "@/components/ui";

interface SortOption {
  label: string;
  value: string;
}

const sortOptions: SortOption[] = [
  { label: "Jméno ⬆", value: "name_asc" },
  {
    label: "Jméno ⬇",
    value: "name_desc",
  },
  { label: "Datum ⬆", value: "date_asc" },
  { label: "Datum ⬇", value: "date_desc" },
];

interface Props {
  className?: string;
  sortBy: string | undefined;
  setSortBy: (value: string) => void;
}

export const SortPopup: React.FC<Props> = ({
  className,
  sortBy,
  setSortBy,
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={cn(
          className,
          "flex items-center gap-1 border px-5 w-full h-[52px] rounded-2xl cursor-pointer"
        )}
      >
        <b>Třídit:</b>
        <b className="text-primary">
          {sortOptions.find((option) => option.value === sortBy)?.label ||
            "Wybierz"}
        </b>
      </Popover.Trigger>
      <Popover.Content className="z-50 rounded-md border bg-white p-2 shadow-md">
        <div className="flex flex-col">
          {sortOptions.map((option) => (
            <Popover.Close key={option.value} asChild>
              <button
                className={cn(
                  "text-left text-backgroundSoft p-1 rounded hover:bg-blue-50 hover:text-background",
                  sortBy === option.value && "bg-blue-200"
                )}
                onClick={() => setSortBy(option.value)}
              >
                {option.label}
              </button>
            </Popover.Close>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
