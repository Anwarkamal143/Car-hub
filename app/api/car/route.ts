import { getCarsImages } from "@/serverapi/cars";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const model = searchParams.get("model");
    const make = searchParams.get("make");
    const year = searchParams.get("year");
    const angle = searchParams.get("angle");
    const modelFamily = searchParams.get("modelFamily");
    const params: Record<string, any> = {
      model,
      make,
      year,
      angle,
      modelFamily,
    };

    const data = await getCarsImages(params);
    console.log({ dataa: data });
    return NextResponse.json({
      data: data[0] || [],
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      data: [],
    });
  }
}
