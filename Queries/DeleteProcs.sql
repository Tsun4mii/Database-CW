use CW_DB;

go 
create procedure OProductsDelete
					@BarCode nvarchar(12)
as
begin
	delete from PRODUCTS where prodCode = @BarCode;
end;

go 
create procedure OStoresDelete
					@id int
as
begin
	delete from STORES where id = @id;
end;

go
create procedure OPostsDelete
				 @id int
as
begin 
	delete from POSTS where id = @id;
end;

go 
create procedure DeleteFromBucket
				 @prodId int,
				 @userId int
as 
begin 
	delete from USER_BUCKET where prodId = @prodId and userId = @userId;
end;