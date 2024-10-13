import { describe, test, expect, jest } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";

import TicketController from "../../src/controllers/ticketController";
import Ticket from "../../src/components/ticket";
import Service from "../../src/components/service";
const baseURL = "/api";

// For unit tests, we need to validate the internal logic of a single component, without the need to test the interaction with other components
jest.mock("../../src/controllers/ticketController");

let testTicket = new Ticket(1, 1, "", 10, "completed");
let testService = new Service(1, "Shipping", 10);

describe("TicketRoute unit tests", () => {
  describe("GET /api/tickets", () => {
    test("It returns 200 with the issued ticket", async () => {
      const inputService = {
        ServiceID: testService.serviceID,
      };
      jest
        .spyOn(TicketController.prototype, "getTicket")
        .mockResolvedValueOnce(testTicket);

      const response = await request(app)
        .post(baseURL + "/tickets")
        .send(inputService);
      expect(response.status).toBe(201);
      expect(TicketController.prototype.getTicket).toHaveBeenCalled();
      expect(response.body).toEqual(testTicket);
    });
  });
});
