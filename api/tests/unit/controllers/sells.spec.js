//change to Test controller functions of sells

const sellsController = require("../../../controllers/sells");
const Sell = require("../../../models/Sell");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));
const mockRes = { status: mockStatus };

describe("sells controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns sells with a 200 status code", async () => {
      jest.spyOn(Sell, "all", "get").mockResolvedValue(["sell1", "sell2"]);
      await sellsController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["sell1", "sell2"]);
    });
  });
  describe("showUserSells", () => {
    test("it returns new stock sold with a status code 201", async () => {
      let testSell = {
        buy_id: 1,
        ticker: "Test",
        fee: 50,
        buy_level: 50,
        num_shares: 50,
        stored_price: 50,
        date_of_purchase: "2015-10-01 00:00:00",
      };
      jest.spyOn(Sell, "create").mockResolvedValue(new Sell(testSell));

      const mockReq = { body: testSell };
      await sellsController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Sell(testSell));
    });
  });
});
