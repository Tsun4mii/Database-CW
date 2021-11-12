use CW_DB

--User type
insert into USER_TYPE(userType) values ('Default'),
										('VIP')
select * from USER_TYPE


insert into PRODUCTS(prodCode, prodName, typeProdId, prodPrice, prodStock) values
('SDG123DSG46F', '2JZ GTE', 25, 1000, 2);

select PRODUCTS.prodCode, PRODUCTS.prodName, PRODUCTS.prodPrice, PRODUCTS.prodStock, PRODUCT_TYPE.prodType 
from PRODUCTS join PRODUCT_TYPE on PRODUCTS.typeProdId = PRODUCT_TYPE.id