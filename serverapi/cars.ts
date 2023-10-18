import ServerRequest from "@/utils/serverRequest";

export const getServerCars = async (model: string) => {
  const params: any = {};
  if (model) {
    params["model"] = model;
  }

  return await ServerRequest(
    (process.env.NEXT_RAPIDAPI_URL as string) + "/cars",
    {
      params,
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_RAPIDAPI_Host as string,
      },
    }
  );
};
