CREATE TYPE status AS ENUM ('OPEN', 'ORDERED');

create extension if not exists "uuid-ossp";

create table carts (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid default uuid_generate_v4(),
	created_at date not null,
    updated_at date not null,
    status status
);

create table cart_items (
	cart_id uuid,
	product_id uuid primary key default uuid_generate_v4(),
    count integer,
    foreign key ("cart_id") references "carts" ("id")
);

insert into carts (created_at, updated_at, status) values
('2023-04-11 14:18:00', '2023-04-11 14:18:00', 'OPEN'),
('2023-04-11 14:18:00', '2023-04-11 14:18:00', 'ORDERED');

insert into cart_items (cart_id, count) values
('gjh234jg-hj43-cv98-56xz-dsfs98df78s9', '2'),
('gj2h34gj-df98-45xc-87df-09sdg564gh9d', '3');