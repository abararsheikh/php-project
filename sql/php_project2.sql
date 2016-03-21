-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2016 at 04:00 AM
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

DROP TABLE IF EXISTS `cinemas`;
CREATE TABLE `cinemas` (
  `Cinema_ID` int(11) NOT NULL,
  `Cinema_Name` varchar(255) NOT NULL,
  `Cinema_Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`Cinema_ID`, `Cinema_Name`, `Cinema_Address`) VALUES
(1, 'Cinema1', '110 Courtneypark Dr E, Mississauga, ON, L5T 2Y3'),
(2, 'Cinema2', 'Yorkdale Shopping Centre, 3401 Dufferin Street , c/o Yorkdale Shopping Centre, Toronto, ON, M6A 2T9');

-- --------------------------------------------------------

--
-- Table structure for table `design`
--

DROP TABLE IF EXISTS `design`;
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

DROP TABLE IF EXISTS `films`;
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
  `Avaliable` char(1) DEFAULT 'Y',
  `film_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `films`
--

INSERT INTO `films` (`Film_Id`, `Film_Time`, `Film_Name`, `Film_Director`, `Film_Actor`, `Film_Intro`, `Film_pic`, `Film_length`, `Price_Full`, `Avaliable`, `film_description`) VALUES
(1, '2016-02-12', 'Deadpool', 'Tim Miller', 'Ryan Reynolds', 'Deadpool.txt', 'image/deadpool.jpg', '1h 48m', 14, 'Y', 'film1'),
(2, '2016-01-29', 'Kung Fu Panda 3', 'Jennifer Yuh Nelson', 'Jack Black', 'Kungfupanada.txt', 'image/kongfupanda.jpg', '1h 35m', 15, 'Y', 'film2'),
(3, '2015-09-05', 'Steve Jobs', 'Danny Boyle', 'Michael Fassbender', 'SteveJobs.txt', 'image/stevejobs.jpg', '2h 02m', 20, 'Y', 'film3'),
(4, '2015-12-18', 'Star Wars:The Force Awakens', 'J.J. Abrams', 'Daisy Ridley', 'StarWars.txt', 'image/starwar.jpg', '2h 16m', 20, 'Y', 'film4'),
(5, '2016-01-08', 'The Revenant', 'Alejandro González Iñárritu', 'Leonordo DiCaprio', 'TheRevenant.txt', 'image/TheRevenant.jpg', '2h 36m', 15, 'Y', 'film5');

-- --------------------------------------------------------

--
-- Table structure for table `logo`
--

DROP TABLE IF EXISTS `logo`;
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

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `Order_Id` int(11) NOT NULL,
  `Design_Id` int(11) NOT NULL,
  `Order_DATE` date DEFAULT NULL,
  `Payment_method` varchar(50) DEFAULT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `Total_Price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `Reservation_Id` int(11) NOT NULL,
  `Running_films` varchar(255) NOT NULL,
  `Cinema_Name` varchar(255) NOT NULL,
  `Cinema_Address` varchar(255) NOT NULL,
  `Run_Time` datetime NOT NULL,
  `Room_Name` varchar(255) NOT NULL,
  `Room_id` int(11) NOT NULL,
  `Seats_Numbers` varchar(255) NOT NULL,
  `Order_Id` int(11) NOT NULL,
  `Price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
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

DROP TABLE IF EXISTS `running_films`;
CREATE TABLE `running_films` (
  `Room_ID` int(11) NOT NULL,
  `Run_Time` datetime NOT NULL,
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
(1, '2016-02-22 09:30:00', 2, '2016-02-11', '2016-02-18', '2016-02-22', 'Y', 1),
(1, '2016-04-30 09:30:00', 1, '2016-02-03', '2016-03-10', '2016-04-30', 'Y', 2),
(2, '2016-04-30 09:30:00', 3, '2016-02-03', '2016-02-10', '2016-02-20', 'Y', 3),
(1, '2016-04-30 13:30:00', 1, '2016-02-01', '2016-02-01', '2016-02-11', 'Y', 4),
(1, '2016-04-30 19:35:00', 1, '2016-02-01', '2016-02-09', '2016-02-02', 'Y', 7),
(2, '2016-04-30 13:30:00', 3, '2016-03-10', '2016-02-09', '2016-04-30', 'Y', 8),
(2, '2016-04-30 19:30:00', 3, '2016-04-11', '2016-04-14', '2016-04-30', 'Y', 10),
(3, '2016-04-30 09:30:00', 4, '2016-04-30', '2016-03-25', '2016-04-30', 'Y', 11),
(3, '2016-04-30 13:30:00', 4, '2016-03-10', '2016-03-24', '2016-04-30', 'Y', 12),
(3, '2016-04-30 19:30:00', 4, '2016-04-22', '2016-04-22', '2016-04-30', 'Y', 13),
(4, '2016-04-30 09:00:00', 5, '2016-03-24', '2016-04-30', '2016-04-30', 'Y', 14),
(4, '2016-04-30 15:30:00', 5, '2016-04-30', '2016-04-30', '2016-04-30', 'Y', 15),
(4, '2016-04-30 19:30:00', 5, '2016-03-31', '2016-04-24', '2016-04-30', 'Y', 16),
(1, '2016-04-22 12:30:00', 3, '2016-04-22', '2016-04-28', '2016-04-22', 'Y', 17),
(1, '2016-04-22 09:30:00', 3, '2016-04-20', '2016-04-22', '2016-04-22', 'Y', 18),
(3, '2016-04-22 09:30:00', 4, '2016-04-10', '2016-04-20', '2016-04-22', 'Y', 19),
(3, '2016-04-22 13:30:00', 4, '2016-04-15', '2016-04-22', '2016-04-22', 'Y', 20),
(3, '2016-04-29 09:30:00', 3, '2016-03-19', '2016-04-15', '2016-04-29', 'Y', 24),
(3, '2016-04-29 13:30:00', 3, '2016-04-14', '2016-03-22', '2016-04-29', 'Y', 25);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
CREATE TABLE `seats` (
  `Seat_ID` int(11) NOT NULL,
  `Room_ID` int(11) NOT NULL,
  `Seat_Name` varchar(255) DEFAULT NULL,
  `available` char(1) DEFAULT 'Y',
  `Run_Time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`Seat_ID`, `Room_ID`, `Seat_Name`, `available`, `Run_Time`) VALUES
(1, 1, 'A1', 'Y', '2016-04-30 09:30:00'),
(2, 1, 'A2', 'N', '2016-04-30 09:30:00'),
(3, 2, 'A1', 'Y', '2016-04-30 09:30:00'),
(4, 2, 'A2', 'Y', '2016-04-30 09:30:00'),
(5, 1, 'A3', 'Y', '2016-04-30 09:30:00'),
(6, 1, 'A4', 'N', '2016-04-30 09:30:00'),
(7, 1, 'A5', 'N', '2016-04-30 09:30:00'),
(8, 1, 'B1', 'Y', '2016-04-30 09:30:00'),
(9, 1, 'B2', 'N', '2016-04-30 09:30:00'),
(10, 1, 'B3', 'N', '2016-04-30 09:30:00'),
(11, 1, 'B4', 'Y', '2016-04-30 09:30:00'),
(12, 1, 'B5', 'Y', '2016-04-30 09:30:00'),
(13, 2, 'A5', 'Y', '2016-04-30 09:30:00'),
(14, 2, 'B1', 'Y', '2016-04-30 09:30:00'),
(15, 2, 'B2', 'Y', '2016-04-30 09:30:00'),
(16, 2, 'B3', 'Y', '2016-04-30 09:30:00'),
(17, 2, 'B4', 'N', '2016-04-30 09:30:00'),
(18, 2, 'A3', 'Y', '2016-04-30 09:30:00'),
(19, 2, 'A4', 'Y', '2016-04-30 09:30:00'),
(20, 2, 'B5', 'Y', '2016-04-30 09:30:00'),
(21, 3, 'A1', 'N', '2016-04-30 09:30:00'),
(22, 3, 'A2', 'N', '2016-04-30 09:30:00'),
(23, 3, 'A3', 'N', '2016-04-30 09:30:00'),
(24, 3, 'A4', 'N', '2016-04-30 09:30:00'),
(25, 3, 'A5', 'Y', '2016-04-30 09:30:00'),
(26, 3, 'B1', 'Y', '2016-04-30 09:30:00'),
(27, 3, 'B2', 'Y', '2016-04-30 09:30:00'),
(28, 3, 'B3', 'Y', '2016-04-30 09:30:00'),
(29, 3, 'B4', 'Y', '2016-04-30 09:30:00'),
(30, 3, 'B5', 'Y', '2016-04-30 09:30:00'),
(31, 4, 'A1', 'Y', '2016-04-30 09:00:00'),
(32, 4, 'A2', 'Y', '2016-04-30 09:00:00'),
(33, 4, 'A3', 'Y', '2016-04-30 09:00:00'),
(34, 4, 'A4', 'Y', '2016-04-30 09:00:00'),
(35, 4, 'A5', 'Y', '2016-04-30 09:00:00'),
(36, 4, 'B1', 'Y', '2016-04-30 09:00:00'),
(37, 4, 'B2', 'Y', '2016-04-30 09:00:00'),
(38, 4, 'B3', 'Y', '2016-04-30 09:00:00'),
(39, 4, 'B4', 'Y', '2016-04-30 09:00:00'),
(40, 4, 'B5', 'Y', '2016-04-30 09:00:00'),
(41, 1, 'A1', 'Y', '2016-02-22 09:30:00'),
(42, 1, 'A2', 'N', '2016-02-22 09:30:00'),
(43, 1, 'A3', 'N', '2016-02-22 09:30:00'),
(44, 1, 'A4', 'N', '2016-02-22 09:30:00'),
(45, 1, 'A5', 'N', '2016-02-22 09:30:00'),
(46, 1, 'B1', 'Y', '2016-02-22 09:30:00'),
(47, 1, 'B2', 'Y', '2016-02-22 09:30:00'),
(48, 1, 'B3', 'Y', '2016-02-22 09:30:00'),
(49, 1, 'B4', 'Y', '2016-02-22 09:30:00'),
(50, 1, 'B5', 'Y', '2016-02-22 09:30:00'),
(51, 1, 'A1', 'N', '2016-04-30 13:30:00'),
(52, 1, 'A2', 'N', '2016-04-30 13:30:00'),
(53, 1, 'A3', 'Y', '2016-04-30 13:30:00'),
(54, 1, 'A4', 'Y', '2016-04-30 13:30:00'),
(55, 1, 'A5', 'Y', '2016-04-30 13:30:00'),
(56, 1, 'B1', 'Y', '2016-04-30 13:30:00'),
(57, 1, 'B2', 'Y', '2016-04-30 13:30:00'),
(58, 1, 'B3', 'Y', '2016-04-30 13:30:00'),
(59, 1, 'B4', 'Y', '2016-04-30 13:30:00'),
(60, 1, 'B5', 'Y', '2016-04-30 13:30:00'),
(61, 1, 'A1', 'Y', '2016-04-30 19:35:00'),
(62, 1, 'A2', 'Y', '2016-04-30 19:35:00'),
(63, 1, 'A3', 'Y', '2016-04-30 19:35:00'),
(64, 1, 'A4', 'Y', '2016-04-30 19:35:00'),
(65, 1, 'A5', 'Y', '2016-04-30 19:35:00'),
(66, 1, 'B1', 'Y', '2016-04-30 19:35:00'),
(67, 1, 'B2', 'Y', '2016-04-30 19:35:00'),
(68, 1, 'B3', 'Y', '2016-04-30 19:35:00'),
(69, 1, 'B4', 'Y', '2016-04-30 19:35:00'),
(70, 1, 'B5', 'Y', '2016-04-30 19:35:00'),
(71, 1, 'A1', 'Y', '2016-04-22 12:30:00'),
(72, 1, 'A2', 'Y', '2016-04-22 12:30:00'),
(73, 1, 'A3', 'N', '2016-04-22 12:30:00'),
(74, 1, 'A4', 'N', '2016-04-22 12:30:00'),
(75, 1, 'A5', 'N', '2016-04-22 12:30:00'),
(76, 1, 'B1', 'Y', '2016-04-22 12:30:00'),
(77, 1, 'B2', 'Y', '2016-04-22 12:30:00'),
(78, 1, 'B3', 'Y', '2016-04-22 12:30:00'),
(79, 1, 'B4', 'Y', '2016-04-22 12:30:00'),
(80, 1, 'B5', 'Y', '2016-04-22 12:30:00'),
(81, 1, 'A1', 'Y', '2016-04-22 09:30:00'),
(82, 1, 'A2', 'N', '2016-04-22 09:30:00'),
(83, 1, 'A3', 'N', '2016-04-22 09:30:00'),
(84, 1, 'A4', 'Y', '2016-04-22 09:30:00'),
(85, 1, 'A5', 'Y', '2016-04-22 09:30:00'),
(86, 1, 'B1', 'Y', '2016-04-22 09:30:00'),
(87, 1, 'B2', 'Y', '2016-04-22 09:30:00'),
(88, 1, 'B3', 'Y', '2016-04-22 09:30:00'),
(89, 1, 'B4', 'N', '2016-04-22 09:30:00'),
(90, 1, 'B5', 'Y', '2016-04-22 09:30:00'),
(91, 2, 'A1', 'Y', '2016-04-30 13:30:00'),
(92, 2, 'A2', 'Y', '2016-04-30 13:30:00'),
(93, 2, 'A3', 'Y', '2016-04-30 13:30:00'),
(94, 2, 'A4', 'Y', '2016-04-30 13:30:00'),
(95, 2, 'A5', 'Y', '2016-04-30 13:30:00'),
(96, 2, 'B1', 'Y', '2016-04-30 13:30:00'),
(97, 2, 'B2', 'Y', '2016-04-30 13:30:00'),
(98, 2, 'B3', 'Y', '2016-04-30 13:30:00'),
(99, 2, 'B4', 'Y', '2016-04-30 13:30:00'),
(100, 2, 'B5', 'Y', '2016-04-30 13:30:00'),
(101, 2, 'A1', 'Y', '2016-04-30 19:30:00'),
(102, 2, 'A2', 'Y', '2016-04-30 19:30:00'),
(103, 2, 'A3', 'Y', '2016-04-30 19:30:00'),
(104, 2, 'A4', 'Y', '2016-04-30 19:30:00'),
(105, 2, 'A5', 'Y', '2016-04-30 19:30:00'),
(106, 2, 'B1', 'Y', '2016-04-30 19:30:00'),
(107, 2, 'B2', 'Y', '2016-04-30 19:30:00'),
(108, 2, 'B3', 'Y', '2016-04-30 19:30:00'),
(109, 2, 'B4', 'Y', '2016-04-30 19:30:00'),
(110, 2, 'B5', 'Y', '2016-04-30 19:30:00'),
(111, 3, 'A1', 'Y', '2016-04-30 13:30:00'),
(112, 3, 'A2', 'Y', '2016-04-30 13:30:00'),
(113, 3, 'A3', 'Y', '2016-04-30 13:30:00'),
(114, 3, 'A4', 'Y', '2016-04-30 13:30:00'),
(115, 3, 'A5', 'Y', '2016-04-30 13:30:00'),
(116, 3, 'B1', 'Y', '2016-04-30 13:30:00'),
(117, 3, 'B2', 'Y', '2016-04-30 13:30:00'),
(118, 3, 'B3', 'Y', '2016-04-30 13:30:00'),
(119, 3, 'B4', 'Y', '2016-04-30 13:30:00'),
(120, 3, 'B5', 'Y', '2016-04-30 13:30:00'),
(121, 3, 'A1', 'Y', '2016-04-30 19:30:00'),
(122, 3, 'A2', 'Y', '2016-04-30 19:30:00'),
(123, 3, 'A3', 'Y', '2016-04-30 19:30:00'),
(124, 3, 'A4', 'Y', '2016-04-30 19:30:00'),
(125, 3, 'A5', 'Y', '2016-04-30 19:30:00'),
(126, 3, 'B1', 'Y', '2016-04-30 19:30:00'),
(127, 3, 'B2', 'Y', '2016-04-30 19:30:00'),
(128, 3, 'B3', 'Y', '2016-04-30 19:30:00'),
(129, 3, 'B4', 'Y', '2016-04-30 19:30:00'),
(130, 3, 'B5', 'Y', '2016-04-30 19:30:00'),
(131, 3, 'A1', 'Y', '2016-04-22 09:30:00'),
(132, 3, 'A2', 'Y', '2016-04-22 09:30:00'),
(133, 3, 'A3', 'Y', '2016-04-22 09:30:00'),
(134, 3, 'A4', 'Y', '2016-04-22 09:30:00'),
(135, 3, 'A5', 'Y', '2016-04-22 09:30:00'),
(136, 3, 'B1', 'Y', '2016-04-22 09:30:00'),
(137, 3, 'B2', 'Y', '2016-04-22 09:30:00'),
(138, 3, 'B3', 'Y', '2016-04-22 09:30:00'),
(139, 3, 'B4', 'Y', '2016-04-22 09:30:00'),
(140, 3, 'B5', 'Y', '2016-04-22 09:30:00'),
(141, 3, 'A1', 'Y', '2016-04-22 13:30:00'),
(142, 3, 'A2', 'Y', '2016-04-22 13:30:00'),
(143, 3, 'A3', 'Y', '2016-04-22 13:30:00'),
(144, 3, 'A4', 'Y', '2016-04-22 13:30:00'),
(145, 3, 'A5', 'Y', '2016-04-22 13:30:00'),
(146, 3, 'B1', 'Y', '2016-04-22 13:30:00'),
(147, 3, 'B2', 'Y', '2016-04-22 13:30:00'),
(148, 3, 'B3', 'Y', '2016-04-22 13:30:00'),
(149, 3, 'B4', 'Y', '2016-04-22 13:30:00'),
(150, 3, 'B5', 'Y', '2016-04-22 13:30:00'),
(151, 3, 'A1', 'Y', '2016-04-29 09:30:00'),
(152, 3, 'A2', 'Y', '2016-04-29 09:30:00'),
(153, 3, 'A3', 'Y', '2016-04-29 09:30:00'),
(154, 3, 'A4', 'Y', '2016-04-29 09:30:00'),
(155, 3, 'A5', 'Y', '2016-04-29 09:30:00'),
(156, 3, 'B1', 'Y', '2016-04-29 09:30:00'),
(157, 3, 'B2', 'Y', '2016-04-29 09:30:00'),
(158, 3, 'B3', 'Y', '2016-04-29 09:30:00'),
(159, 3, 'B4', 'Y', '2016-04-29 09:30:00'),
(160, 3, 'B5', 'Y', '2016-04-29 09:30:00'),
(161, 3, 'A1', 'Y', '2016-04-29 13:30:00'),
(162, 3, 'A2', 'Y', '2016-04-29 13:30:00'),
(163, 3, 'A3', 'Y', '2016-04-29 13:30:00'),
(164, 3, 'A4', 'Y', '2016-04-29 13:30:00'),
(165, 3, 'A5', 'Y', '2016-04-29 13:30:00'),
(166, 3, 'B1', 'Y', '2016-04-29 13:30:00'),
(167, 3, 'B2', 'Y', '2016-04-29 13:30:00'),
(168, 3, 'B3', 'Y', '2016-04-29 13:30:00'),
(169, 3, 'B4', 'Y', '2016-04-29 13:30:00'),
(170, 3, 'B5', 'Y', '2016-04-29 13:30:00'),
(171, 4, 'A1', 'Y', '2016-04-30 15:30:00'),
(172, 4, 'A2', 'Y', '2016-04-30 15:30:00'),
(173, 4, 'A3', 'Y', '2016-04-30 15:30:00'),
(174, 4, 'A4', 'Y', '2016-04-30 15:30:00'),
(175, 4, 'A5', 'Y', '2016-04-30 15:30:00'),
(176, 4, 'B1', 'Y', '2016-04-30 15:30:00'),
(177, 4, 'B2', 'Y', '2016-04-30 15:30:00'),
(178, 4, 'B3', 'Y', '2016-04-30 15:30:00'),
(179, 4, 'B4', 'Y', '2016-04-30 15:30:00'),
(180, 4, 'B5', 'Y', '2016-04-30 15:30:00'),
(181, 4, 'A1', 'Y', '2016-04-30 19:30:00'),
(182, 4, 'A2', 'Y', '2016-04-30 19:30:00'),
(183, 4, 'A3', 'Y', '2016-04-30 19:30:00'),
(184, 4, 'A4', 'Y', '2016-04-30 19:30:00'),
(185, 4, 'A5', 'Y', '2016-04-30 19:30:00'),
(186, 4, 'B1', 'Y', '2016-04-30 19:30:00'),
(187, 4, 'B2', 'Y', '2016-04-30 19:30:00'),
(188, 4, 'B3', 'Y', '2016-04-30 19:30:00'),
(189, 4, 'B4', 'Y', '2016-04-30 19:30:00'),
(190, 4, 'B5', 'Y', '2016-04-30 19:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `user_id`, `token`) VALUES
('070d6be12c0fdd10447bd1d665db0b158459f91b2b704c2ba5f5095131baeeb9', 3, '$2y$10$8rzSfISQtkdKNx24G3ApcuUzrIk7oQL0gN4vG9kKQ2j3yRonEWRSG'),
('13305841e59c62b862dcd2535663b463e621f8852abc72f8fdc245269c6cea11', 7, '$2y$10$8F9G4AjvkVGV7dZSzOv9Ou1uLBkdRdUFAmDQZmu0SSMEjEjr20r6a'),
('2884930a1edab39c0481b7c17a3ac52e156b3fc2b809500a293c51a9e3d7b413', 3, '$2y$10$OKcZDGrzO/8.IP4N0b27Ae34jk2Wer3C4DDNhWoY36DQY9cSJe.w2'),
('2b27ddcb2dcba5a50e0a97f044f2db8896a9a7adf87d69a954628a12bc03f305', 3, '$2y$10$Uc6gZvDriItM1F2nHPn.xuLQBPQKIOYGYjHXWhKc9VVjXRt2ZDEpq'),
('30895ddf93f267f4f3a5ff4ce3c70497c3016ecc257e2635109f93f5c89e72ba', 3, '$2y$10$vVOFBaiVV3OlHH8vuAYyUe0KyOwP/rK9m3vluGi8KltlacQ/cHuby'),
('38d6b1f498c76716a07a432e9827abb0b4d14882068f50d9997fc107529d4573', 7, '$2y$10$VbPXpn0nbsGEDQcXOBow1.qL/K/zBtFItI6FZXFrUHYqrdY2ce24i'),
('43e89721678940770a55a46c7661b3c6981b9d06f533aa725dc5611cd33b0a67', 3, '$2y$10$.LBFmMufQfU5ecXxyLrpeOkYwQrv2gwqczGFMe/OZVSuDAbIyUi/q'),
('48cdfa53febb3b056e98b454f08882d19f4ce860f611bd036dfcdeca26aa2e18', 3, '$2y$10$Gv6b6WG//xMrpwppNB8hU.7CAsD5zFNHjmbcLvAsr9HnlamoVRMAy'),
('4a3479a7ef40d860afbcf3a8942e4b63b3e5551bee22d24da840005108d869f8', 3, '$2y$10$saARAf3.bAd1orF9URaZQuTHU7x.ZQgd.rKJo8Ka0ENrfyNNb0jgu'),
('5865f178f04db64fc6d5b50bce1a2ebbdb8ffdd2d9c77e1029a9fec5453bca01', 3, '$2y$10$5u0S5saCHf8nCqYy5DHeP.77.4K15NDew6urVkK19bVHjf5y.ReA6'),
('5e8eee96f286e76150e619ddac5247d5b8481988eeed32c0b4b6a7095caa3a4b', 3, '$2y$10$APRuHHAp/IuOqPDiVXOogOa08mUoTYu.eJeduAGFuXHspFLgwKO5G'),
('659c9888dd8104398434cdd72dc45cc6d398990019d27de06e249fa66d0e6db2', 3, '$2y$10$x/GPTq3v6VvboJM1cXbFHO0b3i15tXZWzxeElIJQ.2o.RV4XYffHm'),
('6ebfb1305fd9eab85a1a89829109d19cb563a6442c080bce3f550bdba0a830b8', 3, '$2y$10$0uWBtQTe3kokXA5hvjFXkuYGw.z02p5j1nFMuwpF256HNkjFIFp.m'),
('73b8e4ea62da09536011025c3a62ba68971fb4eef0ff00bd292c1610d7273fd3', 7, '$2y$10$fN0xmXC3y3BH3spkBs7klu1EPAdiMdHidTPWGnThCUAS4izs2aWsW'),
('af081e7f767d3037c9d48d165bc0c5b942b484b1f352ead3673650a9059f6367', 3, '$2y$10$qKw/lqZR7jZvKB7edr.WzuJYukf7QLpSaXhvh7ufCKM6gbuSovxbi'),
('be23428c8d172c92bc5ae7999243b48b1618df308e34a2adc26363e85d9ba1a4', 3, '$2y$10$9pXlzTJp5LdldaciCTJ87uqZ.jsl8QgOfwvPKarg0EGIXCal/QXG6'),
('c7e77c02c704f95be09d416dacde60c373c42d741d06541cb42221c7c0f42408', 3, '$2y$10$zjVQcif26SFxW43ucEhMnu3GB6R7b5K/PKx4N3AlGqhYMyhYcuwXK'),
('c99a9fffb353474a94e923250dab815d480b7a8aa1255e6bc0723c64941c8992', 3, '$2y$10$3LbdNPzi2MlT9zYnL2pdp.wUIMu2DA.4FxehWh21hRVp3GVHRm/va'),
('cb17a17e58ffe875a4cdc5cf0ededbbd3767bad870d854c2885766f7b8e3979c', 3, '$2y$10$KTYTyCh6TNLDnopS9RjeFOGe4hNlXLSnNfQIg3r0O11fklbmDzfTe'),
('cd9a57644b4d9bdd95b6000cce58b15e78ca133989dfe72397285b2eda363776', 3, '$2y$10$fQQxarksO5KzRWepnYLone2yuYxrA3SXEvtlPS0vgbT9svyJsCz.O'),
('d4928454cd11c2a4fdb13cea394fb0247f0153859f7f68ee1dc1c3e63a023063', 7, '$2y$10$WHUHGSCJ72v/1tiJjUKlWuSk/3QRR.ET7xIqLRft1gtI.UvsUKFsi'),
('e21c2ead7bd569bb2139793fa0dcf2c91bb23d7776f117ca2e97ae938f928192', 3, '$2y$10$QZU/xMvczPxFPhOETLrGSeLibidZTEAeojyWIf46nZ5SWekbAUwCW'),
('e421621712f5634fa6919d3b5fe0bbd154bd0f8ce6643387db0a7adb250ce3be', 3, '$2y$10$7LaDk7tCByk8vCYtOM7dYe.7o3pk/zuYgxtNfs9zSFLfEjfxcnrQy'),
('fe4e7d87cfa46714e77d66a78432f235e9506dc215ec9c6a47fc05cfb27b376b', 3, '$2y$10$sIxcIXTYojZwZhXlzLy.1.h.0a3T5avK.cZTUOtHTy5n61OCkDpCW'),
('ff6ec307a51edc663b10711eba73da098c2cde5017130202034d9c58cb510ac2', 3, '$2y$10$kzmTqqi5t6rb/M5OVSEuiOXqDJQweKxfrdRlZ9J6rsJVuk5Fw9s0u');

-- --------------------------------------------------------

--
-- Table structure for table `tshirt`
--

DROP TABLE IF EXISTS `tshirt`;
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

DROP TABLE IF EXISTS `users`;
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
  ADD PRIMARY KEY (`Reservation_Id`),
  ADD KEY `reservations_ibfk_2` (`Order_Id`);

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
  ADD UNIQUE KEY `uc_seat` (`Room_ID`,`Seat_Name`,`Run_Time`);

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
  MODIFY `Order_Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `Reservation_Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `Room_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `running_films`
--
ALTER TABLE `running_films`
  MODIFY `running_films_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `Seat_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;
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
  ADD CONSTRAINT `fk_orders` FOREIGN KEY (`Order_Id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Design_Id`) REFERENCES `design` (`Design_Id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`Customer_Id`) REFERENCES `customer` (`Customer_Id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
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
