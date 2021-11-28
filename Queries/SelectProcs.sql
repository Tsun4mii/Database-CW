use CW_DB

go 
create procedure selAllUsers
as 
begin
	select * from USERS
End;

--old select Users
go 
create procedure OUsers
as 
begin
	select * from USERS
End;

drop procedure OUsers;

--new select Users
go 
create procedure OUsers
				@start int,
				@end int
as 
begin
	with row_nums as
	(
		SELECT row_number() over(order by USERS.id) as num, 
		* from USERS
	)
	select * from row_nums where num between @start and @end;
end;

go 
create procedure LoginUser @login nvarchar(50), @pass nvarchar(20)
as 
begin
	select * from USERS where USERS.login = @login AND USERS.password = @pass;
end;

go 
create procedure selOneUser @login nvarchar(50)
as 
begin
	select * from USERS where USERS.login = @login;
end;

--old select ProdTypes
go
create procedure OProdTypes
as
begin
	select PRODUCT_TYPE.id, prodType, depart from PRODUCT_TYPE left join DEPARTMENTS on 
	PRODUCT_TYPE.idDep = DEPARTMENTS.id;
end;

drop procedure OProdTypes;

--new select ProdTypes
go 
create procedure OProdTypes 
				@start int,
				@end int
as 
begin
	with row_nums as
	(
		SELECT row_number() over(order by PRODUCT_TYPE.id) as num, 
		PRODUCT_TYPE.id, prodType, depart from PRODUCT_TYPE left join DEPARTMENTS on 
		PRODUCT_TYPE.idDep = DEPARTMENTS.id
	)
	select * from row_nums where num between @start and @end;
end;

--old select Products
go
create procedure OProducts
as
begin 
	select PRODUCTS.prodCode, PRODUCTS.prodName, PRODUCTS.prodPrice, PRODUCTS.prodStock, PRODUCT_TYPE.prodType 
from PRODUCTS join PRODUCT_TYPE on PRODUCTS.typeProdId = PRODUCT_TYPE.id;
end;

drop procedure OProducts;

--new select products
go
create procedure OProducts 
				@start int,
				@end int
as 
begin
	with row_nums as
	(
		SELECT row_number() over(order by PRODUCT_TYPE.id) as num, 
		PRODUCTS.prodCode, PRODUCTS.prodName, PRODUCTS.prodPrice, PRODUCTS.prodStock, PRODUCT_TYPE.prodType 
		from PRODUCTS join PRODUCT_TYPE on PRODUCTS.typeProdId = PRODUCT_TYPE.id
	)
	select * from row_nums where num between @start and @end;
end;

--old select Posts
go 
create procedure OPosts
as
begin
	select * from POSTS;
end;

drop procedure OPosts;

--new select Posts
go 
create procedure OPosts
				@start int,
				@end int
as 
begin
	with row_nums as
	(
		SELECT row_number() over(order by POSTS.id) as num, 
		* from POSTS
	)
	select * from row_nums where num between @start and @end;
end;

--old select Stores
go
create procedure OStores
as
begin
 select * from STORES;
end;

drop procedure OStores;

--new select Stores
go 
create procedure OStores
				@start int,
				@end int
as 
begin
	with row_nums as
	(
		SELECT row_number() over(order by STORES.id) as num, 
		* from STORES
	)
	select * from row_nums where num between @start and @end;
end;

--old select Suppliers
go
create procedure OSuppliers
as
begin
 select * from SUPPLIERS;
end;

drop procedure OSuppliers
--new select Suppliers
go 
create procedure OSuppliers
				@start int,
				@end int
as 
begin
	with row_nums as
	(
		SELECT row_number() over(order by SUPPLIERS.id) as num, 
		* from SUPPLIERS
	)
	select * from row_nums where num between @start and @end;
end;