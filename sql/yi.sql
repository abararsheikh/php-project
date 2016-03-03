-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 02, 2016 at 04:45 AM
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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `last_name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(14) CHARACTER SET utf8 DEFAULT NULL,
  `street` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `city` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `province` varchar(30) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `phone`, `street`, `city`, `province`) VALUES
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
-- Table structure for table `is_paid`
--

DROP TABLE IF EXISTS `is_paid`;
CREATE TABLE `is_paid` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `items` text NOT NULL,
  `cost` double NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `is_paid`
--

INSERT INTO `is_paid` (`id`, `user_id`, `items`, `cost`, `is_paid`, `time`) VALUES
(1, 1, '[{movie: {id: 1, amount: 3}, {id: 2, amount: 1}, food: {id: 2, amount: 2}}]', 20.34, 0, '2016-03-01 00:00:00');

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
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `is_paid`
--
ALTER TABLE `is_paid`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `is_paid`
--
ALTER TABLE `is_paid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
