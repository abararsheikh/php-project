-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-03-05 02:25:42
-- 服务器版本： 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_project`
--

-- --------------------------------------------------------

--
-- 表的结构 `food`
--

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
-- 转存表中的数据 `food`
--

INSERT INTO `food` (`Food_id`, `Food_Catagory`, `Food_Price`, `Food_Instock`, `Food_description`, `Food_mark`, `Food_Name`, `Food_Image`) VALUES
(1, 'special', '1.00', 2, 'good food', 5, 'salmon', 'food1.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `food_comment`
--

CREATE TABLE `food_comment` (
  `Comment_id` int(8) NOT NULL,
  `Food_id` int(8) NOT NULL,
  `User_id` int(8) NOT NULL,
  `Comment` varchar(500) NOT NULL,
  `Mark` float(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `food_comment`
--

INSERT INTO `food_comment` (`Comment_id`, `Food_id`, `User_id`, `Comment`, `Mark`) VALUES
(1, 1, 1, 'good', 5.00);

-- --------------------------------------------------------

--
-- 表的结构 `food_order`
--

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
-- 转存表中的数据 `food_order`
--

INSERT INTO `food_order` (`Order_id`, `User_id`, `Order_time`, `Cinema_id`, `Deliver_time`, `Total_price`, `Phone_number`, `Email_address`, `Room_id`) VALUES
(1, 1, '2016-03-02', 1, '2016-03-03', '9.00', '6477725042', 'h8@fd5.com', 1);

-- --------------------------------------------------------

--
-- 表的结构 `food_order_item`
--

CREATE TABLE `food_order_item` (
  `Order_item_id` int(8) NOT NULL,
  `Food_id` int(8) NOT NULL,
  `Order_id` int(8) NOT NULL,
  `Quantity` int(8) NOT NULL,
  `User_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `food_order_item`
--

INSERT INTO `food_order_item` (`Order_item_id`, `Food_id`, `Order_id`, `Quantity`, `User_id`) VALUES
(1, 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- 表的结构 `food_test`
--

CREATE TABLE `food_test` (
  `Test_id` int(8) NOT NULL,
  `Score` int(3) NOT NULL,
  `User_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `food_test`
--

INSERT INTO `food_test` (`Test_id`, `Score`, `User_id`) VALUES
(1, 60, 1);

-- --------------------------------------------------------

--
-- 表的结构 `food_test_question`
--

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
-- 转存表中的数据 `food_test_question`
--

INSERT INTO `food_test_question` (`Question_id`, `Question`, `Option1`, `Option2`, `Option3`, `Option4`, `Answer`) VALUES
(1, '1234567', 'A', 'B', 'C', 'D', 2);

-- --------------------------------------------------------

--
-- 表的结构 `food_user_recording`
--

CREATE TABLE `food_user_recording` (
  `Record_id` int(8) NOT NULL,
  `User_id` int(8) NOT NULL,
  `Total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `food_user_recording`
--

INSERT INTO `food_user_recording` (`Record_id`, `User_id`, `Total_amount`) VALUES
(1, 1, '80.00');

--
-- Indexes for dumped tables
--

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
