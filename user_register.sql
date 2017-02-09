-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2017 at 08:30 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodejsuser`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_register`
--

CREATE TABLE IF NOT EXISTS `user_register` (
`user_id` int(11) NOT NULL,
  `user_fullname` varchar(100) NOT NULL,
  `user_login` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_salt` varchar(255) NOT NULL,
  `user_hobby` varchar(100) NOT NULL,
  `user_address` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_register`
--

INSERT INTO `user_register` (`user_id`, `user_fullname`, `user_login`, `user_password`, `user_salt`, `user_hobby`, `user_address`) VALUES
(2, 'Ofani Dariyans', 'ofani', 'c39c10fa3e44762c9071a697aee6650a8bf652d32614d574f69620aac8112678c9458e95cfdd097cf245b6aa4c20a7db057836883bb81977d465bbb572277f22', 'ofani-a2d110f18d647bb2', 'Travellings', 'Jogja Indonesia         '),
(3, 'Toni Blank', 'toni', '8b16b901bf7b9aea5806b19d1b31a7b0c2bc02ad8b3eae91c72e049e434a332e024f41b4fda53f9f006f76b9423a0591420182f7bd918556deec6081131a9471', 'toni-86669974e95a3cb7', 'Ketawa', 'Ris Pasir Putih 772            ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_register`
--
ALTER TABLE `user_register`
 ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_register`
--
ALTER TABLE `user_register`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
