export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};
export const getCarsImagesURL = (params: ICar, angle?: number) => {
  const { make, model, year } = params;
  const url = new URL(
    (process.env.NEXT_PUBLIC_CARS_IMAGES as string) + "/getimage"
  );
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("customer", "copyright-imaginstudio");
  if (make) {
    url.searchParams.append("make", make);
  }

  if (year) {
    url.searchParams.append("modelYear", `${year}`);
  }
  if (angle != null) {
    url.searchParams.append("angle", `${angle}`);
  }
  if (model) {
    url.searchParams.append("modelFamily", model.split(" ")[0]);
  }
  return `${url}`;
};

export const Capitalize = (text: string) => {
  if (!text) {
    return null;
  }
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
};
export const updateSearchParams = (key: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (key) {
    searchParams.set(key, value);
  } else {
    searchParams.delete(key);
  }
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
