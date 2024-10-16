import { test, expect, jest, describe, beforeEach } from "@jest/globals";
import TicketController from "../../src/controllers/ticketController";
import TicketDAO from "../../src/dao/ticketDAO";
import Service from "../../src/components/service";
import Ticket from "../../src/components/ticket";

jest.mock("../../src/db/db.ts");
jest.mock("../../src/dao/ticketDAO.ts");

let testService = new Service(1, "Shipping", 10);

describe("Ticket Controller Unit Tests", () => {
  let ticketController: TicketController;
  let mockTicketDAO: jest.Mocked<TicketDAO>;

  beforeEach(() => {
    mockTicketDAO = new TicketDAO() as jest.Mocked<TicketDAO>;
    ticketController = new TicketController();
  });

  describe("getTicket", () => {
    test("It should return an instance of issued ticket", async () => {
      const expectedTicket = {
        ticketID: 1,
        serviceID: 1,
        issuedTime: "2024-10-12",
        estimatedTime: 0,
        status: "in queue",
        counterID: 1,
      };
      jest.spyOn(TicketDAO.prototype, "getTicket").mockResolvedValueOnce(expectedTicket);
      const controller = new TicketController();
      const response = await controller.getTicket(testService.serviceID);

      expect(TicketDAO.prototype.getTicket).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedTicket);
    });
  });

  describe("nextCustomer", () => {
    test("It should return the next customer ticket", async () => {
      const expectedTicket = {
        ticketID: 1,
        serviceID: 1,
        issuedTime: "2024-10-12",
        estimatedTime: 15,
        status: "in progress",
        counterID: 1,
      };

      // Mocking the DAO function to return the expected ticket
      jest.spyOn(TicketDAO.prototype, "nextCustomer").mockResolvedValueOnce(expectedTicket);

      const controller = new TicketController();
      const officerID = 1;
      const response = await controller.nextCustomer(officerID);

      expect(TicketDAO.prototype.nextCustomer).toHaveBeenCalledTimes(1);
      expect(TicketDAO.prototype.nextCustomer).toHaveBeenCalledWith(officerID);
      expect(response).toBe(expectedTicket);
    });

    test("It should return null if no ticket is found", async () => {
      // Mocking the DAO function to return null
      jest.spyOn(TicketDAO.prototype, "nextCustomer").mockResolvedValueOnce(null);

      const controller = new TicketController();
      const officerID = 1;
      const response = await controller.nextCustomer(officerID);

      expect(TicketDAO.prototype.nextCustomer).toHaveBeenCalledTimes(2);
      expect(TicketDAO.prototype.nextCustomer).toHaveBeenCalledWith(officerID);
      expect(response).toBeNull();
    });

    test("It should throw an error if DAO throws an error", async () => {
      const errorMessage = "Database error";

      // Mocking the DAO function to throw an error
      jest
        .spyOn(TicketDAO.prototype, "nextCustomer")
        .mockRejectedValueOnce(new Error(errorMessage));

      const controller = new TicketController();
      const officerID = 1;

      await expect(controller.nextCustomer(officerID)).rejects.toThrow(errorMessage);
      expect(TicketDAO.prototype.nextCustomer).toHaveBeenCalledTimes(3);
      expect(TicketDAO.prototype.nextCustomer).toHaveBeenCalledWith(officerID);
    });
  });
});
