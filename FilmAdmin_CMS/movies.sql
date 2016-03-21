-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2016 at 10:56 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movies`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryID` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryID`, `categoryName`) VALUES
(1, 'NowShowing'),
(2, 'ComingSoon');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

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
(2, 'navaz', 'sheikh', 'navaz@gmail.com', 'Hello world'),
(3, 'amrin', 'sheikh', 'amrin@gmail.com', 'Hello canada'),
(10, 'rayaji', 'patel', 'raj@yahoo.com', '    How are you         '),
(21, 'ankit', 'Desai', 'ankit@yahoo.com', 'how are you'),
(23, 'ankush', 'patel', 'ankush@gmail.com', 'hello'),
(26, 'magan', 'magan', 'magan@ymail.com', 'wjdi'),
(28, 'Dhruv', 'Shah', 'dhruv@ymail.com', 'Hello Toronto            '),
(29, 'abaa', 'sdfsafae', 'sd@gmail.com', '        wegfwgw    '),
(33, 'Abarar', 'Sheikh', 'er.abrar@gmail.com', '    dfwsws        '),
(34, 'wefw', 'qw', 'hy@gmail.com', '         lnlf   '),
(35, 'lflmw', 'w;fw;', 'ti@gmail.com', '   ;fmw;w         '),
(36, 'fadwwf', 'wfwr', 'er.abrar@gmail.com', '         wfsfws   '),
(37, 'aaaaa', 'aaaaa', 'tina@yahoo.com', 'qjqq            ');

-- --------------------------------------------------------

--
-- Table structure for table `moviefeature`
--

CREATE TABLE `moviefeature` (
  `film_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `language` text NOT NULL,
  `releaseDate` date NOT NULL,
  `director` text NOT NULL,
  `cast` text NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `moviefeature`
--

INSERT INTO `moviefeature` (`film_id`, `title`, `language`, `releaseDate`, `director`, `cast`, `img`) VALUES
(16, 'SINGHAM', '', '2010-02-10', 'sgdsg', ' aflnwlflwfw ', '../Assets/image/HomePage/kongfupanda.jpg'),
(21, 'kwnklwn', '', '2015-05-04', ' dwewef', '    skfjsjkfjlsl  ', '../Assets/image/HomePage/starwar.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `moviefeature`
--
ALTER TABLE `moviefeature`
  ADD PRIMARY KEY (`film_id`),
  ADD UNIQUE KEY `Id` (`film_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `moviefeature`
--
ALTER TABLE `moviefeature`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
