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
  { ServiceName: "S1", ServiceTime: 30 },
  { ServiceName: "S2", ServiceTime: 45 },
  { ServiceName: "S3", ServiceTime: 60 },
];
const postService = async () => {
  const insert_query = `INSERT INTO Service (ServiceName, ServiceTime) VALUES (?, ?)`;

  services.forEach((service) => {
    db.run(
      insert_query,
      [service.ServiceName, service.ServiceTime],
      (err: Error | null) => {
        if (err) {
          console.error("Error inserting record:", err); // For debugging purposes.
        } else {
          // console.log("Record inserted successfully"); // For debugging purposes.
        }
      }
    );
  });
};

beforeAll(async () => {
  await cleanup();

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

  describe("GET /:ticketID/notifications", () => {
    test("It should return 200 with an instance of notification", async () => {
      // Firstly, create a ticket
      const res0 = await request(app).get(`${routePath}/services`).expect(200);
      const services = res0.body;
      const selectedServiceID = services[0].ServiceID;

      const newTicket: any = await request(app)
        .post(`${routePath}/tickets`)
        .send({ ServiceID: selectedServiceID })
        .expect(201);

      const notification = await request(app)
        .get(`${routePath}/tickets/${newTicket.body.ticketID}/notifications`)
        .expect(200);

      expect(notification.body).toBeDefined();
      expect(notification.body.myTicket).toBeDefined();
      expect(notification.body.displayBoard).toBeDefined();

      // expect(res1.body.status).toBe("in queue");
    });

    test("It should return 422 if the TicketID is not valid", async () => {
      await request(app)
        .get(`${routePath}/tickets/test/notifications`)
        .expect(422);
    });
  });
});
