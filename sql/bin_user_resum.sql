-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2016 at 08:36 PM
-- Server version: 10.0.17-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `career`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_resum`
--

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
-- Indexes for table `user_resum`
--
ALTER TABLE `user_resum`
  ADD PRIMARY KEY (`user_resum_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
