import { Title } from "@/components/shared/title";
import React from "react";
import { RangeSlider } from "./range-slider";
import { SalaryFilter } from "@/hooks/use-filter";

interface Props {
  salaries: SalaryFilter;
  updateSalary: (name: keyof SalaryFilter, value: number) => void;
}

const Salary: React.FC<Props> = ({
  salaries: { salaryFrom, salaryTo },
  updateSalary,
}) => {
  return (
    <div className="flex flex-col gap-1 xl:gap-2">
      <Title text="Plat" size="sm" className="font-semibold " />
      <div className="pr-2">
        <RangeSlider
          min={1000}
          max={10000}
          step={200}
          value={[salaryFrom || 1000, salaryTo || 10000]}
          onValueChange={([salaryFrom, salaryTo]) => {
            updateSalary("salaryFrom", salaryFrom);
            updateSalary("salaryTo", salaryTo);
          }}
        />
      </div>
    </div>
  );
};

export default Salary;
