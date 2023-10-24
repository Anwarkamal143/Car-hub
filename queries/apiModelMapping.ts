import CarImagesModel from "@/models/CarImagesModel";
import CarModel from "@/models/CarModel";

export const ApiModels = {
  Cars: "cars",
  Car: "car-images",
} as const;
export const ThreePAppSubModels = {
  ThreePAppConnection: "3p-app-connections",
} as const;
export const ApiModelMapping = {
  [ApiModels.Cars]: {
    model: CarModel,
  },
  [ApiModels.Car]: {
    model: CarImagesModel,
  },
} as const;
export const ThreePAppSubModelMapping = {
  // [ThreePAppSubModels.ThreePAppConnection]: {
  //   model: ThreePAppConnectionModel,
  // },
};
export type ApiModelDataTypes = {
  [ApiModels.Cars]: ICar;
  [ApiModels.Car]: ICarMedia;
};
export type RequestOptions = {
  query?: Record<string, any>;
  path?: string | undefined;
};
