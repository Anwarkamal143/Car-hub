"use client";
import { fuels, yearsOfProduction } from "@/constants";
import { updateSearchParams } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Filters from "../Filters";

type Props = {};

const CustomFilters = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const updateParams = (key: string, value: string) => {
    const newPathname = updateSearchParams(key, value);
    router.push(newPathname, {
      scroll: false,
    });
  };
  const fuel = searchParams.get("fuel_type")?.toLowerCase() || fuels[0];
  const year = searchParams.get("year") || "";
  return (
    <>
      <Filters
        title="Fuel"
        value={fuel}
        options={fuels}
        onChange={(e) => {
          updateParams("fuel_type", e.value?.toLowerCase());
        }}
      />
      <Filters
        title="Year"
        value={year}
        options={yearsOfProduction}
        onChange={(e) => {
          updateParams("year", e.value);
        }}
      />
    </>
  );
};

export default CustomFilters;
