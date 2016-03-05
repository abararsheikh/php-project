-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2016 at 09:00 PM
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
-- Table structure for table `moviefeature`
--

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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `moviefeature`
--
ALTER TABLE `moviefeature`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `moviefeature`
--
ALTER TABLE `moviefeature`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
