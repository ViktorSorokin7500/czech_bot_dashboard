import React from "react";
import { CheckboxFilterGroup } from "./checkbox-filter-group";

interface Props {
  selectedFilters: { region: string[] };
  updateSelectedFilters: (selectedValues: string[]) => void;
  hasInput?: boolean;
}

const Region: React.FC<Props> = ({
  selectedFilters: { region },
  updateSelectedFilters,
  hasInput = true,
}) => {
  return (
    <div>
      <CheckboxFilterGroup
        title="Kraj"
        items={[
          { text: "Praha", value: "Praha" },
          { text: "Středočeský", value: "Středočeský" },
          { text: "Jihočeský", value: "Jihočeský" },
          { text: "Plzeňský", value: "Plzeňský" },
          { text: "Karlovarský", value: "Karlovarský" },
          { text: "Ústecký", value: "Ústecký" },
          { text: "Liberecký", value: "Liberecký" },
          { text: "Královéhradecký", value: "Královéhradecký" },
          { text: "Pardubický", value: "Pardubický" },
          { text: "Vysočina", value: "Vysočina" },
          { text: "Jihomoravský", value: "Jihomoravský" },
          { text: "Olomoucký", value: "Olomoucký" },
          { text: "Zlínský", value: "Zlínský" },
          { text: "Moravskoslezský", value: "Moravskoslezský" },
        ]}
        defaultValues={region}
        loading={false}
        onChange={updateSelectedFilters}
        className="h-32 xl:h-40"
        hasInput={hasInput}
      />
    </div>
  );
};

export default Region;
