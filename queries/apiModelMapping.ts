import CarModel from "@/models/CarModel";

export const ApiModels = {
  Cars: "cars",
} as const;
export const ThreePAppSubModels = {
  ThreePAppConnection: "3p-app-connections",
} as const;
export const ApiModelMapping = {
  [ApiModels.Cars]: {
    model: CarModel,
  },
} as const;
export const ThreePAppSubModelMapping = {
  // [ThreePAppSubModels.ThreePAppConnection]: {
  //   model: ThreePAppConnectionModel,
  // },
};
export type ApiModelDataTypes = {
  [ApiModels.Cars]: ICar;
};
export type RequestOptions = {
  query?: Record<string, any>;
  path?: string | undefined;
};
