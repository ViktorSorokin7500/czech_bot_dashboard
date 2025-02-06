import { Title } from "@/components/shared/title";
import React from "react";
import { RangeSlider } from "./range-slider";
import { AgeFilter } from "@/hooks/use-filter";

interface Props {
  ages: AgeFilter;
  updateAge: (name: keyof AgeFilter, value: number) => void;
}

const Age: React.FC<Props> = ({ ages: { ageFrom, ageTo }, updateAge }) => {
  return (
    <div className="flex flex-col gap-1 xl:gap-2">
      <Title text="Věk" size="sm" className="font-semibold " />
      <div className="pr-2">
        <RangeSlider
          min={18}
          max={70}
          step={1}
          value={[ageFrom || 18, ageTo || 70]}
          onValueChange={([ageFrom, ageTo]) => {
            updateAge("ageFrom", ageFrom);
            updateAge("ageTo", ageTo);
          }}
        />
      </div>
    </div>
  );
};

export default Age;
