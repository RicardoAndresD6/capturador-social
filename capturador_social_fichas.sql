-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: capturador_social
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fichas`
--

DROP TABLE IF EXISTS `fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rut` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `altura` decimal(3,2) NOT NULL,
  `fecha_naci` date NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `edad` int NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `comuna` varchar(100) DEFAULT NULL,
  `educacion_basica` int DEFAULT NULL,
  `educacion_media` int DEFAULT NULL,
  `renta_mensual` decimal(10,2) DEFAULT NULL,
  `trabajando` varchar(5) NOT NULL,
  `anos_experiencia` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
INSERT INTO `fichas` VALUES (1,'26.835.260-0','RICARDO','DIAZ','Masculino',1.62,'2024-05-08','986377907','rdiaz@gmail.com',0,'sadasd','Santiago',1,2,200000.00,'0',5),(2,'26.835.260-0','RICARDO','DIAZ','Masculino',1.60,'1999-01-16','986377907','rdiaz@gmail.com',25,'Av Irarrazaval 200','Providencia',7,4,2000000.00,'0',4),(3,'26.835.260-0','RICARDO','DIAZ','Masculino',1.39,'1999-01-23','986377907','rdiaz@gmail.com',25,'av irarrazxval','Providencia',3,3,20000.00,'0',4),(4,'26.835.260-0','RICARDO','DIAZ','Masculino',1.68,'1999-01-16','986377907','rdiaz@gmail.com',25,'av irarazval 200','Las Condes',1,2,200000.00,'0',4);
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-15 22:47:24
