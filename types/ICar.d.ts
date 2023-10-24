type ICar = {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
};
type ICarMedia = any;
type ISearchParams = {
  year: number;
  fuel_type: string;
  limit: number;
  model: string;
  make: string;
  pageNumber?: number;
};
