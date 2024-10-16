import { describe, test, expect, jest } from "@jest/globals";
import TicketDAO from "../../src/dao/ticketDAO";
import db from "../../src/db/db";
import { Database } from "sqlite3";
import Service from "../../src/components/service";
import Ticket from "../../src/components/ticket";

jest.mock("../../src/db/db.ts");

const date = new Date();
const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
  2,
  "0"
)}-${String(date.getDate()).padStart(2, "0")}`;
let testNewTicket = new Ticket(1, 1, formattedDate, 0, "in queue", 1);
let testService = new Service(1, "Shipping", 10);

describe("TicketDAO unit tests", () => {
  describe("getTicket", () => {
    test("It should resolve the issued ticket", async () => {
      const ticketDAO = new TicketDAO();

      const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, callback) => {
        const mockRow: any = { pastTicket: null };
        callback(null, mockRow);
        return {} as Database;
      });

      const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, [], callback) => {
        callback(null);
        return {} as Database;
      });

      const result = await ticketDAO.getTicket(testService.serviceID);

      expect(result).toEqual(testNewTicket);
      mockDBRun.mockRestore();
      mockDBGet.mockRestore();
    });
  });
  describe("nextCustomer", () => {
    test("It should return the next customer ticket and update its status", async () => {
      const ticketDAO = new TicketDAO();
      const officerID = 1;

      const mockRow = {
        TicketID: 1,
        ServiceID: 1,
        IssuedTime: "2024-10-15",
        EstimatedTime: 15,
        ServiceTime: 10,
        QueueLength: 5,
      };

      const mockTicket = new Ticket(
        mockRow.TicketID,
        mockRow.ServiceID,
        mockRow.IssuedTime,
        mockRow.EstimatedTime,
        "in progress",
        officerID
      );

      // Mocking db.get to return a ticket
      const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        return callback(null, mockRow); // Simulating a successful row return
      });

      // Mocking db.run to simulate a successful status update
      const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        return callback(null); // Simulating successful update
      });

      const result = await ticketDAO.nextCustomer(officerID);

      expect(result).toEqual(mockTicket);
      mockDBGet.mockRestore();
      mockDBRun.mockRestore();
    });

    test("It should return null if no ticket is found", async () => {
      const ticketDAO = new TicketDAO();
      const officerID = 1;

      // Mocking db.get to return null (no ticket found)
      const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        return callback(null, null); // Simulating no rows found
      });

      const result = await ticketDAO.nextCustomer(officerID);

      expect(result).toBeNull();
      mockDBGet.mockRestore();
    });

    test("It should throw an error if there is a database error during ticket selection", async () => {
      const ticketDAO = new TicketDAO();
      const officerID = 1;

      // Mocking db.get to simulate a database error
      const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        return callback(new Error("Database error"), null); // Simulating an error
      });

      await expect(ticketDAO.nextCustomer(officerID)).rejects.toThrow("Database error");
      mockDBGet.mockRestore();
    });

    test("It should throw an error if there is a database error during status update", async () => {
      const ticketDAO = new TicketDAO();
      const officerID = 1;

      const mockRow = {
        TicketID: 1,
        ServiceID: 1,
        IssuedTime: "2024-10-15",
        EstimatedTime: 15,
        ServiceTime: 10,
        QueueLength: 5,
      };

      // Mocking db.get to return a ticket
      const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        return callback(null, mockRow); // Simulating a successful row return
      });

      // Mocking db.run to simulate a database error during the update
      const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        return callback(new Error("Update error")); // Simulating an update error
      });

      await expect(ticketDAO.nextCustomer(officerID)).rejects.toThrow("Update error");
      mockDBGet.mockRestore();
      mockDBRun.mockRestore();
    });
  });
});
