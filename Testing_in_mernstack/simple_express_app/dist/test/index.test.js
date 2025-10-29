import request from "supertest";
import app from "../src/index.js";
import { describe, it, expect } from "@jest/globals";
describe("Testing Express js app", () => {
    it("Post /sum It should return the sum of two numbers", async () => {
        const res = await request(app)
            .post("/sum")
            .send({ a: 1, b: 2 });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3); // <-- Correct assertion
    });
});
