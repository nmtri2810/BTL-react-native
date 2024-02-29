-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: btl_react_native
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJyb2xlX2lkIjoiVVMifSwiaWF0IjoxNjk1NjM3OTg5LCJleHAiOjE2OTU3MjQzODl9.99A0uxnOuQQcN9b7ib0Q-9REr5k59Ldm6F0aoPZjdu8',2),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlX2lkIjoiQUQifSwiaWF0IjoxNjk1NjY0MTQzLCJleHAiOjE2OTU3NTA1NDN9.mSSGW5JHtBsspyNOzfg2Z4cjBEXYniTpz5O-ix-bafE',1),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlX2lkIjoiQUQifSwiaWF0IjoxNjk1NzUwNzY4LCJleHAiOjE2OTU4MzcxNjh9.tQS3Q_m7yJscR-KLCWZ87b6sRJqghm_4YhAyssLdcag',1),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlX2lkIjoiQUQifSwiaWF0IjoxNjk1NzUyNjU1LCJleHAiOjE2OTU4MzkwNTV9.OMiS-R1CxKeWm_SdEv8BFXb7nsroXHDgFhU6dktpgig',1),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlX2lkIjoiQUQifSwiaWF0IjoxNjk2ODQzMjI2LCJleHAiOjE2OTY5Mjk2MjZ9.3DZ6a-EnB16IjcJ3hQBvtFD-_XPlCQTzqpuKZclvEmk',1),(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyMCwicm9sZV9pZCI6IkFEIn0sImlhdCI6MTcwOTIyNjc5MiwiZXhwIjoxNzA5MzEzMTkyfQ.33HPSJuUBY1Fa8T-2fzJf3K-Xq19r2MgHaFrAvjSGW4',20);
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_time` datetime NOT NULL,
  `num_of_people` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_num` varchar(10) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `status_id` varchar(2) NOT NULL DEFAULT 'S1',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(2,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(3,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(4,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S2',2),(5,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S3',2),(6,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S4',2),(7,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(8,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(9,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(10,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(11,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(12,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(13,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(14,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(15,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(16,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(17,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','nothing','S1',2),(18,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','   ','S1',2),(19,'2023-01-01 00:00:00',2,'tri','0123456789','test@gmail.com','two seats and near window','S1',2),(20,'2023-09-27 18:53:00',3,'Tris','0862703500','wexiy81555@ipniel.com','Seat next to window','S1',19);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` varchar(2) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('AD','Admin'),('MA','Manager'),('US','User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` varchar(2) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES ('S1','New'),('S2','Confirmed'),('S3','Done'),('S4','Canceled');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_num` varchar(10) DEFAULT NULL,
  `role_id` varchar(2) NOT NULL DEFAULT 'US',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','$2b$10$bJThdrABTJjgeOHOGrkXcOSTDtXjin5cwANjcCvTdCjix6qyeVrHy',NULL,NULL,'AD'),(2,'test@gmail.com','$2b$10$b0kGErvdUSqhCUAuSZN8d.ind0tycwmxBzbayYanoFAVZBdkZvFdC','Cristiano Ronaldo','1231231231','US'),(4,'test3@gmail.com','$2b$10$GVGmoCk8W/lnjZQbp9k6COtem1TdZRGqinSsu1ls2npOm7cteOhK2','hahahah','111','MA'),(7,'test6@gmail.com','$2b$10$WY2sW/B6tCDFa20Ptr3GkejT76hZvPITMLcjr6bKIUTnOqTFbllIi','aa','11132','US'),(8,'test7@gmail.com','$2b$10$UpQ0lymjFncyVPhC1Zh0POTY/zWcrnA3sRyHQ2fA6k6dm6JtfaWYi','sdcasdasd','673573567','US'),(10,'test231@gmail.com','$2b$10$J/oL7xKUYuvfO34DZO.yG..3F7ig3GxrYU8G2sIfUSRV.EYcAI9dy','miss pennn','09090909','US'),(11,'test5cveqw@gmail.com','$2b$10$JjxTYafbkq4sQLYlY1cCZeUFooydb4zTHCDLE2u4l44b5Lx0xjnVW','messsssssssssssiiiiiiii','97979696','US'),(12,'testvsdfb@gmail.com','$2b$10$1FKCjDfXdLtS3LFe3WYj.uiITlzj7L4.kiPbUV4Nu1RpWMZkcOM.e','cvavvbefg','8476836','US'),(13,'testpagination@gmail.com','$2b$10$yKXVyBHr0DAAq2vJwTNiJuBN4HfY0In7V6GLO86BFPKU1ApMmfJMa','dawsfa','53124','US'),(17,'test5mounted@gmail.com','$2b$10$PGrCmZqjtBImdYHg/dG.z.IIZrZMsmTHOpbBQ6QWsMg7eRZzi2hwi','hahahah','0862703500','US'),(18,'onemore@gmail.com','$2b$10$ex29IfOZKK.UY5.SPt8bGucN3Dw8TQoktP2eafyhtR0CA5sSkds2.','Cristiano Ronaldo','2313123123','US'),(19,'wexiy81555@ipniel.com','$2b$10$YNZrn2QlVE/5xaC5gNSsfuz4GGgtuMHwcjDJi9LyiHYlYQpzfVgae','Tris','0862703500','US'),(20,'admin2@gmail.com','$2b$10$Re3kJGE.vQdXyR.w6nSSJOrASklt5XRJPIAPyzt2ingAZDJRxZZ92','a','a','AD');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-01  0:17:07
