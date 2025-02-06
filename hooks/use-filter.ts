import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export interface SalaryFilter {
  salaryFrom?: number;
  salaryTo?: number;
}

export interface AgeFilter {
  ageFrom?: number;
  ageTo?: number;
}

export interface QueryFilter extends SalaryFilter, AgeFilter {
  sortBy?: string;
  gender?: string[];
  region?: string[];
  checked?: string[];
  page?: string;
}

export const useFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "", 10) || undefined;

  const [sortBy, setSortBy] = React.useState<string | undefined>(
    searchParams.get("sortBy") || undefined
  );

  const [selectedFilters, setSelectedFilters] = React.useState({
    gender: searchParams.get("gender")?.split(",") || ([] as string[]),
    checked: searchParams.get("checked")?.split(",") || ([] as string[]),
    region: searchParams.get("region")?.split(",") || ([] as string[]),
  });

  const [ages, setAges] = React.useState<AgeFilter>({
    ageFrom: Number(searchParams.get("ageFrom")) || undefined,
    ageTo: Number(searchParams.get("ageTo")) || undefined,
  });

  const [salaries, setSalaries] = React.useState<SalaryFilter>({
    salaryFrom: Number(searchParams.get("salaryFrom")) || undefined,
    salaryTo: Number(searchParams.get("salaryTo")) || undefined,
  });

  React.useEffect(() => {
    const filters = {
      ...ages,
      ...salaries,
      sortBy,
      page,
      gender:
        selectedFilters.gender.length > 0 ? selectedFilters.gender : undefined,
      region:
        selectedFilters.region.length > 0 ? selectedFilters.region : undefined,
      checked:
        selectedFilters.checked.length > 0
          ? selectedFilters.checked
          : undefined,
    };

    const query = qs.stringify(filters, {
      arrayFormat: "comma",
      skipNulls: true,
    });

    if (window.location.search !== `?${query}`) {
      router.push(`?${query}`, { scroll: false });
    }
  }, [sortBy, selectedFilters, ages, salaries, page, router]);

  const updateSelectedFilters = (
    filterName: keyof typeof selectedFilters,
    selectedValues: string[]
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: selectedValues,
    }));
  };

  const updateAge = (name: keyof AgeFilter, value: number) => {
    setAges((prev) => ({ ...prev, [name]: value }));
  };

  const updateSalary = (name: keyof SalaryFilter, value: number) => {
    setSalaries((prev) => ({ ...prev, [name]: value }));
  };

  return {
    sortBy,
    setSortBy,
    selectedFilters,
    updateSelectedFilters,
    ages,
    updateAge,
    salaries,
    updateSalary,
  };
};
