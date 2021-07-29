const Sell = require("../models/Sell");

async function index(req, res) {
  try {
    const sell = await Sell.all;
    res.status(200).json(sell);
  } catch (err) {
    res.status(500).json({ err });
  }
}


async function create(req, res) {
  try {
    const sell = await Sell.create(req.body);
    res.status(201).json(sell);
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function destroy(req, res) {
  try {
    const sell = await Sell.findById(req.params.id);
    const resp = await sell.destroy();
    console.log(resp)
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ err });
  }
}
async function update(req, res) {
  try {
    const sell = new Sell(req.body);
    const resp = await sell.update();
    console.log(resp)
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ err });
  }
}


module.exports = { index, create, destroy, update };
