-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2021 at 09:41 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tixscape`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `show_time_id` int(11) NOT NULL,
  `booking_ticket` int(11) NOT NULL,
  `booking_total_price` int(11) NOT NULL,
  `booking_payment_method` varchar(150) NOT NULL,
  `booking_status` enum('succes','failed') NOT NULL,
  `booking_updated_at` timestamp NULL DEFAULT current_timestamp(),
  `booking_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `booking_seat_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_city` varchar(250) NOT NULL,
  `location_addres` varchar(250) NOT NULL,
  `location_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `location_update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_city`, `location_addres`, `location_created_at`, `location_update_at`) VALUES
(1, 'Jakarta', 'Jl. Gatot Subroto No.Kav. 19, RT.8/RW.2, Karet Semanggi, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta ', '2021-07-18 19:22:59', '2021-07-18 19:22:59');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(250) NOT NULL,
  `movie_category` varchar(100) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_directed_by` varchar(150) NOT NULL,
  `movie_casts` varchar(150) NOT NULL,
  `movie_synopsis` varchar(250) NOT NULL,
  `movie_duration` time NOT NULL,
  `movie_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `movie_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `movie_image` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_category`, `movie_release_date`, `movie_directed_by`, `movie_casts`, `movie_synopsis`, `movie_duration`, `movie_created_at`, `movie_updated_at`, `movie_image`) VALUES
(36, 'Gunpowder Milkshake', 'Mystery, Thriller', '2021-06-04', 'Navot Papushado', 'Karen Gillan, Lena Hadey', 'Sam (Karen Gillan) was only 12 years old when her mother Scarlet (Lena Headey), an elite assassin, was forced to abandon her.', '00:01:16', '2021-07-07 05:36:19', '2021-07-18 15:39:44', '2021-07-18T15-39-44.006Zgunpowdermilkshake.jpg'),
(53, 'Black Widow', 'Action, Sci-Fi', '2021-07-23', 'Cate Shortland', 'Scarlett Johansson', 'A film about Natasha Romanoff in her quests between the films Civil War and Infinity War.', '00:01:40', '2021-07-15 11:27:29', '2021-07-15 11:43:46', '2021-07-15T11-43-46.959Zblackwidow.jpg'),
(55, 'Space Jam', 'Animation', '2021-08-01', 'Halo', 'James Le Bron', 'Eheee', '00:00:00', '2021-07-21 03:24:45', '2021-07-22 05:37:52', '2021-07-22T05-33-02.877Zspacejam.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` varchar(150) NOT NULL,
  `location_id` int(11) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_logo` varchar(150) NOT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `premiere_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `premiere_name`, `premiere_price`, `premiere_logo`, `premiere_created_at`, `premiere_updated_at`) VALUES
(1, '53', 1, 'Hiflix', 30000, '', '2021-07-18 19:13:10', '2021-07-18 19:13:10');

-- --------------------------------------------------------

--
-- Table structure for table `show_time`
--

