import Filters from "@/components/Filters";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CarCard from "@/components/UI/CarCard";
import { getServerCars } from "@/serverapi/cars";

export default async function Home() {
  // query: {
  //   model: "corolla",
  // },
  const [data = [], error] = await getServerCars("corolla");

  const Component = !!data.length ? (
    <section>
      We have cars!
      <div className="home__cars-wrapper">
        {data.map((car: ICar, i: number) => (
          <CarCard key={i} car={car} />
        ))}
      </div>
    </section>
  ) : (
    <div className="home__error-container">
      <h2 className="text-black text-xl font-bold">OOps, no results!</h2>
      <p>{error?.message}</p>
    </div>
  );
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold"> Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <Filters title="fuel" />
            <Filters title="year" />
          </div>
        </div>
        {Component}
      </div>
    </main>
  );
}
