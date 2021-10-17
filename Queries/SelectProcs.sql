use CW_DB

go 
create procedure selAllUsers
as 
begin
	select * from USERS
End;