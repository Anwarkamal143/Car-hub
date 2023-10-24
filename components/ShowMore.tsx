"use client";

import { updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

type Props = {
  pageNumber?: number;
  isNext?: boolean;
};

const ShowMore = (props: Props) => {
  const { isNext, pageNumber = 1 } = props;
  const router = useRouter();
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    console.log({ pageNumber });
    const newPathName = updateSearchParams("limit", `${newLimit}`);
    router.push(newPathName, {
      scroll: false,
    });
  };
  return !isNext ? (
    <div className="w-full gap-5 flex justify-center mt-10">
      <Button onClick={handleNavigation}>Show More</Button>
    </div>
  ) : null;
};

export default ShowMore;
