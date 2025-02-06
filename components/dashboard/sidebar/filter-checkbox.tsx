import React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui";

export interface FilterCheckBoxProps {
  text: string;
  value: string;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckBoxProps> = ({
  className,
  text,
  value,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className={cn(className, "flex items-center space-x-2")}>
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        id={`checked-${String(name)}-${String(value)}`}
        className="rounded-[8px] size-6"
      />
      <label
        htmlFor={`checked-${String(name)}-${String(value)}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
    </div>
  );
};
