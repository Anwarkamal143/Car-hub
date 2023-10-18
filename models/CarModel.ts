import request from "@/utils/request";
import Model from ".";

class CarModel extends Model<ICar> {
  constructor() {
    super("/cars", "public-1");
  }
  async requestCredit() {
    const res = await request("/add-beta-credits", {
      method: "POST",
      data: {},
    });

    return res;
  }
}

export default new CarModel();
