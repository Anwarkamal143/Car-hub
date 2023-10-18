import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const model = searchParams.get("model");
  const limit = searchParams.get("limit");
  const params: Record<string, any> = {};
  if (model) {
    params["model"] = model;
  }
  if (limit) {
    params["limit"] = limit;
  }
  try {
    const data = await axios.get(
      (process.env.NEXT_RAPIDAPI_URL as string) + "/cars",
      {
        params,
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_RAPIDAPI_Host as string,
        },
      }
    );
    console.log({ data: params, dataa: data });
    return NextResponse.json({
      data: data.data || [],
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      data: [],
    });
  }
}
