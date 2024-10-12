import { test, expect, jest, describe } from "@jest/globals";
import ServiceController from "../../src/controllers/serviceController";
import ServiceDAO from "../../src/dao/serviceDAO";

jest.mock("../../src/db/db.ts");
jest.mock("../../src/dao/serviceDAO.ts");

describe("Service Controller Unit Tests", () => {
  describe("getServicess", () => {
    test("It should return an array of all services", async () => {
      const expectedServices = [
        {
          ServiceName: "ServiceName",
          ServiceTime: 10,
        },
      ];
      jest
        .spyOn(ServiceDAO.prototype, "getServices")
        .mockResolvedValueOnce(expectedServices);
      const controller = new ServiceController();
      const response = await controller.getServices();

      expect(ServiceDAO.prototype.getServices).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedServices);
    });
  });
});
