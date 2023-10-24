import Cars from "@/components/Car/Cars";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CustomFilters from "@/components/SearchBar/CustomFilters";
import { Suspense } from "react";

type Props = {
  searchParams: Partial<ISearchParams>;
};
export default async function Page(props: Props) {
  const { searchParams } = props;
  console.log({ searchParams });
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold" id="car_cataglog_section">
            {" "}
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <Suspense fallback={<p>Loading filters...</p>}>
            <SearchBar />
          </Suspense>
          <div className="home__filter-container">
            <Suspense fallback={<p>Loading custom filters...</p>}>
              <CustomFilters />
            </Suspense>
          </div>
        </div>
        <Cars
          searchParams={{
            year: 2002,
            make: "audi",
            model: "",
            ...searchParams,
          }}
        />
      </div>
    </main>
  );
}
