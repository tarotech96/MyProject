-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: testquestion
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer_options`
--

DROP TABLE IF EXISTS `answer_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `answer_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `correct` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `media` varchar(256) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfapodm8kfiu9a9a4o2r43rcgp` (`question_id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer_options`
--

LOCK TABLES `answer_options` WRITE;
/*!40000 ALTER TABLE `answer_options` DISABLE KEYS */;
INSERT INTO `answer_options` VALUES (1,'ee',0,NULL,NULL,NULL,NULL),(2,'t',0,NULL,NULL,NULL,NULL),(3,'323',0,NULL,NULL,NULL,NULL),(4,'3',0,NULL,NULL,NULL,3),(5,'3',0,NULL,NULL,NULL,3),(6,'3',0,NULL,NULL,NULL,3),(7,'3',0,NULL,NULL,NULL,3),(8,'r',0,NULL,NULL,NULL,4),(9,'r',0,NULL,NULL,NULL,4),(10,'r',1,NULL,NULL,NULL,4),(11,'r',1,NULL,NULL,NULL,4),(12,'23',0,NULL,NULL,NULL,5),(13,'13',0,NULL,NULL,NULL,5),(14,'132',0,NULL,NULL,NULL,5),(15,'321',0,NULL,NULL,NULL,5),(16,'65',0,NULL,NULL,NULL,NULL),(17,'65',0,NULL,NULL,NULL,NULL),(18,'65',1,NULL,NULL,NULL,NULL),(19,'65',1,NULL,NULL,NULL,NULL),(20,'dsfad',0,NULL,NULL,NULL,NULL),(21,'fasfas',0,NULL,NULL,NULL,NULL),(22,'fasfsa',0,NULL,NULL,NULL,NULL),(23,'fasas',0,NULL,NULL,NULL,NULL),(24,'22',0,NULL,NULL,NULL,8),(25,'22',0,NULL,NULL,NULL,8),(26,'33',0,NULL,NULL,NULL,8),(27,'222',0,NULL,NULL,NULL,8),(28,'22',0,NULL,NULL,NULL,9),(29,'22',0,NULL,NULL,NULL,9),(30,'33',0,NULL,NULL,NULL,9),(31,'222',0,NULL,NULL,NULL,9),(32,'22',0,NULL,NULL,NULL,9),(33,'22',0,NULL,NULL,NULL,9),(34,'33',0,NULL,NULL,NULL,9),(35,'222',0,NULL,NULL,NULL,9),(36,'22',0,NULL,NULL,NULL,9),(37,'22',0,NULL,NULL,NULL,9),(38,'33',0,NULL,NULL,NULL,9),(39,'222',0,NULL,NULL,NULL,9),(40,'213',0,NULL,NULL,NULL,10),(41,'213',0,NULL,NULL,NULL,10),(42,'3',0,NULL,NULL,NULL,10),(43,'1231',0,NULL,NULL,NULL,10),(44,'65',0,NULL,NULL,NULL,6),(45,'65',0,NULL,NULL,NULL,6),(46,'65',1,NULL,NULL,NULL,6),(47,'65',1,NULL,NULL,NULL,6),(48,'fasas',0,NULL,NULL,NULL,7),(49,'fasfas',0,NULL,NULL,NULL,7),(50,'dsfad',0,NULL,NULL,NULL,7),(51,'fasfsa',0,NULL,NULL,NULL,7);
/*!40000 ALTER TABLE `answer_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chapters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3rm6snrkx0k8xyqn7017b0v41` (`subject_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,NULL,'a',NULL,2),(2,NULL,'b',NULL,1),(3,NULL,'c',NULL,NULL);
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domains`
--

DROP TABLE IF EXISTS `domains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `domains` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK74uwyunghscybnfdyv0x9y6to` (`subject_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domains`
--

LOCK TABLES `domains` WRITE;
/*!40000 ALTER TABLE `domains` DISABLE KEYS */;
INSERT INTO `domains` VALUES (1,NULL,'a',NULL,2),(2,NULL,'b',NULL,1),(3,NULL,'c',NULL,NULL);
/*!40000 ALTER TABLE `domains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `media` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `title` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd1wulherkir0s9abbqr195fr4` (`chapter_id`),
  KEY `FKhdmv1lgdc1eerst2tejp197v2` (`domain_id`),
  KEY `FKo0h0rn8bxifrxmq1d8ipiyqv5` (`subject_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (6,'TA2988','56',NULL,0,'C:\\fakepath\\ccccccccc.PNG',0,'56','2018-12-17 11:07:38',1,1,1),(7,'TA1146','12121',NULL,0,'C:\\fakepath\\aaaaaaaaaaaa.PNG',0,'12','2018-12-17 11:08:14',1,1,2);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,NULL,'a',NULL),(2,NULL,'b',NULL),(3,NULL,'c',NULL);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-17 14:42:07
