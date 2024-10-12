import { describe, test, expect, jest } from "@jest/globals";
import TicketDAO from "../../src/dao/ticketDAO";
import db from "../../src/db/db";
import { Database } from "sqlite3";
import Service from "../../src/components/service";
import Ticket from "../../src/components/ticket";

jest.mock("../../src/db/db.ts");

const date = new Date();
const formattedDate = `${date.getFullYear()}-${String(
  date.getMonth() + 1
).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
let testNewTicket = new Ticket(1, 1, formattedDate, 0, "in queue");
let testService = new Service(1, "Shipping", 10);

describe("TicketDAO unit tests", () => {
  describe("getTicket", () => {
    test("It should resolve the issued ticket", async () => {
      const ticketDAO = new TicketDAO();

      const mockDBGet = jest
        .spyOn(db, "get")
        .mockImplementation((sql, callback) => {
          const mockRow: any = { pastTicket: null };
          callback(null, mockRow);
          return {} as Database;
        });

      const mockDBRun = jest
        .spyOn(db, "run")
        .mockImplementation((sql, [], callback) => {
          callback(null);
          return {} as Database;
        });

      const result = await ticketDAO.getTicket(testService.serviceID);

      expect(result).toEqual(testNewTicket);
      mockDBRun.mockRestore();
      mockDBGet.mockRestore();
    });
  });
});