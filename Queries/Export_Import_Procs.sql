use CW_DB

--Export products proc
go 
create procedure ExProdToXml
as
begin
	select id, prodCode, prodName, typeProdId, prodPrice, prodStock from PRODUCTS
		for xml path('PRODUCT'), root('PRODUCTS');

	EXEC master.dbo.sp_configure 'show advanced options', 1
		reconfigure with override
	EXEC master .dbo.sp_configure 'xp_cmdshell', 1
		reconfigure with override;

	declare @fileName nvarchar(100)
	declare @sqlStr varchar(1000)
	declare @sqlCmd varchar(1000)
	
	set @fileName = 'E:\3rd-course\1st-sem\DB\CW\Backups\CW_DB-prod.xml';
	set @sqlStr = 'USE CW_DB; SELECT id, prodCode, prodName, typeProdId, prodPrice, prodStock from PRODUCTS FOR XML PATH(''PRODUCT''), ROOT(''PRODUCTS'') '
	set @sqlCmd = 'bcp.exe "' + @sqlStr + '" queryout ' + @fileName + ' -w -T'
	EXEC xp_cmdshell @sqlCmd;
end;

drop procedure ExProdToXml;

exec ExProdToXml

--Import product proc 
go
Create Procedure ImProdfromXml
AS
Begin
	INSERT INTO PRODUCTS (prodCode, prodName, typeProdId, prodPrice, prodStock)
	SELECT
	   MY_XML.PRODUCT.query('prodCode').value('.', 'NVARCHAR(12)'),
	   MY_XML.PRODUCT.query('prodName').value('.', 'NVARCHAR(30)'),
	   MY_XML.PRODUCT.query('typeProdId').value('.', 'INT'),
	   MY_XML.PRODUCT.query('prodPrice').value('.', 'numeric(8,2)'),
	   MY_XML.PRODUCT.query('prodStock').value('.', 'INT')

	FROM (SELECT CAST(MY_XML AS xml)
		  FROM OPENROWSET(BULK 'E:\3rd-course\1st-sem\DB\CW\Backups\Import.xml', SINGLE_BLOB) AS T(MY_XML)) AS T(MY_XML)
		  CROSS APPLY MY_XML.nodes('PRODUCTS/PRODUCT') AS MY_XML (PRODUCT);
End;

drop procedure ImProdfromXml;

Exec ImProdfromXml;

