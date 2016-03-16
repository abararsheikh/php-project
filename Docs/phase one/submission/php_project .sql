-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 05, 2016 at 05:26 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `php_project`
--
CREATE DATABASE IF NOT EXISTS `php_project` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `php_project`;

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `answer_id` int(11) NOT NULL DEFAULT '0',
  `question_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`answer_id`, `question_id`, `title`) VALUES
(1, 1, 'The file is in C:My Documents'),
(2, 1, '0'),
(3, 1, 'Forbidden'),
(4, 1, 'is case-sensitive'),
(5, 2, '0'),
(6, 2, '1'),
(7, 2, '3'),
(8, 2, '5'),
(9, 3, 'search_preg'),
(10, 3, 'match_preg'),
(11, 3, 'preg_match'),
(12, 3, 'preg_search'),
(13, 4, 'a random value between 0 and 1'),
(14, 4, 'a reference to the $coin variable'),
(15, 4, 'a value of either 0 or 1'),
(16, 4, 'a value of either “heads” or “tails”'),
(17, 5, 'NOT FOUND'),
(18, 5, 'unknown status'),
(19, 5, 'forbidden'),
(20, 5, 'ok'),
(21, 6, 'in case-sensitive'),
(22, 6, 'can start with a leter,a dight,or two underscores'),
(23, 6, 'can contain special characters'),
(24, 6, 'can be a PHP reserved word');

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
(1, 'Cinema_Name', 'Yorkdale Shopping Centre, 3401 Dufferin Street , c/o Yorkdale Shopping Centre, Toronto, ON, M6A 2T9'),
(2, 'Cinema2', 'Yorkdale Shopping Centre, 3401 Dufferin Street , c/o Yorkdale Shopping Centre, Toronto, ON, M6A 2T9');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

DROP TABLE IF EXISTS `contactus`;
CREATE TABLE `contactus` (
  `contact_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`contact_id`, `first_name`, `last_name`, `Email`, `Message`) VALUES
(1, 'abrar', 'sheikh', 'er.abrar@gmail.com', 'Hello'),
(2, 'navaz', 'sheikh', 'navaz@gmail.com', 'Hello world'),
(3, 'amrin', 'sheikh', 'amrin@gmail.com', 'Hello canada'),
(4, 'raj', 'raj', 'raj@gmail.com', 'Hello toroto');

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
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `username` varchar(50) NOT NULL,
  `sex` tinyint(1) NOT NULL,
  `mobile_tel` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `reply_content` text NOT NULL,
  `reply_time` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`username`, `sex`, `mobile_tel`, `email`, `address`, `content`, `reply_content`, `reply_time`, `create_time`, `update_time`, `id`, `title`) VALUES
('1', 0, '4172446525', '1', '123344556', 'hello,please phoneme', 'hello~~~I am waiting u', 0, 1, 0, 1, 'whyefffefre'),
('bin', 0, '1234456678', 'binhunmber@gmail.com', '18 ft mash1-2', 'Hello i want', 'I am good for this', 1, 1, 1, 123, 'IT'),
('bin', 1, '647346624', 'binhunmber@gmail.com', '18 ft mash1-2', 'I am very like cooking .i can do mu best,I have enough experience', 'I am very like cooking .I can do mu best,I have enough experience', 1, 1, 1, 124, 'cook');

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
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `Food_id` int(8) NOT NULL,
  `Food_Catagory` varchar(50) NOT NULL,
  `Food_Price` decimal(10,2) NOT NULL,
  `Food_Instock` int(8) NOT NULL,
  `Food_description` varchar(500) NOT NULL,
  `Food_mark` float NOT NULL,
  `Food_Name` varchar(50) NOT NULL,
  `Food_Image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`Food_id`, `Food_Catagory`, `Food_Price`, `Food_Instock`, `Food_description`, `Food_mark`, `Food_Name`, `Food_Image`) VALUES
(1, 'special', '1.00', 2, 'good food', 5, 'salmon', 'food1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `food_comment`
--

DROP TABLE IF EXISTS `food_comment`;
CREATE TABLE `food_comment` (
  `Comment_id` int(8) NOT NULL,
  `Food_id` int(8) NOT NULL,
  `User_id` int(8) NOT NULL,
  `Comment` varchar(500) NOT NULL,
  `Mark` float(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_comment`
--

INSERT INTO `food_comment` (`Comment_id`, `Food_id`, `User_id`, `Comment`, `Mark`) VALUES
(1, 1, 1, 'good', 5.00);

-- --------------------------------------------------------

--
-- Table structure for table `food_order`
--

