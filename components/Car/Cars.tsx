import { getServerCars } from "@/serverapi/cars";
import CarCard from "../CarCard";
import ShowMore from "../ShowMore";

type Props = {
  searchParams: Partial<ISearchParams>;
};

async function Cars(props: Props) {
  const {
    searchParams = {
      year: 2022,
      limit: 10,
      fuel_type: "",
      model: "",
      make: "bmw",
    },
  } = props;
  const [data = [], error] = await getServerCars({
    ...searchParams,
  } as any);

  const Component = !!data.length ? (
    <section>
      <div className="home__cars-wrapper">
        {data.map((car: ICar, i: number) => (
          <CarCard key={i} car={car} />
        ))}
      </div>
      <ShowMore
        pageNumber={(parseInt(`${searchParams.limit || 0}`) || 10) / 10}
        isNext={(searchParams.limit || 10) > data?.length}
      />
    </section>
  ) : (
    <div className="home__error-container">
      <h2 className="text-black text-xl font-bold">OOps, no results!</h2>
      <p>{error?.message}</p>
    </div>
  );
  return Component;
}

export default Cars;
