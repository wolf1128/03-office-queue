import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../index";
import { cleanup } from "../src/db/cleanup";
import db from "../src/db/db";

const routePath = "/api"; // Base route path for the API

/*
  TODO:
  since we do not have a service for creating the services, I simulated the behaviour directly on the db.
  This is not the best practice. Later on, we should create a service for creating services and replace this. 
*/
const services = [
  { ServiceName: "S1", ServiceTime: 30, ServiceID: 1 },
  { ServiceName: "S2", ServiceTime: 45, ServiceID: 2 },
  { ServiceName: "S3", ServiceTime: 60, ServiceID: 3 },
];
const postService = async () => {
  const insert_query = `INSERT INTO Service (ServiceName, ServiceTime) VALUES (?, ?)`;

  services.forEach((service) => {
    db.run(insert_query, [service.ServiceName, service.ServiceTime], (err: Error | null) => {
      if (err) {
        console.error("Error inserting record:", err); // For debug purposes.
      } else {
        // console.log("Record inserted successfully"); // For debug purposes.
      }
    });
  });
};

const postTicket = async (ServiceID: number) => {
  await request(app).post(`${routePath}/tickets`).send({ ServiceID }).expect(201);
};

beforeAll(async () => {
  await cleanup();
  //await postTicket(1);
  await postService();
});

afterAll(async () => {
  await cleanup();
});

describe("Service routes integration tests", () => {
  describe("POST /tickets", () => {
    test("It should return 201 with an instance of issued ticket", async () => {
      // Get all services and select one
      const res0 = await request(app).get(`${routePath}/services`).expect(200);
      const services = res0.body;
      const selectedServiceID = services[0].ServiceID;

      const res1 = await request(app)
        .post(`${routePath}/tickets`)
        .send({ ServiceID: selectedServiceID })
        .expect(201);

      expect(res1.body).toBeDefined();
      expect(res1.body.status).toBe("in queue");
    });

    test("It should return 422 if the ServiceID is not provided", async () => {
      await request(app).post(`${routePath}/tickets`).send({}).expect(422);
    });
  });

  describe("PATCH /next-customer/:officerID", () => {
    test("It should return 200 with the next customer ticket", async () => {
      // Prima di tutto, assicurati che esista un officer con un ticket in coda
      const officerID = 1;

      const res1 = await request(app)
        .patch(`${routePath}/tickets/next-customer/${officerID}`)
        .expect(200);

      expect(res1.body).toBeDefined();
      expect(res1.body.ticketID).toBeDefined();
      expect(res1.body.status).toBe("in progress");
    });

    test("It should return 422 if the officerID is invalid", async () => {
      // Simuliamo un officerID non valido
      const invalidOfficerID = "abc"; // Un valore non numerico

      await request(app)
        .patch(`${routePath}/tickets/next-customer/${invalidOfficerID}`)
        .expect(422);
    });

    test("It should return 404 if no ticket is available for the officer", async () => {
      // Simuliamo un officerID per cui non ci sono ticket disponibili
      const officerIDWithNoTickets = 99;

      const res = await request(app)
        .patch(`${routePath}/tickets/next-customer/${officerIDWithNoTickets}`)
        .expect(404);

      expect(res.body).toBeDefined();
      expect(res.body.error).toBe("No ticket found");
    });
  });
});
