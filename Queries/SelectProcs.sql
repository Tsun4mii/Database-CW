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

