import React from "react";
import { CheckboxFilterGroup } from "./checkbox-filter-group";

interface Props {
  selectedFilters: { gender: string[] };
  updateSelectedFilters: (selectedValues: string[]) => void;
}

const Gender: React.FC<Props> = ({
  selectedFilters: { gender },
  updateSelectedFilters,
}) => {
  return (
    <div>
      <CheckboxFilterGroup
        title="Pohlaví"
        items={[
          { value: "male", text: "Muž " },
          { value: "female", text: "Žena" },
        ]}
        defaultValues={gender}
        loading={false}
        onChange={updateSelectedFilters}
      />
    </div>
  );
};

export default Gender;
