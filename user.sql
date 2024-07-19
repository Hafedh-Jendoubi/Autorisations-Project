-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2024 at 10:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autorisation`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `dateNaissance` date NOT NULL,
  `genre` char(1) NOT NULL,
  `tel` varchar(8) NOT NULL,
  `cin` varchar(8) NOT NULL,
  `addresse` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nom`, `prenom`, `dateNaissance`, `genre`, `tel`, `cin`, `addresse`, `email`) VALUES
(1, 'Jendoubi', 'Hafedh', '2002-11-22', 'M', '52896806', '14515936', 'Tunis, Manouba, Jdeida', 'hafedh.jendoubi@esprit.tn'),
(2, 'Klai', 'Rayen', '2001-05-08', 'M', '97984412', '14221345', 'Tunis, Ariana, Hay Ettadhamon', 'rayen.klai@esprit.tn'),
(3, 'Mhamdi', 'Ahlem', '2000-04-29', 'F', '52414236', '14415474', 'Tunis, Ariana, Mourouj 6', 'ahlem.mhamdi@esprit.tn'),
(4, 'Jendoubi', 'Majdi', '1999-08-31', 'M', '27894002', '14325173', 'Tunis, Manouba, Jdeida', 'majdi.jendoubi@esprit.tn'),
(5, 'Jendoubi', 'Slah', '1966-08-14', 'M', '21963001', '01581830', 'Tunis, Bizerte, Mabtouh', 'slah.jendoubi@esprit.tn'),
(6, 'Trabelsi', 'Nour', '2002-04-15', 'F', '95440432', '14330234', 'Manouba, Jdeida', 'nour.trabelsi@esprit.tn'),
(7, 'Bel Haj Romdhane', 'Salwa', '1970-11-21', 'F', '25603680', '01543134', 'Ariana, Mnihla', 'salwa.benhajromdhane@esprit.tn');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
