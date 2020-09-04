CREATE TABLE `Subscription` (
  `User_Id` int,
  `Channel_Id` int,
  KEY `PK, FK` (`User_Id`, `Channel_Id`)
);

CREATE TABLE `Channel` (
  `Channel_Id` int,
  `Channel_Name` varchar(255),
  `Channel_URL` varchar(1000),
  `default_img_URL` varchar(255),
  `medium_img_URL` varchar(255),
  `high_img_URL` varchar(255),
  `Channel_Description` varchar(1000),
  `Total_Videos` int,
  PRIMARY KEY (`Channel_Id`)
);

CREATE TABLE `User` (
  `User_Id` int,
  `Email` varchar(255),
  `Name` varchar(255),
  PRIMARY KEY (`User_Id`)
);

CREATE TABLE `Category_Channel` (
  `Category_Id` int,
  `Channel_Id` int,
  KEY `PK, FK` (`Category_Id`, `Channel_Id`)
);

CREATE TABLE `Category` (
  `Category_Id` int,
  `User_Id` int,
  `Category_Name` varchar(255),
  PRIMARY KEY (`Category_Id`)
);

-- using mysql shell
-- source C:\nickb\Code Projects\JavaScript\Personal Projects\YouTube-Subscription-Organizer\database\schema.sql