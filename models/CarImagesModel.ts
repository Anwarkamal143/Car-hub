import request from "@/utils/request";
import Model from ".";

class CarImagesModel extends Model<ICarMedia> {
  constructor() {
    super("/car", "public-1");
  }
  async requestCredit() {
    const res = await request("/add-beta-credits", {
      method: "POST",
      data: {},
    });

    return res;
  }
}

export default new CarImagesModel();
