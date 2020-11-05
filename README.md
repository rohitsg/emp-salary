# queries used

create table employee(id serial PRIMARY KEY, firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, designation VARCHAR(100), email varchar(100) unique not null, hashedPassword varchar(100) not null);

create table salary(id serial PRIMARY KEY, salary int NOT NULL, empid int not null, foreign key(empid) references employee(id));

# pre-requisites
nodejs

# how to run
go to master branch
git clone https://github.com/rohitsg/emp-salary.git
cd emp-salary
npm i
npm start

# how to use apis
1. First generate token by calling - http://localhost:3000/generateToken - POST, 
payload - {
	"email": "rohitsgoudagaon@gmail.com",
	"password": "123456"
}, 

2. To get employee list - http://localhost:3000/employees - GET
headers - "Authorization: bearer tokenValue"

3. To get specific employee  - http://localhost:3000/employee/:id - GET
headers - "Authorization: bearer tokenValue"

