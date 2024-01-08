const UserService = require("../../src/services/user_service")
const {UserRepository, CartRepository} = require("../../src/repositories/index")
const {generateToken} = require("../../src/utils/auth")
const bcrypt = require("bcrypt");

jest.mock('../../src/repositories/user_repository');
jest.mock('../../src/repositories/cart_repository');
jest.mock('../../src/utils/auth')


const mockUser = {
    id: 1,
    email: "a@b.com",
    password: "234lkjdf093r",
    createdAt: "8-01-2024",
}

describe("Test for user service sigin method", () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })
    test("Should return valid jwt token", async () => {
        UserRepository.mockImplementation(() => {
            return {
                getUserByEmail: (email) => {
                    return mockUser;
                },
                getUsers: () => {
                    return [mockUser];
                },
                getUser: (id) => {
                    return mockUser;
                }
            }
    })
        // Prepare
        const userService = new UserService(new UserRepository(), new CartRepository())
        jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true)

        // Act.
        const response = await userService.getUserByEmail({email: "a@b.com", password: "234lkjdf093r"})

        // expect 
        expect(generateToken).toHaveBeenCalled()
    });

    test("Should return unauthorized error for mismatch password", async () => {
        UserRepository.mockImplementation(() => {
            return {
                getUserByEmail: (email) => {
                    return mockUser;
                },
                getUsers: () => {
                    return [mockUser];
                },
                getUser: (id) => {
                    return mockUser;
                }
            }
    })
        // Prepare
        const userService = new UserService(new UserRepository(), new CartRepository())
        jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => false)

        try{
            // Act.
            const response = await userService.getUserByEmail({email: "a@b.com", password: "234lkjdf093r"})
        }
        catch(error) {
            // expect 
            expect(error.name).toBe("UnauthorizedError")

        }

    });

    test("Should return notfound error for invalid user credentials", async () => {
        UserRepository.mockImplementation(() => {
            return {
                getUserByEmail: (email) => {
                    return undefined;
                },
                getUsers: () => {
                    return [];
                },
                getUser: (id) => {
                    return undefined;
                }
            }
    })
        // Prepare
        const userService = new UserService(new UserRepository(), new CartRepository())
        jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true)

        try{
            // Act.
            const response = await userService.getUserByEmail({email: "a@b.com", password: "234lkjdf093r"})
        }
        catch(error) {
            // expect 
            expect(error.name).toBe("NotFoundError")

        }

    });
})