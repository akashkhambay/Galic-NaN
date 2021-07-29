//change to Test controller functions of users

const usersController = require("../../../controllers/users");
const User = require("../../../models/Users");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("users controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns users with a 200 status code", async () => {
      jest.spyOn(User, "all", "get").mockResolvedValue(["user1", "user2"]);
      await usersController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["user1", "user2"]);
    });
  });
});
