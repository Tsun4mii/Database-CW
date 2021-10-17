go 

create database CW_DB

go

use CW_DB

create table USER_TYPE(
	id int identity(1,1) constraint TYPE_USER_PK primary key,
	userType nvarchar(20)
)

create table USERS(
	id int identity(1,1) constraint USER_PK primary key,
	login nvarchar(50) unique,
	password nvarchar(20),
	email nvarchar(30),
	firstName nvarchar(50),
	secondName nvarchar(50),
	sex nchar(1) check(sex = 'M' or sex = 'F'),
	age int,
	userType int constraint TYPE_USER_FK foreign key references USER_TYPE(id)
)

create table STORES(
	id int identity(1,1) constraint STORE_PK primary key,
	storeName nvarchar(50),
	adress nvarchar(150),
)

create table DEPARTMENTS(
	id int identity(1,1) constraint DEP_PK primary key, 
	depart nvarchar(50)
)

create table POSTS(
	id int identity(1,1) constraint POST_PK primary key,
	post nvarchar(50)
)

create table EMPLOYEES(
	id int identity(1,1) constraint EMPL_PK primary key,
	firstName nvarchar(50),
	lastName nvarchar(50),
	sex nchar(1) check(sex = 'M' or sex = 'F'),
	age int,
	expirience int,
	idPost int constraint POST_ID_FK foreign key references POSTS(id),
	idDep int constraint DEP_ID_FK foreign key references DEPARTMENTS(id),
	idStore int constraint STORE_ID_FK foreign key references STORES(id)
)

create table PRODUCT_TYPE(
	id int identity(1,1) constraint PROD_TYPE_PK primary key,
	prodType nvarchar(30),
	idDep int constraint PROD_DEP_ID_FK foreign key references DEPARTMENTS(id)
)

create table PRODUCTS(
	id int identity(1,1) constraint PROD_PK primary key,
	prodCode nvarchar(12) check(LEN(prodCode) = 12) unique,
	prodName nvarchar(30),
	typeProdId int constraint PROD_TYPE_ID_FK foreign key references PRODUCT_TYPE(id), 
	prodPrice numeric(8,2),
	prodStock int
)

create table ADMIN_TYPE(
	id int identity(1,1) constraint ADMIN_TYPE_PK primary key,
	adminType nvarchar(30)
)

create table STORE_ADMIN(
	id int identity(1,1) constraint ADMIN_ID_PK primary key,
	adminLogin nvarchar(30) unique,
	adminPassword nvarchar(30),
	adminType int constraint ADMIN_TYPE_FK foreign key references ADMIN_TYPE(id),
	employeeId int constraint EMPL_ADMIN_FK foreign key references EMPLOYEES(id)
)
