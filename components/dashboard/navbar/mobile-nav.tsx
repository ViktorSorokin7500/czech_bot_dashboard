"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useFilter } from "@/hooks/use-filter";
import Sort from "../sidebar/sort";
import Checked from "../sidebar/checked";
import useOrientationListener from "@/hooks/use-orientation";
import Region from "../sidebar/region";

const MobileNav: React.FC<PropsWithChildren> = ({ children }) => {
  const isPortrait = useOrientationListener();

  const router = useRouter();
  const handleLogout = () => {
    document.cookie =
      "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    router.push("/login");
  };
  const { sortBy, setSortBy, selectedFilters, updateSelectedFilters } =
    useFilter();
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        side={`${isPortrait ? "left" : "top"}`}
        className="bg-backgroundSoft"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>

          <div className="h-screen flex flex-col gap-2 justify-between py-12 px-2">
            <div
              className={`flex ${
                isPortrait ? "flex-col" : "flex-row"
              } gap-6 justify-between`}
            >
              <Sort sortBy={sortBy} setSortBy={setSortBy} />
              <Region
                selectedFilters={selectedFilters}
                updateSelectedFilters={(selectedValues) =>
                  updateSelectedFilters("region", selectedValues)
                }
                hasInput={false}
              />
              <Checked
                selectedFilters={selectedFilters}
                updateSelectedFilters={(selectedValues) =>
                  updateSelectedFilters("checked", selectedValues)
                }
              />
            </div>
            <button
              onClick={handleLogout}
              className="w-full p-1 flex text-white items-center gap-4 justify-center border-2 rounded-lg bg-backgroundSoft hover:bg-background transition-all duration-300"
            >
              <LogOut />
              <SheetDescription className="text-2xl">
                Odhlásit se
              </SheetDescription>
            </button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
