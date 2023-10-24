"use client";
import { manufacturersArrayObjectd } from "@/constants";
import { updateSearchParams } from "@/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AutoComplete from "../AutoComplete";
import { Button } from "../Button";
import TwInput from "../Input/TwInput";

const SearchBar = () => {
  const searchParams = useSearchParams();

  const [model, setModel] = useState(searchParams.get("model") || "");
  const [manufacturer, setManufacturer] = useState<any>(
    searchParams.get("make") || "audi"
  );
  const router = useRouter();

  const handleSubmit = (value: any) => {
    if (!model || !manufacturer?.value) {
      alert("please provide model and manufacturer");
      return;
    }
    updateParams(model.toLowerCase(), manufacturer?.value);
  };
  const updateParams = (model: string, manufacturer: string) => {
    updateSearchParams("model", model);
    const pathname = updateSearchParams("make", manufacturer);
    router.push(pathname, {
      scroll: false,
    });
  };
  const hanldeSelectedItem = (item: any) => {
    updateParams(model, item.value);
  };
  const onSearchChange = async (query: string) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (!query) {
          res(manufacturersArrayObjectd);
          return;
        }
        const newarr = manufacturersArrayObjectd.filter((a) => {
          const item = a.label.toLowerCase().replace(/\s+/g, "");
          const querytext = query.toLowerCase().replace(/\s+/g, "");
          return item.includes(querytext);
        });
        res(newarr);
      }, 1000);
    });
  };
  return (
    <form
      className="searchbar"
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div className="searchbar__item">
        <AutoComplete
          value={manufacturer || ""}
          defaultValue={manufacturer || ""}
          name="make"
          onChangeItem={(item: any) => {
            setManufacturer(item);
            hanldeSelectedItem(item);
          }}
          options={manufacturersArrayObjectd}
          onChange={onSearchChange}
        />
        <Button
          type="submit"
          className="-ml-3 z-10 !p-0 sm:hidden  shadow-none border-none"
        >
          <Image
            src={"/magnifying-glass.svg"}
            alt="search icon"
            width={40}
            height={40}
            className="object-contain"
          />
        </Button>
      </div>
      <div className="searchbar__item">
        <Image
          src={"/model-icon.png"}
          width={25}
          height={25}
          alt="car model"
          className="absolute w-[20px] ml-4 h-[20ox]"
        />
        <TwInput
          type="text"
          name="model"
          placeholder="Tiguan"
          value={model}
          className="searchbar__input "
          defaultValue={model || ""}
          inputClassNames="border-none bg-transparent focus:!bg-transparent"
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
        <Button
          type="submit"
          className="-ml-3 z-10 !p-0 sm:hidden  shadow-none border-none"
        >
          <Image
            src={"/magnifying-glass.svg"}
            alt="search icon"
            width={40}
            height={40}
            className="object-contain"
          />
        </Button>
        <Button
          type="submit"
          variant={"secondary"}
          className="-ml-3 z-10 !p-0 max-sm:hidden  shadow-none border-none"
        >
          <Image
            src={"/magnifying-glass.svg"}
            alt="search icon"
            width={40}
            height={40}
            className="object-contain"
          />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
