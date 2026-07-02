CREATE DATABASE PhotoManagementSystem;
GO

USE PhotoManagementSystem;
GO

-- 1. Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FullName VARCHAR(100) ,
    Email VARCHAR(100) UNIQUE ,
    Password VARCHAR(100) 
);

-- 2. Albums Table
CREATE TABLE Albums (
    AlbumID INT PRIMARY KEY IDENTITY(1,1),
    AlbumName VARCHAR(100) ,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- 3. Photos Table
CREATE TABLE Photos (
    PhotoID INT PRIMARY KEY IDENTITY(1,1),
    PhotoName VARCHAR(100) ,
    PhotoPath VARCHAR(255),
    UploadDate DATE,
    AlbumID INT,
    FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID)
);

-- 4. Categories Table
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName VARCHAR(100) 
);




-- Users
INSERT INTO Users (FullName, Email, Password)
VALUES
('Canab Mukhtar', 'canab@gmail.com', '1234'),
('Ahmed Ali', 'ahmed@gmail.com', '1111'),
('Ayan Hassan', 'ayan@gmail.com', '2222'),
('Mohamed Noor', 'mohamed@gmail.com', '3333'),
('Fatima Omar', 'fatima@gmail.com', '4444');

-- Albums
INSERT INTO Albums (AlbumName, UserID)
VALUES
('Wedding Album', 1),
('Travel Album', 2),
('Family Album', 3),
('Nature Album', 4),
('Birthday Album', 5);

-- Photos
INSERT INTO Photos (PhotoName, PhotoPath, UploadDate, AlbumID)
VALUES
('Bride Photo', 'C:\Photos\bride.jpg', '2026-06-17', 1),
('Beach Photo', 'C:\Photos\beach.jpg', '2026-06-18', 2),
('Family Photo', 'C:\Photos\family.jpg', '2026-06-19', 3),
('Forest Photo', 'C:\Photos\forest.jpg', '2026-06-20', 4),
('Cake Photo', 'C:\Photos\cake.jpg', '2026-06-21', 5);

-- Categories
INSERT INTO Categories (CategoryName)
VALUES
('Wedding'),
('Travel'),
('Family'),
('Nature'),
('Birthday');

--







select * from Users;

select * from Categories;
select * from  Photos ;
select * from Albums;




