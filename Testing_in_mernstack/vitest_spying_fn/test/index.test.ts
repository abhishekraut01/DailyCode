import { describe, vi, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { prismaClient } from "../db/__mocks__/index.js";


vi.mock("../db")

describe("POST /signup", () => {
    it("should create a new user", async () => {

        prismaClient.user.create.mockResolvedValue({
            id: "abc123",
            username: "sweabhishek",
            email: "abhishek@b.com",
            password: "password123",
        })

        vi.spyOn(prismaClient.user, 'create');

        const res = await request(app).post("/signup").send({
            id: "abc123",
            username: "sweabhishek",
            email: "abhishek@b.com",
            password: "password123",
        });

        expect(prismaClient.user.create).toHaveBeenCalledWith({
            data: {
                id: "abc123",
                username: "sweabhishek",
                email: "abhishek@b.com",
                password: "password123",
            }
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe("abc123");
        expect(res.body.message).toBe("User created");

    });

    it("should not signup if user already exists", async () => {
        prismaClient.user.findUnique.mockResolvedValue({
            id: "abc123",
            username: "abhishek_great",
            email: "abhishek@b.com",
            password: "password123",
        })
        vi.spyOn(prismaClient.user, 'findUnique');

        const res = await request(app).post("/signup").send({
            id: "abc123",
            username: "abhishek_great",
            email: "abhishek@b.com",
            password: "password123",
        });

        expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
            where:{
                email:"abhishek@b.com"
            }
        })

        expect(res.statusCode).toBe(409);
        expect(res.body.message).toBe("User already exists");
    });

    it("should return 411 if invalid data", async () => {
        const res = await request(app).post("/signup").send({});
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect inputs")
    });

});
