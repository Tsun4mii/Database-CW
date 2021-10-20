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
	restore database CW_DB
	from disk = 'E:\3rd-course\1st-sem\DB\CW\Backups\CW_DB.bak' with replace;
end;
--drop procedure restoreDB;
