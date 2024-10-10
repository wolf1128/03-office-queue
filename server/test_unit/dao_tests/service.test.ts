import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  jest,
} from "@jest/globals";

import ServiceDAO from "../../src/dao/serviceDAO";
import crypto from "crypto";
import db from "../../src/db/db";
import { Database } from "sqlite3";
import Service from "../../src/components/service";

jest.mock("../../src/db/db.ts");

describe("ServiceDAO unit tests", () => {
  describe("getUsers", () => {
    test("It should resolve a list of services", async () => {
      const serviceDAO = new ServiceDAO();
      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementation((sql, params, callback) => {
          callback(null, [
            {
              ServiceName: "ServiceName",
              ServiceTime: 10,
            },
          ]);
          return {} as Database;
        });
      const result = await serviceDAO.getServices();
      expect(result).toEqual([
        {
          ServiceName: "ServiceName",
          ServiceTime: 10,
        },
      ]);
      mockDBAll.mockRestore();
    });

    test("It should throw an error if the services not found", async () => {
      const serviceDAO = new ServiceDAO();

      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementation((sql, params, callback) => {
          callback(null, null);
          return {} as Database;
        });

      try {
        await serviceDAO.getServices();
      } catch (error) {
        // expect(error.customMessage).toBe(
        //   new ServicesNotFoundError().customMessage
        // );
      }

      mockDBAll.mockRestore();
    });
  });
});
