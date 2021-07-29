INSERT INTO users (name, email, password) 
VALUES 
('Shav', 'shav@email.co.uk', 'asdasd'),
('Monica', 'monica@email.co.uk', 'zxczxc'),
('Moony', 'moony@email.co.uk', 'qweqwe');
INSERT INTO buys (ticker, fee, buy_level, num_shares, stored_price, date_of_purchase, user_id)
VALUES
('GOOG', 17.6, 50, 7, 85, '2015-10-01 00:00:00', 1),
('AAPL', 17.6, 50, 7, 85, '2015-10-01 00:00:00', 2);

INSERT INTO users (name, email, password) VALUES ('Akash', 'akash@email.co.uk', 'jkljkl');

INSERT INTO sells (ticker, fee, buy_level, num_shares, stored_price, date_of_purchase, user_id)
VALUES
('GOOG', 17.6, 50, 7, 85, '2015-10-01 00:00:00', 1),
('AAPL', 17.6, 50, 7, 85, '2015-10-01 00:00:00', 1);