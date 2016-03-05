-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2016 at 06:17 PM
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
-- Table structure for table `answer`
--

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
-- Table structure for table `feedback`
--

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
('1', 0, 'male', '1', '123344556', 'efewfw@gmail.com', 'eregegreg', 0, 1, 0, 1, 'whyefffefre');

-- --------------------------------------------------------

--
-- Table structure for table `job_post`
--

CREATE TABLE `job_post` (
  `job_post_id` int(11) NOT NULL,
  `Job title` varchar(255) NOT NULL,
  `USER_ID` int(10) NOT NULL,
  `Time` tinyint(1) NOT NULL,
  `keyword` varchar(250) NOT NULL,
  `number` int(11) NOT NULL,
  `ATTACH_FILE` varchar(100) NOT NULL,
  `job Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

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
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`answer_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_post`
--
ALTER TABLE `job_post`
  ADD PRIMARY KEY (`job_post_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_resum`
--
ALTER TABLE `user_resum`
  ADD PRIMARY KEY (`user_resum_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
