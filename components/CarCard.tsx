"use client";

import { calculateCarRent, getCarsImagesURL } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./Button";
import CarDetailModel from "./CarDetailModel";
import DialogModel from "./Modals";

type Props = {
  car: ICar;
};

const CarCard = (props: Props) => {
  const { year, city_mpg, make, model, transmission, drive } = props?.car || {};
  const carRent = calculateCarRent(city_mpg, year);
  const [open, setIsOpen] = useState(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="w-full relative h-40 my-3 object-contain">
        <Image
          src={getCarsImagesURL(props.car) || "/hero.png"}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={"/steering-wheel.svg"}
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src={"/tire.svg"} width={20} height={20} alt="tire" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src={"/gas.svg"} width={20} height={20} alt="Gas" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <Button
            rightIcon={{
              Icon: "/right-arrow.svg",
            }}
            className="w-full py-[16px] rounded-full bg-primary-blue"
            onClick={() => setIsOpen(true)}
          >
            View More
          </Button>
        </div>
      </div>
      <DialogModel
        allowFotter={false}
        contentClassNames="sm:max-w-lg"
        isOpen={open}
        closeIconClassNames="bg-white rounded-full"
        content={<CarDetailModel car={props.car} />}
        toggleOpen={setIsOpen as any}
        // title="Car Details"
      />
    </div>
  );
};

export default CarCard;
