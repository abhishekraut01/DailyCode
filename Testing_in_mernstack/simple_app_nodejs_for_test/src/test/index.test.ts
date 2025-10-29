import { describe, it, expect } from "@jest/globals";
import { sum, multiply, devide, substract } from "../index";

describe("testing all calculator functionality", () => {

    describe("Test Sum funtionality", () => {
        it("This should return 1 + 3 = 4", () => {
            const finalAnswer = sum(1, 3)
            expect(finalAnswer).toBe(4)
        })
    })

    describe("Test multiply funtionality", () => {
        it("This should return 1 * 3 = 3", () => {
            const finalAnswer = multiply(1, 3)
            expect(finalAnswer).toBe(3)
        })
    })

    describe("Test substract funtionality", () => {
        it("This should return 1 - 3 = -2", () => {
            const finalAnswer = substract(1, 3)
            expect(finalAnswer).toBe(-2)
        })
    })

    describe("Test devide funtionality", () => {
        it("This should return 4 / 2 = 2", () => {
            const finalAnswer = devide(4, 2)
            expect(finalAnswer).toBe(2)
        })
    })
})