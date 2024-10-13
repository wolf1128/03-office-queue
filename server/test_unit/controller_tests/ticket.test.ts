import { test, expect, jest, describe } from "@jest/globals";
import TicketController from "../../src/controllers/ticketController";
import TicketDAO from "../../src/dao/ticketDAO";
import Service from "../../src/components/service";

jest.mock("../../src/db/db.ts");
jest.mock("../../src/dao/ticketDAO.ts");

let testService = new Service(1, "Shipping", 10);

describe("Ticket Controller Unit Tests", () => {
  describe("getTicket", () => {
    test("It should return an instance of issued ticket", async () => {
      const expectedTicket = {
        ticketID: 1,
        serviceID: 1,
        issuedTime: "2024-10-12",
        estimatedTime: 0,
        status: "in queue",
      };
      jest
        .spyOn(TicketDAO.prototype, "getTicket")
        .mockResolvedValueOnce(expectedTicket);
      const controller = new TicketController();
      const response = await controller.getTicket(testService.serviceID);

      expect(TicketDAO.prototype.getTicket).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedTicket);
    });
  });
});
