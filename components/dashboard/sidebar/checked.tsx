import React from "react";
import { CheckboxFilterGroup } from "./checkbox-filter-group";

interface Props {
  selectedFilters: { checked: string[] };
  updateSelectedFilters: (selectedValues: string[]) => void;
}

const Checked: React.FC<Props> = ({
  selectedFilters: { checked },
  updateSelectedFilters,
}) => {
  return (
    <div>
      <CheckboxFilterGroup
        title="Označení kandidáti"
        items={[
          { value: "selected", text: "označené " },
          { value: "unselected", text: "neoznačené" },
        ]}
        defaultValues={checked}
        loading={false}
        onChange={updateSelectedFilters}
      />
    </div>
  );
};

export default Checked;
