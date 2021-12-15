use CW_DB

-- auto name generation
go 
Create Procedure CreateName
	@size integer,
	@Name char(50) OUTPUT
AS
Begin
	SET @Name = (
	SELECT
		c1 AS [text()]
	FROM
		(
		SELECT TOP (@size) c1
		FROM
		  (
		VALUES
		  ('A'), ('B'), ('C'), ('D'), ('E'), ('F'), ('G'), ('H'), ('I'), ('J'),
		  ('K'), ('L'), ('M'), ('N'), ('O'), ('P'), ('Q'), ('R'), ('S'), ('T'),
		  ('U'), ('V'), ('W'), ('X'), ('Y'), ('Z'),('a'), ('b'), ('c'), ('d'), 
		  ('e'), ('f'), ('g'), ('h'), ('i'),('j'),
		  ('k'), ('l'), ('m'), ('n'), ('o'), ('p'), ('q'), ('r'), ('s'), ('t'),
		  ('u'), ('v'), ('w'), ('x'), ('y'), ('z')
		  ) AS T1(c1)
		ORDER BY ABS(CHECKSUM(NEWID()))
		) AS T2
	FOR XML PATH('')
	);
End;
drop procedure CreateName;

-- auto barcode generation
go
Create Procedure CreateBarcode
	@BarC char(13) OUTPUT
AS
Begin
	SET @BarC = (
	SELECT
		c1 AS [text()]
	FROM
		(
		SELECT TOP (13) c1
		FROM (VALUES ('0'), ('1'), ('2'), ('3'), ('4'), ('5'), ('6'), ('7'), ('8'), ('9'),
		('0'), ('1'), ('2'), ('3'), ('4'), ('5'), ('6'), ('7'), ('8'), ('9'), ('A'), ('B'), ('C'), ('D'), ('E'), ('F'), ('G'), ('H'), ('I'), ('J'),
		  ('K'), ('L'), ('M'), ('N'), ('O'), ('P'), ('Q'), ('R'), ('S'), ('T'),
		  ('U'), ('V'), ('W'), ('X'), ('Y'), ('Z')) AS T1(c1)
			ORDER BY ABS(CHECKSUM(NEWID()))
		) AS T2
	FOR XML PATH('')
	);
End;


go

declare @str char(13)
begin
	exec CreateName 13, @str OUTPUT;
	print @str;
end;

-- autogenerate 100 000 rows of suppliers
go
create procedure AGSuppliers
as 
begin 
	declare @name nvarchar(30),
			@address nvarchar(30),
			@number int;
	set @number = 1;
	while @number < 50000
		begin
			Exec CreateName 30, @name OUTPUT;
			Exec CreateName 30, @address OUTPUT;
			insert into SUPPLIERS(supName, supAddress) values(@name, @address);
			set @number = @number + 1;
		End;
End;
drop procedure AGSuppliers;
exec AGSuppliers;

select COUNT(*) from SUPPLIERS;

go 
create procedure AGProducts
as
begin 
	declare @barcode nvarchar(12),
			@prodname nvarchar(30),
			@price numeric(8,2),
			@number int;
	set @number = 1;
	while @number < 100000
		begin
			exec CreateBarcode @barcode OUTPUT;
			exec CreateName 30, @prodname OUTPUT;
			set @price = CAST(((ABS(CHECKSUM(NEWID()) % 600*100)+1*100)/100)as numeric(8,2))
			insert into PRODUCTS(prodCode,prodName,prodPrice,typeProdId,prodStock,supId)
			values(@barcode, @prodname, @price, FLOOR(RAND()*(42-10+1))+10,
			ABS(CHECKSUM(NEWID()) % 2000) + 100,ABS(CHECKSUM(NEWID()) % 2000) + 100)
			set @number = @number + 1;
		end;
end;
drop procedure AGProducts;
exec AGProducts;

delete from PRODUCTS where id between 7 and 15