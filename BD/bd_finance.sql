-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.16 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para finance
DROP DATABASE IF EXISTS `finance`;
CREATE DATABASE IF NOT EXISTS `finance` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `finance`;

-- Volcando estructura para tabla finance.account
DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id_account` int(11) NOT NULL AUTO_INCREMENT,
  `acc_title` varchar(45) NOT NULL,
  `acc_initial_value` double NOT NULL,
  `fk_id_person` int(11) NOT NULL,
  `fk_type_acco` int(11) NOT NULL,
  PRIMARY KEY (`id_account`),
  KEY `fk_account_person1_idx` (`fk_id_person`),
  KEY `fk_account_account_type1_idx` (`fk_type_acco`),
  CONSTRAINT `fk_account_account_type1` FOREIGN KEY (`fk_type_acco`) REFERENCES `account_type` (`id_account_type`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_account_person1` FOREIGN KEY (`fk_id_person`) REFERENCES `person` (`id_person`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.account: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
REPLACE INTO `account` (`id_account`, `acc_title`, `acc_initial_value`, `fk_id_person`, `fk_type_acco`) VALUES
	(1, 'cuenta 1', 15000, 1, 1),
	(2, 'cuenta 2', 20000, 1, 2),
	(3, 'cuenta 2.1', 10000, 2, 1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;

-- Volcando estructura para tabla finance.account_type
DROP TABLE IF EXISTS `account_type`;
CREATE TABLE IF NOT EXISTS `account_type` (
  `id_account_type` int(11) NOT NULL AUTO_INCREMENT,
  `at_name` varchar(45) DEFAULT NULL,
  `at_state` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id_account_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.account_type: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
REPLACE INTO `account_type` (`id_account_type`, `at_name`, `at_state`) VALUES
	(1, 'Cuenta de Ahorro', 'active'),
	(2, 'cuenta corrriente', 'active'),
	(3, 'chupa el perro', 'inactive');
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;

-- Volcando estructura para tabla finance.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id_category` int(11) NOT NULL AUTO_INCREMENT,
  `ca_name` varchar(45) NOT NULL,
  `ca_state` enum('active','inactive') NOT NULL DEFAULT 'active',
  `fk_id_category` int(11) DEFAULT NULL,
  `fk_type_movem` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_category`),
  KEY `fk_category_category1_idx` (`fk_id_category`),
  KEY `FK_category_movement_type` (`fk_type_movem`),
  CONSTRAINT `FK_category_movement_type` FOREIGN KEY (`fk_type_movem`) REFERENCES `movement_type` (`id_type_movement`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_category_category1` FOREIGN KEY (`fk_id_category`) REFERENCES `category` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.category: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
REPLACE INTO `category` (`id_category`, `ca_name`, `ca_state`, `fk_id_category`, `fk_type_movem`) VALUES
	(1, 'Alimentacion', 'active', NULL, 2),
	(2, 'Educacion ', 'active', NULL, 2),
	(3, 'Entretenimiento', 'active', NULL, 2),
	(4, 'Facturas', 'active', NULL, 2),
	(5, 'Hogar', 'active', NULL, 2),
	(6, 'Ropa', 'active', NULL, 2),
	(7, 'Regalo', 'active', NULL, 1),
	(8, 'Me Pagaron', 'active', NULL, 1),
	(11, 'Merienda', 'active', 1, 2);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Volcando estructura para tabla finance.couta
DROP TABLE IF EXISTS `couta`;
CREATE TABLE IF NOT EXISTS `couta` (
  `id_couta` int(11) NOT NULL AUTO_INCREMENT,
  `cou_value` double NOT NULL,
  `fk_id_movement` int(11) NOT NULL,
  `date_couta` date NOT NULL,
  PRIMARY KEY (`id_couta`),
  KEY `fk_couta_movement1_idx` (`fk_id_movement`),
  CONSTRAINT `fk_couta_movement1` FOREIGN KEY (`fk_id_movement`) REFERENCES `movement` (`id_movement`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.couta: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `couta` DISABLE KEYS */;
/*!40000 ALTER TABLE `couta` ENABLE KEYS */;

-- Volcando estructura para tabla finance.debtor
DROP TABLE IF EXISTS `debtor`;
CREATE TABLE IF NOT EXISTS `debtor` (
  `id_debtor` int(11) NOT NULL AUTO_INCREMENT,
  `de_state` enum('active','inactive') NOT NULL DEFAULT 'active',
  `de_description` varchar(200) DEFAULT NULL,
  `fk_id_person` int(11) NOT NULL,
  `values_debtor` double DEFAULT NULL,
  `date_debtor` date DEFAULT NULL,
  PRIMARY KEY (`id_debtor`),
  KEY `fk_debtor_person1_idx` (`fk_id_person`),
  CONSTRAINT `fk_debtor_person1` FOREIGN KEY (`fk_id_person`) REFERENCES `person` (`id_person`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.debtor: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `debtor` DISABLE KEYS */;
REPLACE INTO `debtor` (`id_debtor`, `de_state`, `de_description`, `fk_id_person`, `values_debtor`, `date_debtor`) VALUES
	(1, 'active', 'por una plata', 1, 1000, '2019-05-18'),
	(2, 'active', 'una empanadas fiadas', 1, 200, '2019-08-18');
/*!40000 ALTER TABLE `debtor` ENABLE KEYS */;

-- Volcando estructura para tabla finance.movement
DROP TABLE IF EXISTS `movement`;
CREATE TABLE IF NOT EXISTS `movement` (
  `id_movement` int(11) NOT NULL AUTO_INCREMENT,
  `mo_value` double NOT NULL,
  `mo_date` date NOT NULL,
  `mo_description` varchar(100) NOT NULL,
  `mo_state` enum('active','inactive','Pendiente') NOT NULL DEFAULT 'active',
  `fk_type_movem` int(11) NOT NULL,
  `fk_id_category` int(11) NOT NULL,
  `fk_id_account` int(11) NOT NULL,
  PRIMARY KEY (`id_movement`),
  KEY `fk_movement_movement_type1_idx` (`fk_type_movem`),
  KEY `fk_movement_category1_idx` (`fk_id_category`),
  KEY `fk_movement_account1_idx` (`fk_id_account`),
  CONSTRAINT `fk_movement_account1` FOREIGN KEY (`fk_id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_movement_category1` FOREIGN KEY (`fk_id_category`) REFERENCES `category` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_movement_movement_type1` FOREIGN KEY (`fk_type_movem`) REFERENCES `movement_type` (`id_type_movement`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.movement: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `movement` DISABLE KEYS */;
REPLACE INTO `movement` (`id_movement`, `mo_value`, `mo_date`, `mo_description`, `mo_state`, `fk_type_movem`, `fk_id_category`, `fk_id_account`) VALUES
	(1, 1000, '2019-08-18', 'compramos unas salchipapas', 'active', 2, 1, 1),
	(2, 300, '2019-08-18', 'la salsitas ', 'active', 2, 1, 2),
	(3, 1000, '2019-08-18', 'aun me debe plata 100 por dia', 'Pendiente', 2, 6, 1),
	(4, 10000, '2019-08-18', 'me pagaron por x', 'active', 1, 2, 2);
/*!40000 ALTER TABLE `movement` ENABLE KEYS */;

-- Volcando estructura para tabla finance.movement_type
DROP TABLE IF EXISTS `movement_type`;
CREATE TABLE IF NOT EXISTS `movement_type` (
  `id_type_movement` int(11) NOT NULL AUTO_INCREMENT,
  `mt_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id_type_movement`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.movement_type: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `movement_type` DISABLE KEYS */;
REPLACE INTO `movement_type` (`id_type_movement`, `mt_name`) VALUES
	(1, 'Ingresos'),
	(2, 'Gastos');
/*!40000 ALTER TABLE `movement_type` ENABLE KEYS */;

-- Volcando estructura para tabla finance.person
DROP TABLE IF EXISTS `person`;
CREATE TABLE IF NOT EXISTS `person` (
  `id_person` int(11) NOT NULL AUTO_INCREMENT,
  `per_name` varchar(50) NOT NULL,
  `per_lastname` varchar(50) NOT NULL,
  `per_gender` enum('MASCULINO','FEMENINO') NOT NULL,
  PRIMARY KEY (`id_person`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.person: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
REPLACE INTO `person` (`id_person`, `per_name`, `per_lastname`, `per_gender`) VALUES
	(1, 'antonio', 'leal', 'MASCULINO'),
	(2, 'asdasd', 'dsad', 'FEMENINO');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;

-- Volcando estructura para tabla finance.user1
DROP TABLE IF EXISTS `user1`;
CREATE TABLE IF NOT EXISTS `user1` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fk_id_person` int(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_user_person_idx` (`fk_id_person`),
  CONSTRAINT `fk_user_person` FOREIGN KEY (`fk_id_person`) REFERENCES `person` (`id_person`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla finance.user1: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `user1` DISABLE KEYS */;
REPLACE INTO `user1` (`id_user`, `email`, `password`, `fk_id_person`) VALUES
	(1, 'user1@udla.edu.co', 'user123', 1),
	(2, 'dsada@udla.edu.co', '12345', 2);
/*!40000 ALTER TABLE `user1` ENABLE KEYS */;

-- Volcando estructura para procedimiento finance.CreateDeudor
DROP PROCEDURE IF EXISTS `CreateDeudor`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateDeudor`(
	IN `fk_user` INT
,
	IN `descripcion` VARCHAR(500),
	IN `valor` INT
)
BEGIN
insert into debtor() VALUES(1,"","","","","");
END//
DELIMITER ;

-- Volcando estructura para procedimiento finance.GetGastos
DROP PROCEDURE IF EXISTS `GetGastos`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetGastos`(
	IN `id_user` INT
)
BEGIN
select movement.id_movement,movement.mo_value,movement.mo_date,
movement.mo_description,category.ca_name,cuenta.acc_title from user1
inner join account as cuenta on cuenta.fk_id_person = user1.id_user
inner join movement on movement.fk_id_account = cuenta.id_account
inner join movement_type on movement_type.id_type_movement = movement.fk_type_movem
inner join category on category.id_category = movement.fk_id_category
where movement_type.mt_name="Gastos" and user1.id_user = id_user;


END//
DELIMITER ;

-- Volcando estructura para procedimiento finance.GetIngresos
DROP PROCEDURE IF EXISTS `GetIngresos`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetIngresos`(
	IN `id_user` INT

)
BEGIN

select movement.id_movement,movement.mo_value,movement.mo_date,
movement.mo_description,category.ca_name,cuenta.acc_title from user1
inner join account as cuenta on cuenta.fk_id_person = user1.id_user
inner join movement on movement.fk_id_account = cuenta.id_account
inner join movement_type on movement_type.id_type_movement = movement.fk_type_movem
inner join category on category.id_category = movement.fk_id_category
where movement_type.mt_name="Ingresos" and user1.id_user = id_user;



END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
