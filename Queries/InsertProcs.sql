use CW_DB

go
create procedure regUser
				@login nvarchar(50),
				@password nvarchar(20),
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

select * from USERS;
delete from USERS where id = 2;