-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2016 at 07:59 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `food_order_item`
--

CREATE TABLE `food_order_item` (
  `Order_item_id` int(8) NOT NULL,
  `Food_id` int(8) NOT NULL,
  `Order_id` int(8) NOT NULL,
  `Quantity` int(8) NOT NULL,
  `Size` int(1) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `Cinema` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_order_item`
--

INSERT INTO `food_order_item` (`Order_item_id`, `Food_id`, `Order_id`, `Quantity`, `Size`, `Date`, `Time`, `Cinema`) VALUES
(1, 1, 1, 2, 0, '0000-00-00', '00:00:00', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `food_order_item`
--
ALTER TABLE `food_order_item`
  ADD PRIMARY KEY (`Order_item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food_order_item`
--
ALTER TABLE `food_order_item`
  MODIFY `Order_item_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
