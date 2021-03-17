-- CREATE TABLE address_book (
--     sid INT IDENTITY PRIMARY KEY,
--     name NVARCHAR(100),
--     email NVARCHAR(100),
--     mobile NVARCHAR(100),
--     birthday DATE,
--     address NVARCHAR(100),
--     created_at DATETIME)

-- 建立資料表
CREATE TABLE address_book ( sid INT IDENTITY PRIMARY KEY, name NVARCHAR(100), email NVARCHAR(100), mobile NVARCHAR(100), birthday DATE, address NVARCHAR(100), created_at DATETIME);


-- 新增資料
INSERT INTO address_book (name, email, mobile, birthday, address, created_at) VALUES (N'李小明', 'ming01@gmail.com', '0918555666', '1995-10-02', N'台南市', GETDATE()), (N'李小明2', 'ming02@gmail.com', '0918555777', '1996-10-03', N'台北市', GETDATE()), (N'李小明3', 'ming03@gmail.com', '0918555888', '1997-10-04', N'台中市', GETDATE());


-- 查看資料庫裡的資料表
Select Table_name as "Table name" From Information_schema.Tables Where Table_type = 'BASE TABLE' and Objectproperty (Object_id(Table_name), 'IsMsShipped') = 0;


