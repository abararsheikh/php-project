-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2016 at 06:52 AM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `php_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `cinemas`
--

CREATE TABLE `cinemas` (
  `Cinema_ID` int(11) NOT NULL,
  `Cinema_Name` varchar(255) NOT NULL,
  `Cinema_Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`Cinema_ID`, `Cinema_Name`, `Cinema_Address`) VALUES
(1, 'Cinema_Name', 'Yorkdale Shopping Centre, 3401 Dufferin Street , c/o Yorkdale Shopping Centre, Toronto, ON, M6A 2T9'),
(2, 'Cinema2', 'Yorkdale Shopping Centre, 3401 Dufferin Street , c/o Yorkdale Shopping Centre, Toronto, ON, M6A 2T9');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Customer_Id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Customer_Id`, `username`, `password`) VALUES
(1, 'Alex', 'wangran');

-- --------------------------------------------------------

--
-- Table structure for table `design`
--

CREATE TABLE `design` (
  `Design_Id` int(11) NOT NULL,
  `Logo_Id` int(11) DEFAULT NULL,
  `Tshirt_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `design`
--

INSERT INTO `design` (`Design_Id`, `Logo_Id`, `Tshirt_Id`) VALUES
(2, 1, 2),
(3, 2, 3),
(4, 1, 2),
(5, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `films`
--

CREATE TABLE `films` (
  `Film_Id` int(11) NOT NULL,
  `Film_Time` date DEFAULT NULL,
  `Film_Name` varchar(50) DEFAULT NULL,
  `Film_Director` varchar(50) DEFAULT NULL,
  `Film_Actor` varchar(50) DEFAULT NULL,
  `Film_Intro` varchar(50) DEFAULT NULL,
  `Film_pic` varchar(50) DEFAULT NULL,
  `Film_length` varchar(50) DEFAULT NULL,
  `Price_Full` float DEFAULT NULL,
  `Avaliable` char(1) DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `films`
--

INSERT INTO `films` (`Film_Id`, `Film_Time`, `Film_Name`, `Film_Director`, `Film_Actor`, `Film_Intro`, `Film_pic`, `Film_length`, `Price_Full`, `Avaliable`) VALUES
(1, '2016-02-12', 'Deadpool', 'Tim Miller', 'Ryan Reynolds', 'Deadpool.txt', 'image/deadpool.jpg', '1h 48m', 14, 'Y'),
(2, '2016-01-29', 'Kung Fu Panda 3', 'Jennifer Yuh Nelson', 'Jack Black', 'Kungfupanada.txt', 'image/kongfupanda.jpg', '1h 35m', 15, 'Y'),
(3, '2015-09-05', 'Steve Jobs', 'Danny Boyle', 'Michael Fassbender', 'SteveJobs.txt', 'image/stevejobs.jpg', '2h 02m', 20, 'Y'),
(4, '2015-12-18', 'Star Wars:The Force Awakens', 'J.J. Abrams', 'Daisy Ridley', 'StarWars.txt', 'image/starwar.jpg', '2h 16m', 20, 'Y'),
(5, '2016-01-08', 'The Revenant', 'Alejandro González Iñárritu', 'Leonordo DiCaprio', 'TheRevenant.txt', 'image/TheRevenant.jpg', '2h 36m', 15, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `logo`
--

CREATE TABLE `logo` (
  `Logo_Id` int(11) NOT NULL,
  `Logo_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logo`
--

INSERT INTO `logo` (`Logo_Id`, `Logo_image`) VALUES
(1, 'image\\logo\\logo1.png'),
(2, '\\image\\logo\\logo2.png'),
(3, '\\image\\logo\\logo3.jpg'),
(4, '\\image\\logo\\logo4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Order_Id` int(11) NOT NULL,
  `Design_Id` int(11) NOT NULL,
  `Order_DATE` date DEFAULT NULL,
  `Payment_method` varchar(50) DEFAULT NULL,
  `Customer_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Order_Id`, `Design_Id`, `Order_DATE`, `Payment_method`, `Customer_Id`) VALUES
(1, 2, '2016-02-02', 'VISA', 1),
(4, 3, '2016-02-03', 'VISA', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `Reservation_id` int(11) NOT NULL,
  `running_films_id` int(11) NOT NULL,
  `Seat_number` varchar(50) DEFAULT NULL,
  `RVET` date DEFAULT NULL,
  `Order_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`Reservation_id`, `running_films_id`, `Seat_number`, `RVET`, `Order_Id`) VALUES
(1, 1, 'A1', '2016-02-02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `Room_ID` int(11) NOT NULL,
  `Room_Name` varchar(255) NOT NULL,
  `Cinema_ID` int(11) NOT NULL,
  `available` char(1) DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`Room_ID`, `Room_Name`, `Cinema_ID`, `available`) VALUES
(1, 'ROOM1', 1, 'Y'),
(2, 'ROOM2', 1, 'Y'),
(3, 'ROOM1', 2, 'Y'),
(4, 'ROOM2', 2, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `running_films`
--

CREATE TABLE `running_films` (
  `Room_ID` int(11) NOT NULL,
  `Run_Time` date NOT NULL,
  `Film_Id` int(11) NOT NULL,
  `RVST` date NOT NULL,
  `RVET` date NOT NULL,
  `RUNATTIME` date DEFAULT NULL,
  `Avaliable` char(1) DEFAULT 'Y',
  `running_films_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `running_films`
--

INSERT INTO `running_films` (`Room_ID`, `Run_Time`, `Film_Id`, `RVST`, `RVET`, `RUNATTIME`, `Avaliable`, `running_films_id`) VALUES
(1, '2016-02-11', 2, '2016-02-11', '2016-02-18', '2016-02-22', 'Y', 1),
(1, '2016-02-18', 1, '2016-02-03', '2016-03-10', '2016-02-04', 'Y', 2),
(2, '2016-02-02', 1, '2016-02-03', '2016-02-10', '2016-02-20', 'Y', 3),
(1, '2016-02-01', 1, '2016-02-01', '2016-02-01', '2016-02-11', 'Y', 4),
(2, '2016-02-01', 1, '2016-02-01', '2016-02-09', '2016-02-02', 'Y', 7);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `Seat_ID` int(11) NOT NULL,
  `Room_ID` int(11) NOT NULL,
  `Seat_Name` varchar(255) DEFAULT NULL,
  `available` char(1) DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`Seat_ID`, `Room_ID`, `Seat_Name`, `available`) VALUES
(1, 1, 'A1', 'Y'),
(2, 1, 'A2', 'Y'),
(5, 2, 'A1', 'Y'),
(6, 2, 'A2', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tshirt`
--

CREATE TABLE `tshirt` (
  `Tshirt_id` int(11) NOT NULL,
  `Tshirt_color` varchar(50) DEFAULT NULL,
  `Tshirt_image` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tshirt`
--

INSERT INTO `tshirt` (`Tshirt_id`, `Tshirt_color`, `Tshirt_image`) VALUES
(2, 'green', 'image\\Tshirt\\Tshirt01.jpg'),
(3, 'white', 'image\\Tshirt\\Tshirt02.jpg'),
(4, 'Black', 'image\\Tshirt\\Tshirt03.jpg'),
(5, 'Orange', 'image\\Tshirt\\Tshirt04.jpg'),
(6, 'sky blue', 'image\\Tshirt\\Tshirt05.jpg'),
(7, 'dark blue', 'image\\Tshirt\\Tshirt06.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT '1',
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role_id`, `email`) VALUES
(1, 'test', 'test', 1, '123'),
(3, 'abc', '$2y$10$oNdeFwyBJdCsQy2e0LYfA.oVe5A65SUVeqPBGZlVqukH2AkgBgEdy', 1, '00'),
(7, '123', '$2y$10$UPpinyXaiv9ehh1uCq9peeGq5rQxUYRqv1K8lalsuMqeAZ9iBC00m', 1, '12'),
(133, '12345', '$2y$10$tl5rNBQ5eIk6rv6IoHGYqeNFHkqYS.nuyTYRqyA5tab.wV/7u370u', 1, '123456@12.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`Cinema_ID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Customer_Id`);

--
-- Indexes for table `design`
--
ALTER TABLE `design`
  ADD PRIMARY KEY (`Design_Id`),
  ADD KEY `Logo_Id` (`Logo_Id`),
  ADD KEY `Tshirt_Id` (`Tshirt_Id`);

--
-- Indexes for table `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`Film_Id`);

--
-- Indexes for table `logo`
--
ALTER TABLE `logo`
  ADD PRIMARY KEY (`Logo_Id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_Id`),
  ADD UNIQUE KEY `uc_Design` (`Design_Id`),
  ADD KEY `Customer_Id` (`Customer_Id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`Reservation_id`),
  ADD UNIQUE KEY `Seat_number` (`Seat_number`),
  ADD KEY `running_films_id` (`running_films_id`),
  ADD KEY `Order_Id` (`Order_Id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`Room_ID`),
  ADD UNIQUE KEY `Room_Name` (`Room_Name`,`Cinema_ID`),
  ADD KEY `Cinema_ID` (`Cinema_ID`);

--
-- Indexes for table `running_films`
--
ALTER TABLE `running_films`
  ADD PRIMARY KEY (`running_films_id`),
  ADD UNIQUE KEY `Room_ID` (`Room_ID`,`Run_Time`),
  ADD KEY `fk_films` (`Film_Id`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`Seat_ID`),
  ADD UNIQUE KEY `Room_ID` (`Room_ID`,`Seat_Name`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tshirt`
--
ALTER TABLE `tshirt`
  ADD PRIMARY KEY (`Tshirt_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `Cinema_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Customer_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `design`
--
ALTER TABLE `design`
  MODIFY `Design_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `films`
--
ALTER TABLE `films`
  MODIFY `Film_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `logo`
--
ALTER TABLE `logo`
  MODIFY `Logo_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `Reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `Room_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `running_films`
--
ALTER TABLE `running_films`
  MODIFY `running_films_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `Seat_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tshirt`
--
ALTER TABLE `tshirt`
  MODIFY `Tshirt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `design`
--
ALTER TABLE `design`
  ADD CONSTRAINT `design_ibfk_1` FOREIGN KEY (`Logo_Id`) REFERENCES `logo` (`Logo_Id`),
  ADD CONSTRAINT `design_ibfk_2` FOREIGN KEY (`Tshirt_Id`) REFERENCES `tshirt` (`Tshirt_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Design_Id`) REFERENCES `design` (`Design_Id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`Customer_Id`) REFERENCES `customer` (`Customer_Id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`running_films_id`) REFERENCES `running_films` (`running_films_id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`Order_Id`) REFERENCES `orders` (`Order_Id`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`Cinema_ID`) REFERENCES `cinemas` (`Cinema_ID`);

--
-- Constraints for table `running_films`
--
ALTER TABLE `running_films`
  ADD CONSTRAINT `fk_films` FOREIGN KEY (`Film_Id`) REFERENCES `films` (`Film_Id`),
  ADD CONSTRAINT `running_films_ibfk_1` FOREIGN KEY (`Room_ID`) REFERENCES `rooms` (`Room_ID`);

--
-- Constraints for table `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`Room_ID`) REFERENCES `rooms` (`Room_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
