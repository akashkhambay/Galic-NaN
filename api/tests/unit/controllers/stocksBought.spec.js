//change to Test controller functions of stocksBought

const buysController = require("../../../controllers/stocksBought");
const Buy = require("../../../models/StocksBought");
const User = require("../../../models/Users");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));
const mockRes = { status: mockStatus };

describe("buys controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns buys with a 200 status code", async () => {
      jest.spyOn(Buy, "all", "get").mockResolvedValue(["buy1", "buy2"]);
      await buysController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["buy1", "buy2"]);
    });
  });

  describe("showUserBuys", () => {
    test("it returns new stock bought with a status code 201", async () => {
      let testBuy = {
        buy_id: 1,
        ticker: "Test",
        fee: 50,
        buy_level: 50,
        num_shares: 50,
        stored_price: 50,
        date_of_purchase: "2015-10-01 00:00:00",
      };
      jest.spyOn(Buy, "create").mockResolvedValue(new Buy(testBuy));

      const mockReq = { body: testBuy };
      await buysController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Buy(testBuy));
    });
  });
});
