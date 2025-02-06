"use client";
import React from "react";
import Sort from "./sort";
import Gender from "./gender";
import Age from "./age";
import Salary from "./salary";
import Checked from "./checked";
import Region from "./region";
import { useFilter } from "@/hooks/use-filter";

const Filter = () => {
  const {
    sortBy,
    setSortBy,
    selectedFilters,
    updateSelectedFilters,
    ages,
    updateAge,
    salaries,
    updateSalary,
  } = useFilter();
  return (
    <div className="flex flex-col gap-3">
      <Sort sortBy={sortBy} setSortBy={setSortBy} />
      <Region
        selectedFilters={selectedFilters}
        updateSelectedFilters={(selectedValues) =>
          updateSelectedFilters("region", selectedValues)
        }
      />
      <Gender
        selectedFilters={selectedFilters}
        updateSelectedFilters={(selectedValues) =>
          updateSelectedFilters("gender", selectedValues)
        }
      />
      <Age ages={ages} updateAge={updateAge} />
      <Salary salaries={salaries} updateSalary={updateSalary} />
      <Checked
        selectedFilters={selectedFilters}
        updateSelectedFilters={(selectedValues) =>
          updateSelectedFilters("checked", selectedValues)
        }
      />
    </div>
  );
};

export default Filter;
