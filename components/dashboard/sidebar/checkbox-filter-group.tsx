"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FilterCheckbox, FilterCheckBoxProps } from "./filter-checkbox";
import { Title } from "@/components/shared/title";
import { Input } from "@/components/ui/input";

type Item = FilterCheckBoxProps;

interface Props {
  title: string;
  items: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (selectedValues: string[]) => void;
  defaultValues?: string[];
  loading: boolean;
  className?: string;
  hasInput?: boolean;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  onChange,
  defaultValues,
  className,
  hasInput,
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedValues, setCheckedValues] = React.useState<string[]>(
    defaultValues || []
  );

  const toggleCheckbox = (value: string) => {
    const newCheckedValues = checkedValues.includes(value)
      ? checkedValues.filter((v) => v !== value)
      : [...checkedValues, value];

    setCheckedValues(newCheckedValues);
    onChange?.(newCheckedValues);
  };

  const list = items.filter((item) =>
    item.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 xl:gap-2">
      <Title text={title} size="sm" className="font-semibold" />

      {hasInput && items.length > limit && (
        <div className="mb-1 xl:mb-2">
          <Input
            placeholder="Zadejte název kraje"
            onChange={onChangeSearchValue}
            className="bg-gray-50 text-background border-none"
          />
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-2 xl:max-h-32 pr-2 overflow-auto scrollbar",
          className
        )}
      >
        {list.map((item, i) => (
          <FilterCheckbox
            key={i}
            text={item.text}
            value={item.value}
            checked={checkedValues.includes(item.value)}
            onCheckedChange={() => toggleCheckbox(item.value)}
          />
        ))}
      </div>
    </div>
  );
};
