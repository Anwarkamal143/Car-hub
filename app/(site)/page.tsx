import Cars from "@/components/Car/Cars";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CustomFilters from "@/components/SearchBar/CustomFilters";

type Props = {
  searchParams: Partial<ISearchParams>;
};
export default async function Home(props: Props) {
  const { searchParams = {} } = props;
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
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilters />
          </div>
        </div>
        <Cars
          searchParams={{
            year: 2002,
            make: "audi",
            model: "",
            limit: 10,
            ...searchParams,
          }}
        />
      </div>
    </main>
  );
}
