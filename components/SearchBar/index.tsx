"use client";
import { manufacturersArrayObjectd } from "@/constants";
import z from "zod";
import AutoComplete from "../AutoComplete";
type Props = {};
const schema = z.object({});
const SearchBar = (props: Props) => {
  const handleSubmit = (values: any) => {
    console.log({ values });
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
    <div className="searchbar__items">
      <AutoComplete
        // onChangeItem={}
        options={manufacturersArrayObjectd}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
