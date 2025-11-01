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

        const res = await request(app).post("/signup").send({
            id: "abc123",
            username: "abhishek_great",
            email: "abhishek@b.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(409);
        expect(res.body.message).toBe("User already exists");
    });

    it("should return 411 if invalid data", async () => {
        const res = await request(app).post("/signup").send({});
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect inputs")
    });

});


// describe("POST /signin", () => {
//     it("should login successfully", async () => {
//         prismaClient.user.findUnique.mockResolvedValue({
//             id: "abcccccccc123",
//             username: "abhishekccc_great",
//             email: "a@bccccccccccc.com",
//             password: "passworccccccd123"
//         });

//         const res = await request(app).post("/signin").send({
//             email: "a@bccccccccccc.com",
//             password: "passworccccccd123"
//         });

//         expect(res.statusCode).toBe(200);
//         expect(res.body.token).toBe("abcccccccc123"); // ✅ fixed
//     });

//     it("should fail if invalid credentials", async () => {
//         prismaClient.user.findUnique.mockResolvedValue(null);

//         const res = await request(app).post("/signin").send({
//             email: "wrong@b.com",
//             password: "nope",
//         });

//         expect(res.statusCode).toBe(403);
//         expect(res.body.message).toBe("Invalid credentials");
//     });
// });


// describe("GET /profile", () => {
//     it("should return user profile", async () => {
//         prismaClient.user.findUnique.mockResolvedValue({
//             id: "abc123",
//             username: "abhishek_great",
//             email: "a@b.com",
//             password: "password123",
//         });

//         const res = await request(app).get("/profile").set("token", "abc123");

//         expect(res.statusCode).toBe(200);
//         expect(res.body.username).toBe("abhishek_great");
//     });

//     it("should return 403 if no token provided", async () => {
//         const res = await request(app).get("/profile");
//         expect(res.statusCode).toBe(403);
//     });

//     it("should return 404 if user not found", async () => {
//         prismaClient.user.findUnique.mockResolvedValue(null);

//         const res = await request(app).get("/profile").set("token", "abc123");
//         expect(res.statusCode).toBe(404);
//     });
// });
