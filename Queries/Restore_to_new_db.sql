restore filelistonly from disk = 'E:\3rd-course\1st-sem\DB\CW\Backups\CW_DB.bak'

create database CW_DB_TEST_BK;

drop database CW_DB_TEST_BK;

RESTORE DATABASE CW_DB_TEST_BK from disk = 'E:\3rd-course\1st-sem\DB\CW\Backups\CW_DB.bak'
	with move 'CW_DB' to 'E:\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\CW_DB_TEST_BK.mdf',
	move 'CW_DB_log' to 'E:\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\CW_DB_TEST_BK_log.ldf'

use master
go
create procedure RestoreNewInstance
				@name nvarchar(20)
as
begin
declare @main nvarchar(200) = 'E:\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\';
declare @mdf nvarchar(4) = '.mdf';
declare @ldf nvarchar(4) = '.ldf';
declare @mdfm nvarchar(200) = @main + @name + @mdf;
declare @ldfm nvarchar(200) = @main + @name + @ldf;
RESTORE DATABASE @name from disk = 'E:\3rd-course\1st-sem\DB\CW\Backups\CW_DB.bak'
	with replace, move 'CW_DB' to @mdfm,
	move 'CW_DB_log' to @ldfm
end;

drop procedure RestoreNewInstance ;

exec RestoreNewInstance 'CW_TEST';

drop database CW_TEST