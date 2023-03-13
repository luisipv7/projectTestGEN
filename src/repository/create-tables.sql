CREATE TABLE category(
   category_id INT GENERATED ALWAYS AS IDENTITY,
   name VARCHAR(255) NOT NULL,
   percentage real,
   PRIMARY KEY(category_id)
);

CREATE TABLE product(
   product_id INT GENERATED ALWAYS AS IDENTITY,
   category_id INT,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   price real not NULL,
   PRIMARY KEY(product_id),
   CONSTRAINT fk_category
      FOREIGN KEY(category_id) 
	  REFERENCES category(category_id)
);