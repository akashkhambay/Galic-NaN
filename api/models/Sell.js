const db = require("../dbConfig/init");

class Sell {
  constructor(data) {
    this.id = data.id;
    this.ticker = data.ticker;
    this.fee = data.fee;
    this.buy_level = data.buy_level;
    this.num_shares = data.num_shares;
    this.stored_price = data.stored_price;
    this.date_of_purchase = data.date_of_purchase;
    this.user = {
      name: data.name,
      path: `/users/${data.user_id}`,
    };
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let buyData = await db.query("SELECT * FROM sells");
        let sells = buyData.rows.map((b) => new Sell(b));
        resolve(sells);
      } catch (err) {
        reject("Your stocks cannot be found");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let buyData = await db.query(
          `SELECT sells.*, users.name as user_name
          FROM sells JOIN users
          ON sells.user_id = users.id
          WHERE sells.id = $1;`,
          [id]
        );
        let buy = new Sell(buyData.rows[0]);
        resolve(buy);
      } catch (err) {
        reject("Stock not found");
      }
    });
  }

  static async create(buyData) {
    return new Promise(async (resolve, reject) => {
      
      try {
        if(!buyData.date_of_purchase){
          const {
            ticker,
            fee,
            buy_level,
            num_shares,
            stored_price,
            user_id
          } = buyData;
          let result = await db.query(
            `INSERT INTO sells (ticker, fee, buy_level, num_shares, stored_price,user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
            [
              ticker,
              fee,
              buy_level,
              num_shares,
              stored_price,
              user_id
            ]
          );
          resolve(result.rows[0]);
        }
        else{
            const {
              ticker,
              fee,
              buy_level,
              num_shares,
              stored_price,
              user_id, date_of_purchase
            } = buyData;
            let result = await db.query(
              `INSERT INTO sells (ticker, fee, buy_level, num_shares, stored_price, user_id, date_of_purchase) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
              [
                ticker,
                fee,
                buy_level,
                num_shares,
                stored_price,
                user_id,
                date_of_purchase
              ]
            );
            resolve(result.rows[0]);
        }
      } catch (err) {
        reject("Stock could not be bought");
      }
    });
  }
  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          "DELETE FROM sells WHERE id = $1 RETURNING id",
          [this.id]
        );
      
        resolve("Stock bought was deleted "+result);
      } catch (err) {
        reject("Stock bought could not be deleted");
      }
    });
  }
  update() {
    return new Promise (async (resolve, reject) => {
        try {
            let updatedbuyData = await db.query(`UPDATE sells SET num_shares = $1 WHERE id = $2 RETURNING *;`, [ this.num_shares, this.id ]);
            let updatedBuy = new Sell(updatedbuyData.rows[0]);
            resolve (updatedBuy);
        } catch (err) {
            reject('Error updating stock bought');
        }
    });
  }
}
module.exports = Sell;