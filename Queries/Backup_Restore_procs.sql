use CW_DB

go 
create procedure backupDB
as
begin 
	Backup database CW_DB 
	to disk = 'E:\3rd-course\1st-sem\DB\CW\Backups\CW_DB.bak';
end;

go 
use master;
go
create procedure restoreDB
as 
begin
	ALTER DATABASE CW_DB
	SET SINGLE_USER
	WITH ROLLBACK IMMEDIATE;

	restore database CW_DB
	from disk = 'E:\3rd-course\1st-sem\DB\CW\Backups\CW_DB.bak' with replace;

	ALTER DATABASE CW_DB
	SET MULTI_USER;
end;
exec restoreDB;