CREATE TABLE `show_time` (
  `show_time_id` int(11) NOT NULL,
  `show_time_date` date NOT NULL,
  `show_time_clock` varchar(100) NOT NULL,
  `show_time_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `show_time_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `premiere_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `show_time`
--

INSERT INTO `show_time` (`show_time_id`, `show_time_date`, `show_time_clock`, `show_time_created_at`, `show_time_updated_at`, `premiere_id`) VALUES
(1, '2021-07-20', '10:00am', '2021-07-18 19:16:46', '2021-07-18 19:16:46', 1),
(2, '2021-07-20', '12:00pm', '2021-07-18 19:17:01', '2021-07-18 19:17:01', 1),
(3, '2021-07-20', '02:00pm', '2021-07-18 19:17:21', '2021-07-18 19:17:21', 1),
(4, '2021-07-20', '16:00pm', '2021-07-18 19:17:46', '2021-07-18 19:17:46', 1),
(5, '2021-07-20', '18:00pm', '2021-07-18 19:18:01', '2021-07-18 19:18:01', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_role` enum('user','admin') NOT NULL,
  `user_verification` varchar(8) NOT NULL DEFAULT '0',
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_phone_number` varchar(13) DEFAULT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_profile_image` varchar(150) DEFAULT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_role`, `user_verification`, `user_name`, `user_email`, `user_phone_number`, `user_password`, `user_profile_image`, `user_created_at`, `user_updated_at`) VALUES
(39, 'user', '1', 'juliant', 'thisshit@gmail.com', NULL, '$2b$10$nLZQpp2yQHfbsurWvjsaj.nZG53pEvRQ7aTjtsFTlEBDmm0TJtVxO', NULL, '2021-07-07 10:37:10', NULL),
(41, 'user', '0', 'Juno Hotels', 'juno@hotels.com', NULL, '$2b$10$afukVqe9RnIS0EbfzU7UdeMthcR.EFdJ/THXLJqTPhxJuBRYNd4va', NULL, '2021-07-07 10:51:48', NULL),
(42, 'user', '0', 'juliant', 'iqbaljuliant@outlook.com', NULL, '$2b$10$qCxpY/Put.3NelhqFbxe3e7FFM9sgCRsnvgLPC2TepvXAVjRzdDW.', NULL, '2021-07-07 10:59:25', NULL),
(43, 'user', '0', 'iqbal', 'dadu@dadu.com', NULL, '$2b$10$HedlRIoelckEgdr9KGbFuu4Gugpjv9/oVTxD5uq7KIoV7gFgA3fPm', NULL, '2021-07-07 11:39:02', NULL),
(45, 'admin', '0', 'Iqbal', 'admin@admin.com', NULL, '$2b$10$Wk/67ZBlMR68gUTXNkB0beNuL6lVwQjF309XLbic2pM.BiH30fDKe', NULL, '2021-07-08 08:31:00', NULL),
(46, 'user', '1', 'Juliantwerp', 'ucofrhjehmu@northsixty.com', NULL, '$2b$10$h8pBjS1BJBgBF2ZV75ch5ugcCdVVqSZBu/15J8mPIrX6C6Ej2/dwi', 'xxxx', '2021-07-08 11:34:23', NULL),
(48, 'user', '0', 'Shin Ryujin', 'ryujin@shin.com', NULL, '$2b$10$zF2IvHZemQY9nZ2DmykQ0.x3jA9A7gHCCcqFmXmAQhAdCR04H7HCu', NULL, '2021-07-09 00:11:10', NULL),
(49, 'user', '0', 'yuna', 'yuna@shin.com', NULL, '$2b$10$7MaqtzPMvNGBuXhQDVEEY.BOhvrH0WfNCC2uzZEmP4sF/kbpipOF6', NULL, '2021-07-09 00:13:19', NULL),
(50, 'user', '0', 'shin yuna', 'shin@yuna.com', NULL, '$2b$10$2MKfv7j60f0sIo0.FaY8LOkDFZ5GlT8Cfq7L3xObD2SM/qooGQt.C', NULL, '2021-07-09 00:13:56', NULL),
(51, 'user', '0', 'pee', 'peeworld@yahoo.com', NULL, '$2b$10$HvYZSIT6f3CdhZpLKZ5e8ucu1J5hbOqs5e5OMW6EN2YgE1VubCK9O', NULL, '2021-07-09 00:15:09', NULL),
(53, 'user', '1', 'Bin Bath', 'juliantwerp@gmail.com', '851585858312', '$2b$10$qNRnxbp62F4ckdKAhvTIWu5GGjPndS57XGGIhGV5ky2zc8C7349Vy', '2021-07-24T05-44-39.279Zprofile-square-extra-small.png', '2021-07-09 10:50:49', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indexes for table `show_time`
--
ALTER TABLE `show_time`
  ADD PRIMARY KEY (`show_time_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `show_time`
--
ALTER TABLE `show_time`
  MODIFY `show_time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