DROP TABLE IF EXISTS `food_order`;
CREATE TABLE `food_order` (
  `Order_id` int(8) NOT NULL,
  `User_id` int(8) NOT NULL,
  `Order_time` date NOT NULL,
  `Cinema_id` int(8) NOT NULL,
  `Deliver_time` date NOT NULL,
  `Total_price` decimal(10,2) NOT NULL,
  `Phone_number` varchar(11) NOT NULL,
  `Email_address` varchar(50) NOT NULL,
  `Room_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_order`
--

INSERT INTO `food_order` (`Order_id`, `User_id`, `Order_time`, `Cinema_id`, `Deliver_time`, `Total_price`, `Phone_number`, `Email_address`, `Room_id`) VALUES
(1, 1, '2016-03-02', 1, '2016-03-03', '9.00', '6477725042', 'h8@fd5.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `food_order_item`
--

DROP TABLE IF EXISTS `food_order_item`;
CREATE TABLE `food_order_item` (
  `Order_item_id` int(8) NOT NULL,
  `Food_id` int(8) NOT NULL,
  `Order_id` int(8) NOT NULL,
  `Quantity` int(8) NOT NULL,
  `User_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_order_item`
--

INSERT INTO `food_order_item` (`Order_item_id`, `Food_id`, `Order_id`, `Quantity`, `User_id`) VALUES
(1, 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `food_test`
--

DROP TABLE IF EXISTS `food_test`;
CREATE TABLE `food_test` (
  `Test_id` int(8) NOT NULL,
  `Score` int(3) NOT NULL,
  `User_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_test`
--

INSERT INTO `food_test` (`Test_id`, `Score`, `User_id`) VALUES
(1, 60, 1);

-- --------------------------------------------------------

--
-- Table structure for table `food_test_question`
--

DROP TABLE IF EXISTS `food_test_question`;
CREATE TABLE `food_test_question` (
  `Question_id` int(11) NOT NULL,
  `Question` varchar(200) NOT NULL,
  `Option1` varchar(100) NOT NULL,
  `Option2` varchar(100) NOT NULL,
  `Option3` varchar(100) NOT NULL,
  `Option4` varchar(100) NOT NULL,
  `Answer` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_test_question`
--

INSERT INTO `food_test_question` (`Question_id`, `Question`, `Option1`, `Option2`, `Option3`, `Option4`, `Answer`) VALUES
(1, '1234567', 'A', 'B', 'C', 'D', 2);

-- --------------------------------------------------------

--
-- Table structure for table `food_user_recording`
--

DROP TABLE IF EXISTS `food_user_recording`;
CREATE TABLE `food_user_recording` (
  `Record_id` int(8) NOT NULL,
  `User_id` int(8) NOT NULL,
  `Total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_user_recording`
--

INSERT INTO `food_user_recording` (`Record_id`, `User_id`, `Total_amount`) VALUES
(1, 1, '80.00');

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
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `name` varchar(20) NOT NULL,
  `menu` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`name`, `menu`) VALUES
('testMenu', '[{"name":"Homepage","menu":[{"link":"/","name":"Home"},{"link":"/cinemas","name":"Cinemas"},{"link":"/movies","name":"Movies"},{"link":"/booking","name":"Booking"},{"link":"/career","name":"Career"}]}]');

-- --------------------------------------------------------

--
-- Table structure for table `moviefeature`
--

DROP TABLE IF EXISTS `moviefeature`;
CREATE TABLE `moviefeature` (
  `Id` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Language` text NOT NULL,
  `ReleaseDate` date NOT NULL,
  `Director` text NOT NULL,
  `Cast` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `moviefeature`
--

INSERT INTO `moviefeature` (`Id`, `Title`, `Language`, `ReleaseDate`, `Director`, `Cast`) VALUES
(1, 'NEERJA', 'Hindi', '2016-02-19', 'Ram Madhvani', 'Shekhar Ravijiani, Shabana Azmi, Sonam Kapoor'),
(2, 'LONDON HAS FALLEN', 'English', '2016-02-22', 'Babak Najafi', 'Gerard Butler, Morgan Freeman'),
(3, '(3D) ZOOTOPIA', 'English', '2016-03-04', 'Rich Moore', 'Ginnifer Goodwin, Idris Elba'),
(4, 'ZUBAAN', 'Hindi', '2016-03-04', 'Mozez Singh', 'Sarah Jane Dias, Vicky Kaushal, Manish Chaudhary'),
(5, 'THE SECRET SOLDIERS OF BENGHAZI', 'English', '2016-03-04', 'Michael Bay', 'John Krasinski, Max Martini, David Giuntoli');

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
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `answer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `title`, `answer_id`) VALUES
(1, 'What is stored in $message by the code that follows?', 1),
(2, 'How many times will the while loop that follows be executed?', 5),
(3, 'Which function searches for a regular expression in a string and returns 1 if the pattern is found?', 11),
(4, 'The function that follows returns\r\nfunction coin_toss() {if (mt_rand(0, 1) == 0) $coin = heads else $coin =  tails return $coin', 16),
(5, 'What does $message contain after the following code executes?', 11),
(6, 'A PHP variable name', 14);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `rating_id` int(11) NOT NULL,
  `rating_Name` varchar(50) NOT NULL,
  `rating_Total` int(11) NOT NULL,
  `rating_Votes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`rating_id`, `rating_Name`, `rating_Total`, `rating_Votes`) VALUES
(1, 'alex', 4, 2),
(2, 'Tom', 5, 1),
(3, 'mike', 6, 4),
(4, 'yi', 7, 4);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
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

DROP TABLE IF EXISTS `seats`;
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

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `items` text NOT NULL,
  `cost` double NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `items`, `cost`, `is_paid`, `time`) VALUES
(1, 1, '[{movie: {id: 1, amount: 3}, {id: 2, amount: 1}, food: {id: 2, amount: 2}}]', 20.34, 0, '2016-03-01 00:00:00');

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
(133, '12345', '$2y$10$tl5rNBQ5eIk6rv6IoHGYqeNFHkqYS.nuyTYRqyA5tab.wV/7u370u', 1, '123456@12.com'),
(136, '', '$2y$10$Zs..y22a1Dh5RwVG7IIpq.6LlXlnu.jmWHx6K388/r81YLtwuJioG', 1, ''),
(143, '123456', '$2y$10$4WtyJ74nKl80OLewL.hOpeLlofWcUUBBE/bZbwnN2xsIYBeNcbscG', 1, '12312@123.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL,
  `first_name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `last_name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(14) CHARACTER SET utf8 DEFAULT NULL,
  `street` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `city` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `province` varchar(30) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `first_name`, `last_name`, `phone`, `street`, `city`, `province`) VALUES
(1, 'Johanna', 'Steele', '(956) 434-2004', '153 Poplar Street', 'Inkerman', 'Puerto Rico'),
(2, 'Kathleen', 'Garner', '(814) 545-2100', '651 Kenmore Court', 'Kidder', 'Arizona'),
(3, 'Cannon', 'Stark', '(956) 439-2216', '941 Lexington Avenue', 'Bradenville', 'Virginia'),
(4, 'Serrano', 'Mcgowan', '(838) 458-3300', '64 Story Street', 'Maury', 'Palau'),
(5, 'Elizabeth', 'Forbes', '(993) 586-3522', '366 Glenmore Avenue', 'Hailesboro', 'Kentucky'),
(6, 'Anderson', 'Singleton', '(972) 403-3026', '705 Furman Street', 'Whitmer', 'California'),
(7, 'Barrera', 'Baker', '(955) 456-3360', '509 Livingston Street', 'Delshire', 'North Carolina'),
(8, 'Richmond', 'Farmer', '(968) 488-2915', '527 Greenpoint Avenue', 'Buxton', 'New York'),
(9, 'Campos', 'Lyons', '(837) 570-2856', '460 Stillwell Avenue', 'Goldfield', 'Vermont'),
(10, 'Sheppard', 'Alston', '(922) 479-3374', '824 Fenimore Street', 'Sabillasville', 'Ohio'),
(11, 'Deidre', 'Briggs', '(943) 476-2364', '451 Polar Street', 'Crown', 'Indiana'),
(12, 'Lynette', 'Hancock', '(903) 511-3905', '450 Sheffield Avenue', 'Bladensburg', 'Connecticut'),
(13, 'Roth', 'Alvarez', '(925) 534-2096', '389 Richards Street', 'Belmont', 'Michigan'),
(14, 'Perez', 'Boyd', '(880) 483-2697', '415 Hoyts Lane', 'Hickory', 'Hawaii'),
(15, 'Lela', 'Fletcher', '(940) 469-2261', '508 Royce Street', 'Caberfae', 'New Hampshire'),
(16, 'Meghan', 'Brewer', '(833) 482-2187', '185 Caton Avenue', 'Garnet', 'Minnesota'),
(17, 'Marcy', 'Logan', '(942) 421-3696', '479 Ralph Avenue', 'Florence', 'Virgin Islands'),
(18, 'Roach', 'Conner', '(829) 528-3685', '17 Stryker Court', 'Devon', 'South Carolina'),
(19, 'Hayden', 'Stanton', '(926) 555-3409', '270 Myrtle Avenue', 'Wawona', 'Rhode Island'),
(20, 'Harris', 'Malone', '(902) 543-3536', '590 Troy Avenue', 'Stevens', 'Alabama'),
(21, 'Lucy', 'Orr', '(800) 451-3618', '823 Colin Place', 'Chaparrito', 'Nevada'),
(22, 'Cochran', 'Morgan', '(855) 530-3221', '797 Caton Place', 'Kersey', 'New Jersey'),
(23, 'Montgomery', 'William', '(824) 482-3449', '799 Eldert Lane', 'Waikele', 'Iowa'),
(24, 'Brewer', 'Farrell', '(897) 490-2631', '632 Montague Street', 'Laurelton', 'Missouri'),
(25, 'Brigitte', 'Nichols', '(955) 539-3689', '395 Seaview Court', 'Datil', 'Illinois'),
(26, 'Myers', 'Soto', '(969) 539-3994', '797 McClancy Place', 'Utting', 'Oregon'),
(27, 'Alfreda', 'Watkins', '(823) 414-3027', '917 George Street', 'Dotsero', 'Pennsylvania'),
(28, 'Paige', 'Rich', '(845) 435-2502', '332 Hanover Place', 'Wells', 'Georgia'),
(29, 'Wade', 'Hayes', '(947) 583-2116', '756 Fair Street', 'Canterwood', 'Idaho'),
(30, 'Moran', 'Bean', '(943) 512-2074', '417 Duffield Street', 'Detroit', 'Guam');

-- --------------------------------------------------------

--
-- Table structure for table `user_resum`
--

DROP TABLE IF EXISTS `user_resum`;
CREATE TABLE `user_resum` (
  `user_resum_id` int(11) NOT NULL,
  `First name` varchar(50) NOT NULL,
  `Last name` varchar(50) NOT NULL,
  `phone number` varchar(50) NOT NULL,
  `Email` varchar(25) NOT NULL,
  `birthday` varchar(50) NOT NULL,
  `School name` varchar(255) NOT NULL,
  `Date of graduation` text NOT NULL,
  `introduction` text NOT NULL,
  `sex` char(2) NOT NULL,
  `ATTACH_FILE` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_resum`
--

INSERT INTO `user_resum` (`user_resum_id`, `First name`, `Last name`, `phone number`, `Email`, `birthday`, `School name`, `Date of graduation`, `introduction`, `sex`, `ATTACH_FILE`) VALUES
(1, 'bin', 'liu', '6453247285', 'hunbdr@gmail.com', '01-05-1989', 'humber', '01-09-2016', 'To work as an HR Summer Student at Ontario Energy Board where, I am aspiring to contribute my professional education, interpersonal and organizational skills and to add value to Ontario Energy Board and HR team in accomplishing its goals', 'ma', ' '),
(2, 'aleax', 'send', '1234545678', 'liubindr@gmail.com', '01-05-1989', 'humber', '01-03-2016', '•	Familiar with employment law, OHSA and JHSC; skilled decision maker and problem solver by balancing employees’ needs with law and company’s policy', 'fa', ' '),
(3, 'zhao', 'yi', '6453247285', 'lina@gmail.com', '01-05-1989', 'sence', '01-03-2014', '•	Helped to prepare payroll, position evaluations and performance review report\r\n•	Collected and analyzed internal and external compensation statistics, identified trends and proposed recommendations to HR manager\r\n•	Assisted in adjusting salary structures and designing compensation packages based on company’s budget while complying with government laws and regulations\r\n•	Researched for other discount and noncash incentive to existing benefit programs\r\n', 'fa', ' ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`answer_id`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`Food_id`);

--
-- Indexes for table `food_comment`
--
ALTER TABLE `food_comment`
  ADD PRIMARY KEY (`Comment_id`);

--
-- Indexes for table `food_order`
--
ALTER TABLE `food_order`
  ADD PRIMARY KEY (`Order_id`);

--
-- Indexes for table `food_order_item`
--
ALTER TABLE `food_order_item`
  ADD PRIMARY KEY (`Order_item_id`);

--
-- Indexes for table `food_test`
--
ALTER TABLE `food_test`
  ADD PRIMARY KEY (`Test_id`);

--
-- Indexes for table `food_test_question`
--
ALTER TABLE `food_test_question`
  ADD PRIMARY KEY (`Question_id`);

--
-- Indexes for table `food_user_recording`
--
ALTER TABLE `food_user_recording`
  ADD PRIMARY KEY (`Record_id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `moviefeature`
--
ALTER TABLE `moviefeature`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_resum`
--
ALTER TABLE `user_resum`
  ADD PRIMARY KEY (`user_resum_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `moviefeature`
--
ALTER TABLE `moviefeature`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;
--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
