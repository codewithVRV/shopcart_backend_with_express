const {CategoryRepository} = require("../../src/repositories/index")
const {Category} = require("../../src/models/index")

const mockCategory = {
    id: 5,
    name: "grooming",
    description: "grooming related product",
    image: "https://puresense.co.in/cdn/shop/articles/banner_642e5ae1-8834-464b-9d35-17824e272f13.jpg?v=1655814703",
    updatedAt: "2024-01-06T06:44:28.039Z",
    createdAt: "2024-01-06T06:44:28.039Z"
};

const mockError = {
    error: "sample error"
}

describe("Test for category repository category creation", () => {
    test("should create a new category", async () => {

        // Preparation

        const repository = new CategoryRepository();
        jest.spyOn(Category, "create").mockImplementation(() => mockCategory)

        // act 
        const response = await repository.createCategory("grooming", "grooming related product", "https://puresense.co.in/cdn/shop/articles/banner_642e5ae1-8834-464b-9d35-17824e272f13.jpg?v=1655814703")

        // Expect or assert
        expect(response.name).toBe("grooming")
        expect(response.description).toBe("grooming related product")
        expect(response.image).toBe("https://puresense.co.in/cdn/shop/articles/banner_642e5ae1-8834-464b-9d35-17824e272f13.jpg?v=1655814703")

    })
    test("should not create a new category", async () => {

        // Preparation
        const repository = new CategoryRepository();
        jest.spyOn(Category, "create").mockImplementation(() => {
            throw mockError;
        })

        
        try{
            // act 
            const response = await repository.createCategory("grooming", "grooming related product", "https://puresense.co.in/cdn/shop/articles/banner_642e5ae1-8834-464b-9d35-17824e272f13.jpg?v=1655814703")
            expect(response).toThrow()
        }
        catch(error) {
            // Expect or assert
            expect(error).toBe(mockError)
        }
    })
})