"use client";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "../Button";

type Props = {};

const Hero = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleScroll = () => {
    console.log("clicked");
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, book, or rent a car — quickly and easily!
        </h1>
        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking
          process
        </p>
        <Button
          onClick={handleScroll}
          type="button"
          size={"small"}
          variant={"primary"}
          className="mt-10"
        >
          Explore Cars
        </Button>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay" />
      </div>
      {/* <Image /> */}
    </div>
  );
};

export default Hero;
