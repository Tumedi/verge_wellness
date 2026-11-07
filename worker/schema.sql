-- Verge Wellness stock database (MySQL 8+).
-- Run this once in your MySQL tool (phpMyAdmin, MySQL Workbench, the
-- provider's SQL console, or the mysql command line).
--
-- Every product starts at 10 units: change the numbers to your real stock.
-- To update stock later:  UPDATE products SET stock = 25 WHERE name = 'Neem Powder';
-- Product names must match src/data/content.js exactly.

CREATE TABLE IF NOT EXISTS products (
  name        VARCHAR(120) NOT NULL,
  stock       INT UNSIGNED NOT NULL DEFAULT 0,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- One row per placed order. The unique reference makes order submission
-- safe to retry: the same order can never reduce stock twice.
CREATE TABLE IF NOT EXISTS orders (
  reference   VARCHAR(100) NOT NULL,
  method      VARCHAR(20)  NOT NULL,
  -- 'ok' = stock reduced. 'oversold' = the customer PAID but the item had
  -- just sold out: refund them or arrange a restock. To list these:
  --   SELECT * FROM orders WHERE status = 'oversold';
  status      VARCHAR(20)  NOT NULL DEFAULT 'ok',
  items       JSON         NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (reference)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO products (name, stock) VALUES
  ('Moringa Leaf Powder', 10),
  ('Ashwagandha Powder', 10),
  ('Karela Powder', 10),
  ('Neem Powder', 10),
  ('Chia Seeds', 10),
  ('Raw Sea Moss', 10),
  ('Dried Hibiscus Flower', 10),
  ('Dried Soursop Leaves', 10),
  ('Ashwagandha Capsules', 10),
  ('Karela Capsules', 10),
  ('Moringa Leaf Capsules', 10),
  ('Neem Leaf Capsules', 10),
  ('Sea Moss Capsules', 10),
  ('Soursop Leaf Capsules', 10),
  ('Organic Hair Growth Oil', 10),
  ('Unrefined Shea Butter', 10),
  ('Liquid Chlorophyll', 10);
