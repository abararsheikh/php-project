-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 02, 2016 at 03:51 AM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
