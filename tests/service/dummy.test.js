const {sum, multiply} = require("../../src/services/dummy_service")

describe("all the test case of sum function", () => {

    test("adding 1 and 2 is equal to 3", () => {
        const result = sum(1, 2);
        expect(result).toBe(3)
    })
    
    test("adding 1 and -2 is equal to -1", () => {
        const result = sum(1, -2)
        expect(result).toBe(-1);
    })
    
    test("adding 1 and -1 is equal to 0", () => {
        const result = sum(1, -1);
        expect(result).toBe(0)
    })
})


describe("all the test case of multiply fuction", () => {
    test("multiply 1 and 2 is equal to 2", () => {
        const result = multiply(1, 2)
        expect(result).toBe(2)
    })

    test("multiply 1 and -2 is equal to -2", () => {
        const result = multiply(1, -2)
        expect(result).toBe(-2)
    })

    test("multiply -1 and -2 is equal to 2", () => {
        const result = multiply(-1, -2)
        expect(result).toBe(2)
    })

    test("multiply 1 and 0 is equal to 0", () => {
        const result = multiply(1, 0)
        expect(result).toBe(0)
    })

})