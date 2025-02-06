"use client";
import React from "react";
import { SortPopup } from "./sort-popup";

interface Props {
  sortBy: string | undefined;
  setSortBy: (value: string) => void;
}

const Sort: React.FC<Props> = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col gap-1 xl:gap-2">
      <SortPopup sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
};

export default Sort;
