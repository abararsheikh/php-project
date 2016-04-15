-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2016 at 08:01 PM
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
-- Table structure for table `food_shoppingcart`
--

CREATE TABLE `food_shoppingcart` (
  `Id` int(8) NOT NULL,
  `User_id` varchar(8) NOT NULL,
  `Food_id` int(8) NOT NULL,
  `Quantity` int(8) NOT NULL,
  `Size` int(1) NOT NULL,
  `Cinema_Name` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_shoppingcart`
--

INSERT INTO `food_shoppingcart` (`Id`, `User_id`, `Food_id`, `Quantity`, `Size`, `Cinema_Name`, `price`) VALUES
(1, '1', 1, 5, 2, '0', '0.00'),
(13, '7', 1, 2, 1, 'Cinema_Name', '0.40'),
(14, '7', 2, 3, 2, 'Cinema_Name', '6.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `food_shoppingcart`
--
ALTER TABLE `food_shoppingcart`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food_shoppingcart`
--
ALTER TABLE `food_shoppingcart`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
