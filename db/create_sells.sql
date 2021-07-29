DROP TABLE IF EXISTS sells;

CREATE TABLE sells (
    id serial PRIMARY KEY,
    ticker VARCHAR(10) NOT NULL,
    fee int,
    buy_level int NOT NULL,
    num_shares int NOT NULL,
    stored_price int NOT NULL,
    date_of_purchase TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id int
);