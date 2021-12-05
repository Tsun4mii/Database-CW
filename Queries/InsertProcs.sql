use CW_DB

go
create procedure regUser
				@login nvarchar(50),
				@password nvarchar(200),
				@email nvarchar(30),
				@firstName nvarchar(50),
				@secondName nvarchar(50),
				@sex nchar(1),
				@age int,
				@userType int
as
begin
	insert into USERS(login, password, email, firstName, secondName, sex, age, userType)
	values(@login, @password, @email, @firstName, @secondName, @sex, @age, @userType);
end;

go 
create procedure regAdmin
				@login nvarchar(30),
				@password nvarchar(30),
				@typeid int,
				@eid int
as
begin 
	declare @c int;
	declare @t int;
	select @c = count(*) from EMPLOYEES where id = @eid; 
	select @t = count(*) from ADMIN_TYPE where id = @typeid;
	if(@c != 0 and @t != 0)
		insert into STORE_ADMIN(adminLogin, adminPassword, adminType, employeeId) 
		values(@login, @password, @typeid, @eid);
end;

select * from USERS;
delete from USERS where id = 3;

drop procedure regUser;

--add product
go 
create procedure OProductsAdd
				@code nvarchar(12),
				@name nvarchar(30),
				@id int, 
				@price numeric(8,2),
				@stock int
as 
begin 
	insert into PRODUCTS(prodCode, prodName, typeProdId, prodPrice, prodStock) 
	values(@code, @name, @id, @price, @stock);
end;

--add store
go 
create procedure OStoresAdd
				@name nvarchar(50),
				@adress nvarchar(150)
as
begin
	insert into STORES(storeName, adress) values(@name, @adress);
end;

