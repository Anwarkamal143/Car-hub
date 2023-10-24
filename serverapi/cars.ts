import ServerRequest from "@/utils/serverRequest";

export const getServerCars = async (searchParams?: ISearchParams) => {
  return await ServerRequest(
    (process.env.NEXT_RAPIDAPI_URL as string) + "/cars",
    {
      params: searchParams,
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_RAPIDAPI_Host as string,
      },
    }
  );
};
export const getCarsImages = async (carparams: Record<string, any>) => {
  const params: any = { zoomType: "fullscreen" };
  const { make, model, year, angle, modelFamily } = carparams;
  if (make) {
    params["make"] = make;
  }
  if (model) {
    params["model"] = model;
  }
  if (year) {
    params["modelYear"] = year;
  }
  if (angle != null) {
    params["angle"] = angle;
  }
  if (modelFamily) {
    params["modelFamily"] = modelFamily;
  }

  return await ServerRequest(
    (process.env.NEXT_CARS_IMAGES as string) +
      "/getimage" +
      `?customer=hrjavascript-mastery`,
    {
      baseURL: "",
      params,
    }
  ).then((d) => d);
};
