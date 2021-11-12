use CW_DB

go 
create procedure selAllUsers
as 
begin
	select * from USERS
End;

go 
create procedure OUsers
as 
begin
	select * from USERS
End;

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

go
create procedure OProdTypes
as
begin
	select PRODUCT_TYPE.id, prodType, depart from PRODUCT_TYPE left join DEPARTMENTS on 
	PRODUCT_TYPE.idDep = DEPARTMENTS.id;
end;

go
create procedure OProducts
as
begin 
	select PRODUCTS.prodCode, PRODUCTS.prodName, PRODUCTS.prodPrice, PRODUCTS.prodStock, PRODUCT_TYPE.prodType 
from PRODUCTS join PRODUCT_TYPE on PRODUCTS.typeProdId = PRODUCT_TYPE.id;
end;
