import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  jest,
} from "@jest/globals";
import request from "supertest";
import { app } from "../../index";

import ServiceController from "../../src/controllers/serviceController";
import Service from "../../src/components/service";
const baseURL = "/api";

//For unit tests, we need to validate the internal logic of a single component, without the need to test the interaction with other components
//For this purpose, we mock (simulate) the dependencies of the component we are testing
jest.mock("../../src/controllers/serviceController");

let testService = new Service(1, "Shipping", 10);

describe("ServiceRoute unit tests", () => {
  describe("GET /api/services", () => {
    test("It returns an array of users", async () => {
      jest
        .spyOn(ServiceController.prototype, "getServices")
        .mockResolvedValueOnce([testService]);

      const response = await request(app).get(baseURL + "/services");
      expect(response.status).toBe(200);
      expect(ServiceController.prototype.getServices).toHaveBeenCalled();
      expect(response.body).toEqual([testService]);
    });
  });
});
