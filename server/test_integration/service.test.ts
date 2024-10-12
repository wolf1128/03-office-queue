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
  { ServiceName: "Service A", ServiceTime: 30 },
  { ServiceName: "Service B", ServiceTime: 45 },
  { ServiceName: "Service C", ServiceTime: 60 },
];
const postService = async () => {
  const insert_query = `INSERT INTO Service (ServiceName, ServiceTime) VALUES (?, ?)`;

  services.forEach((service) => {
    db.run(
      insert_query,
      [service.ServiceName, service.ServiceTime],
      (err: Error | null) => {
        if (err) {
          console.error("Error inserting record:", err); // For debug purposes.
        } else {
          // console.log("Record inserted successfully"); // // For debug purposes.
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
  describe("GET /services", () => {
    test("It should return a 200 success code with an array of services", async () => {
      const res = await request(app).get(`${routePath}/services`).expect(200);
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(services.length);
      expect(res.body[0].ServiceName).toBe(services[0].ServiceName);
    });
  });
});
