use CW_DB

create table PRODUCT_STORE
(
	prodId int,
	constraint ProdStore_Product foreign key (prodId) references PRODUCTS(id),
	storeId int,
	constraint ProdStore_Store foreign key (storeId) references STORES(id),
	primary key (prodId, storeId)
)

create table USER_BUCKET
(
	prodId int,
	constraint Bucket_Product foreign key (prodId) references PRODUCTS(id),
	userId int,
	constraint Bucket_User foreign key (userId) references USERS(id),
	primary key (prodId, userId),
	amount int
)

go
create procedure AddToBucket
				 @prodCode nvarchar(12),
				 @userLogin nvarchar(50),
				 @amount int
as
begin 
	declare @userId int, @prodId int;
	select @userId = id from USERS where login = @userLogin;
	select @prodId = id from PRODUCTS where prodCode = @prodCode;
	insert into USER_BUCKET(prodId, userId, amount) values(@prodId, @userId, @amount);
end;

