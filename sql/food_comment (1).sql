-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2016 at 08:02 PM
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
-- Table structure for table `food_comment`
--

CREATE TABLE `food_comment` (
  `Comment_id` int(8) NOT NULL,
  `Food_id` int(8) NOT NULL,
  `User_id` int(8) NOT NULL,
  `Comment` varchar(500) NOT NULL,
  `Mark` float(3,2) NOT NULL,
  `Evaluation` int(1) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_comment`
--

INSERT INTO `food_comment` (`Comment_id`, `Food_id`, `User_id`, `Comment`, `Mark`, `Evaluation`, `Date`) VALUES
(1, 1, 1, 'good', 5.00, 1, '2016-03-02'),
(2, 1, 3, 'Bad', 3.00, 3, '2016-03-11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `food_comment`
--
ALTER TABLE `food_comment`
  ADD PRIMARY KEY (`Comment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food_comment`
--
ALTER TABLE `food_comment`
  MODIFY `Comment_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
