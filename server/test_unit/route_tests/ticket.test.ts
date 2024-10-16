import { describe, test, expect, jest } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";

import TicketController from "../../src/controllers/ticketController";
import Ticket from "../../src/components/ticket";
import Service from "../../src/components/service";
const baseURL = "/api";

// For unit tests, we need to validate the internal logic of a single component, without the need to test the interaction with other components
jest.mock("../../src/controllers/ticketController");

let testTicket = new Ticket(1, 1, "", 10, "completed", 1);
let testService = new Service(1, "Shipping", 10);

describe("TicketRoute unit tests", () => {
  describe("GET /api/tickets", () => {
    test("It returns 200 with the issued ticket", async () => {
      const inputService = {
        ServiceID: testService.serviceID,
      };
      jest.spyOn(TicketController.prototype, "getTicket").mockResolvedValueOnce(testTicket);

      const response = await request(app)
        .post(baseURL + "/tickets")
        .send(inputService);
      expect(response.status).toBe(201);
      expect(TicketController.prototype.getTicket).toHaveBeenCalled();
      expect(response.body).toEqual(testTicket);
    });
  });
  describe("PATCH /next-customer/:officerID", () => {
    test("It returns 200 with the next customer ticket", async () => {
      const officerID = 1;
      const expectedTicket = {
        ticketID: 1,
        serviceID: 1,
        issuedTime: "2024-10-12",
        estimatedTime: 15,
        status: "in progress",
        counterID: officerID,
      };

      // Mocking the controller's nextCustomer method to return the expected ticket
      jest.spyOn(TicketController.prototype, "nextCustomer").mockResolvedValueOnce(expectedTicket);

      const response = await request(app)
        .patch(`${baseURL}/tickets/next-customer/${officerID}`) // Simuliamo una richiesta PATCH
        .send();

      expect(response.status).toBe(200); // Aspettativa che lo stato sia 200
      expect(TicketController.prototype.nextCustomer).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual(expectedTicket); // Verifichiamo che il ticket restituito sia corretto
    });

    test("It returns 422 for invalid officerID", async () => {
      const invalidOfficerID = "abc"; // Un officerID non valido, aspettandoci un errore di validazione

      const response = await request(app)
        .patch(`${baseURL}/tickets/next-customer/${invalidOfficerID}`)
        .send();

      expect(response.status).toBe(422); // Lo status dovrebbe essere 422 a causa dell'ID non valido
      expect(TicketController.prototype.nextCustomer).not.toHaveBeenCalled();
    });

    test("It returns 404 if no ticket is found", async () => {
      const officerID = 1;

      // Mocking the controller's nextCustomer method to return null (no ticket found)
      jest.spyOn(TicketController.prototype, "nextCustomer").mockResolvedValueOnce(null);

      const response = await request(app)
        .patch(`${baseURL}/tickets/next-customer/${officerID}`)
        .send();

      expect(response.status).toBe(404); // Aspettativa di un 404 se non viene trovato alcun ticket
      expect(TicketController.prototype.nextCustomer).toHaveBeenCalledTimes(1);
    });

    test("It returns 503 on internal server error", async () => {
      const officerID = 1;
      const errorMessage = "Internal Server Error";

      // Mocking the controller's nextCustomer method to throw an error
      jest
        .spyOn(TicketController.prototype, "nextCustomer")
        .mockRejectedValueOnce(new Error(errorMessage));

      const response = await request(app)
        .patch(`${baseURL}/tickets/next-customer/${officerID}`)
        .send();

      expect(response.status).toBe(503); // Aspettativa di uno stato 503 per un errore interno del server
    });
  });
});
