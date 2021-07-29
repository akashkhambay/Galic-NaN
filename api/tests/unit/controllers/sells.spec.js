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

  describe("show", () => {
    test("it returns a buy with a 200 status code", async () => {
      let testSell = {
        id: 1,
        ticker: "TEST",
        fee: 100,
        buy_level: 10,
        num_shares: 10,
        stored_price: 10,
        date_of_purchase: 2015 - 06 - 06,
      };
      jest.spyOn(Sell, "findById").mockResolvedValue(new Sell(testSell));

      const mockReq = { params: { id: 1 } };
      await sellsController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Sell(testSell));
    });
  });

  describe("create", () => {
    test("it returns a new sell with a 201 status code", async () => {
      let testBuy = {
        id: 2,
        ticker: "TEST",
        fee: 100,
        buy_level: 10,
        num_shares: 10,
        stored_price: 10,
        date_of_purchase: 2015 - 06 - 06,
      };
      jest.spyOn(Sell, "create").mockResolvedValue(new Sell(testSell));

      const mockReq = { body: testSell };
      await sellsController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Sell(testSell));
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
