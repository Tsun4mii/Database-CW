Insert into DEPARTMENTS(depart)
	values('Tires'),
	      ('Tools'),
		  ('Autochemistry'),
		  ('Oils'),
		  ('Batteries'),
		  ('Paints'),
		  ('Electronic'),
		  ('Engines'),
		  ('Engine parts'),
		  ('Body parts'),
		  ('Acoustics'),
		  ('Optics');


Insert into PRODUCT_TYPE(prodType, idDep)
	values('Winter Tires', (select id from DEPARTMENTS where Depart = 'Tires')),
		  ('Summer Tires', (select id from DEPARTMENTS where Depart = 'Tires')),
		  ('Tool kits', (select id from DEPARTMENTS where Depart = 'Tools')),
		  ('Electric tools', (select id from DEPARTMENTS where Depart = 'Tools')),
		  ('Pneumatics tools', (select id from DEPARTMENTS where Depart = 'Tools')),
		  ('Lighting equipment', (select id from DEPARTMENTS where Depart = 'Tools')),
		  ('Lead-acid battery', (select id from DEPARTMENTS where Depart = 'Batteries')),
		  ('Lithium-ion battery', (select id from DEPARTMENTS where Depart = 'Batteries')),
		  ('Alkaline battery', (select id from DEPARTMENTS where Depart = 'Batteries')),
		  ('Additives', (select id from DEPARTMENTS where Depart = 'Autochemistry')),
		  ('Winter auto chemicals', (select id from DEPARTMENTS where Depart = 'Autochemistry')),
		  ('For the salon', (select id from DEPARTMENTS where Depart = 'Autochemistry')),
		  ('For the body', (select id from DEPARTMENTS where Depart = 'Autochemistry')),
		  ('For the motor', (select id from DEPARTMENTS where Depart = 'Autochemistry')),
		  ('For disks', (select id from DEPARTMENTS where Depart = 'Autochemistry')),
		  ('For glasses', (select id from DEPARTMENTS where Depart = 'Autochemistry')),
		  ('Corrosion protection products', (select id from DEPARTMENTS where Depart = 'Autochemistry')),
		  ('Engine oil', (select id from DEPARTMENTS where Depart = 'Oils')),
		  ('Brake fluid', (select id from DEPARTMENTS where Depart = 'Oils')),
		  ('Antifreeze', (select id from DEPARTMENTS where Depart = 'Oils')),
		  ('Oils for air conditioners', (select id from DEPARTMENTS where Depart = 'Oils')),
		  ('Automatic transmission oil', (select id from DEPARTMENTS where Depart = 'Oils')),
		  ('Oil for manual transmission', (select id from DEPARTMENTS where Depart = 'Oils')),
		  ('Autohydraulic fluid', (select id from DEPARTMENTS where Depart = 'Oils')),
		  ('Sports engines', (select id from DEPARTMENTS where Depart = 'Engines')),
		  ('Civil engines', (select id from DEPARTMENTS where Depart = 'Engines')),
		  ('Multimedia systems', (select id from DEPARTMENTS where Depart = 'Acoustics')),
		  ('Side speakers', (select id from DEPARTMENTS where Depart = 'Acoustics')),
		  ('Sound amplifiers', (select id from DEPARTMENTS where Depart = 'Acoustics')),
		  ('Subwoofers', (select id from DEPARTMENTS where Depart = 'Acoustics')),
		  ('Rear speakers', (select id from DEPARTMENTS where Depart = 'Acoustics')),
		  ('LED headlights', (select id from DEPARTMENTS where Depart = 'Optics')),
		  ('Xenon headlights', (select id from DEPARTMENTS where Depart = 'Optics')),
		  ('Hood', (select id from DEPARTMENTS where Depart = 'Alcohol')),
		  ('Doors', (select id from DEPARTMENTS where Depart = 'Electronic')),
		  ('Fuel systems', (select id from DEPARTMENTS where Depart = 'Electronic')),
		  ('Wing covers', (select id from DEPARTMENTS where Depart = 'Electronic')),
		  ('Front bumpers', (select id from DEPARTMENTS where Depart = 'Electronic')),
		  ('Rear bumpers', (select id from DEPARTMENTS where Depart = 'Electronic')),
		  ('Arches', (select id from DEPARTMENTS where Depart = 'Electronic')),
		  ('Thresholds', (select id from DEPARTMENTS where Depart = 'Electronic')),
		  ('Wings', (select id from DEPARTMENTS where Depart = 'Electronic'));



Insert into POSTS(post)
	values('Administrator'),
		  ('Cleaner'),
		  ('Salesman'),
		  ('Cashier'),
		  ('Assistanse'),
		  ('Adviser'),
		  ('Manager'),
		  ('Vice president'),
		  ('President'),
		  ('DB Admin');

Insert into ADMIN_TYPE(adminType)
	values('Main'),
		  ('Admin_St'),
		  ('Cashier');

insert into EMPLOYEES(firstName)
	values('Admin');

Insert into STORE_ADMIN(adminLogin, adminPassword, adminType, employeeId)
	values('Admin', 'Admin', 1, 1);