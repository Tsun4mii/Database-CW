use CW_DB;

go 
create procedure OStoresUpdate
				 @id int,
				 @name nvarchar(50),
				 @address nvarchar(150)
as 
begin 
	update STORES set storeName = @name, adress = @address where id = @id;
end;

go
create procedure OProductsUpdate
				 @id int,
				 @code nvarchar(12),
				 @name nvarchar(30),
				 @type int,
				 @price numeric(8,2),
				 @stock int,
				 @supId int
as
begin 
	update PRODUCTS set prodCode = @code, prodName = @name, typeProdId = @type, prodPrice = @price,
	prodStock = @stock, supId = @supId where id = @id;
end;

go 
create procedure OPostsUpdate
				 @id int, 
				 @post nvarchar(50)
as 
begin 
	update POSTS set post = @post where id = @id;
end;