# queries used

create table employee(id serial PRIMARY KEY, firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, designation VARCHAR(100), email varchar(100) unique not null, hashedPassword varchar(100) not null);

create table salary(id serial PRIMARY KEY, salary int NOT NULL, empid int not null, foreign key(empid) references employee(id));