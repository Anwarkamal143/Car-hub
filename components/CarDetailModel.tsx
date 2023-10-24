import { getCarsImagesURL } from "@/utils";
import Image from "next/image";

type Props = {
  car: ICar;
};

const CarDetailModel = (props: Props) => {
  const { car } = props;
  const keys = Object.keys(car || {});
  return (
    <div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
          <Image
            src={getCarsImagesURL(props.car) || "/hero.png"}
            alt="car model"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative w-full h-24 rounded-lg bg-primary-blue-100">
            <Image
              src={getCarsImagesURL(props.car, 29) || "/hero.png"}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex-1 relative w-full h-24 rounded-lg bg-primary-blue-100">
            <Image
              src={getCarsImagesURL(props.car, 33) || "/hero.png"}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex-1 relative w-full h-24 rounded-lg bg-primary-blue-100">
            <Image
              src={getCarsImagesURL(props.car, 13) || "/hero.png"}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="font-semibold text-xl capitalize">
          {car.make} {car.model}
        </h2>
        <div className="mt-3 flex flex-wrap gap-4">
          {keys.map((key) => {
            const element = car[key as keyof ICar];
            return (
              <div
                key={key}
                className="flex justify-between gap-5 w-full text-right"
              >
                <h4 className="text-grey capitalize">
                  {key.split("_")?.join(" ")}
                </h4>
                <p className="text-black-100 font-semibold">{element}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarDetailModel;
