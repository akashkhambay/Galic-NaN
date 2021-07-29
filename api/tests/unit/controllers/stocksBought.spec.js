//change to Test controller functions of stocksBought

const buysController = require("../../../controllers/stocksBought");
const Buy = require("../../../models/StocksBought");

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

  describe("show", () => {
    test("it returns a buy with a 200 status code", async () => {
      let testBuy = {
        buy_id: 1,
        ticker: "TEST",
        fee: 100,
        buy_level: 10,
        num_shares: 10,
        stored_price: 10,
        date_of_purchase: 2015 - 06 - 06,
      };
      jest.spyOn(Buy, "findById").mockResolvedValue(new Buy(testBuy));

      const mockReq = { params: { id: 1 } };
      await buysController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Buy(testBuy));
    });
  });

  describe("create", () => {
    test("it returns a new buy with a 201 status code", async () => {
      let testBuy = {
        buy_id: 2,
        ticker: "TEST",
        fee: 100,
        buy_level: 10,
        num_shares: 10,
        stored_price: 10,
        date_of_purchase: 2015 - 06 - 06,
      };
      jest.spyOn(Buy, "create").mockResolvedValue(new Buy(testBuy));

      const mockReq = { body: testBuy };
      await buysController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Book(testBuy));
    });
  });

  describe("destroy", () => {
    test("it returns a 204 status code on successful deletion", async () => {
      jest.spyOn(Buy.prototype, "destroy").mockResolvedValue("Deleted");

      const mockReq = { params: { id: 1 } };
      await buysController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    });
  });
});
