INSERT INTO users (name, email, password) 
VALUES 
('mon','m@m.m','$2b$10$lJxqQ8YsSs5jnra7sAfLSen.5S5Vl4aZ0/clGP4HhaiZGJh99MieK'),
('akash','akash@email.com','$2b$10$rxyLhNuXPQOanouOOUYkZu/SAf4sNROFDgWGCPfI3VDaBeLrm6ekS');
INSERT INTO buys (ticker, fee, buy_level, num_shares, stored_price, date_of_purchase, user_id)
VALUES
('GOOG', 17.6, 50, 7, 85, '2015-10-01 00:00:00', 1),
('AAPL', 17.6, 50, 7, 85, '2015-10-01 00:00:00', 2);
INSERT INTO sells (ticker, fee, buy_level, num_shares, stored_price, date_of_purchase, user_id)
VALUES
('GOOG', 17.6, 50, 7, 85, '2015-10-01 00:00:00', 1),
('AAPL', 17.6, 50, 7, 85, '2015-10-01 00:00:00', 1);
