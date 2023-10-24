import { getServerCars } from "@/serverapi/cars";
import { Suspense } from "react";
import CarCard from "../CarCard";
import ShowMore from "../ShowMore";

type Props = {
  searchParams: Partial<ISearchParams>;
};

async function Cars(props: Props) {
  const { searchParams } = props;
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
      <Suspense fallback={<p>Loading show More button...</p>}>
        <ShowMore
          searchparams={searchParams}
          pageNumber={parseInt(`${searchParams.limit || 10}`) / 10}
          isNext={(searchParams.limit || 10) > data?.length}
        />
      </Suspense>
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
