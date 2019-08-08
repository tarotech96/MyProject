-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: testonline1
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
-- Table structure for table `cmcconnect`
--

DROP TABLE IF EXISTS `cmcconnect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cmcconnect` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(225) NOT NULL,
  `is_show` bit(1) DEFAULT NULL,
  `label` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmcconnect`
--

LOCK TABLES `cmcconnect` WRITE;
/*!40000 ALTER TABLE `cmcconnect` DISABLE KEYS */;
/*!40000 ALTER TABLE `cmcconnect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmcer`
--

DROP TABLE IF EXISTS `cmcer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cmcer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(215) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `employee_position` varchar(160) NOT NULL,
  `icon_img` varchar(225) NOT NULL,
  `img` varchar(225) NOT NULL,
  `is_show` bit(1) DEFAULT NULL,
  `title` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmcer`
--

LOCK TABLES `cmcer` WRITE;
/*!40000 ALTER TABLE `cmcer` DISABLE KEYS */;
/*!40000 ALTER TABLE `cmcer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmcjob`
--

DROP TABLE IF EXISTS `cmcjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cmcjob` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_show` bit(1) DEFAULT NULL,
  `job_name` varchar(120) NOT NULL,
  `link_content` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmcjob`
--

LOCK TABLES `cmcjob` WRITE;
/*!40000 ALTER TABLE `cmcjob` DISABLE KEYS */;
/*!40000 ALTER TABLE `cmcjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmclife`
--

DROP TABLE IF EXISTS `cmclife`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cmclife` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cmclife_content` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `is_show` bit(1) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmclife`
--

LOCK TABLES `cmclife` WRITE;
/*!40000 ALTER TABLE `cmclife` DISABLE KEYS */;
/*!40000 ALTER TABLE `cmclife` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `news_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `FKnxm8x9npdhuwxv2x2wxsghm17` (`news_id`),
  CONSTRAINT `FKnxm8x9npdhuwxv2x2wxsghm17` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (2),(2),(2);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hr`
--

DROP TABLE IF EXISTS `hr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `hr_type` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hr`
--

LOCK TABLES `hr` WRITE;
/*!40000 ALTER TABLE `hr` DISABLE KEYS */;
INSERT INTO `hr` VALUES (1,'sdff',_binary '');
/*!40000 ALTER TABLE `hr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(30) NOT NULL,
  `controller` varchar(30) NOT NULL,
  `description` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (3,'list','role','role','Role',0),(4,'list','users','user','User',0),(5,'list','permission','permission','Permission',0),(6,'list','menu','menu','Menu',0),(7,'getAllUserRole','users','user role','Users Role',0),(8,'getAllRoleMenu','role','role menu','Role Menu',0),(9,'getAllRolePermission','role','role permission','Role Permission',0);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active_status` tinyint(4) DEFAULT NULL,
  `confirm_date` varchar(255) DEFAULT NULL,
  `content` varchar(10000) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL,
  `the_description` varchar(600) DEFAULT NULL,
  `img_url` varchar(500) DEFAULT NULL,
  `pinned` tinyint(4) DEFAULT NULL,
  `title` varchar(600) DEFAULT NULL,
  `up_status` varchar(255) DEFAULT NULL,
  `confirm_leader` int(11) DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `FK9duokf7vq21qp5e14lre3y0u3` (`confirm_leader`),
  KEY `FKk3g777gvy3gfmi8xuyughukap` (`creator`),
  CONSTRAINT `FK9duokf7vq21qp5e14lre3y0u3` FOREIGN KEY (`confirm_leader`) REFERENCES `hr` (`id`),
  CONSTRAINT `FKk3g777gvy3gfmi8xuyughukap` FOREIGN KEY (`creator`) REFERENCES `hr` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,0,NULL,'<h2 class=\"short_intro\" style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 0px 0px 12px; text-rendering: geometricprecision; font-variant-numeric: normal; font-variant-east-asian: normal; font-weight: 700; font-stretch: normal; font-size: 20px; line-height: 25px; font-family: arial; color: rgb(51, 51, 51);\">Cựu danh thủ Thể Công hài lòng với màn trình diễn và kết quả 2-2 của Việt Nam ở lượt đi chung kết AFF Cup 2018 với Malaysia.</h2><div class=\"relative_new\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; float: left; width: 720px; color: rgb(51, 51, 51); font-family: arial; font-size: 14px;\"><ul class=\"list_news_dot_3x3_300\" style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 10px 0px; text-rendering: geometricprecision; list-style-type: none;\"><li style=\"margin: 0px; padding: 0px 0px 5px 15px; text-rendering: geometricprecision; list-style-type: none; position: relative; background: none;\"><a alt=\"Đình Trọng: \'Việt Nam sẽ cố giữ sạch lưới ở chung kết lượt về\'\" title=\"Đình Trọng: \'Việt Nam sẽ cố giữ sạch lưới ở chung kết lượt về\'\" href=\"https://thethao.vnexpress.net/tin-tuc/tin-tuc/dinh-trong-viet-nam-se-co-giu-sach-luoi-o-chung-ket-luot-ve-3852796.html\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; color: rgb(102, 102, 102); font-size: 16px; line-height: 20.8px; font-family: Roboto, sans-serif;\">Đình Trọng: \'Việt Nam sẽ cố giữ sạch lưới ở chung kết lượt về\'</a>&nbsp;/&nbsp;<a alt=\"Safawi: \'Malaysia có cơ hội gây bất ngờ trên sân Việt nam\'\" title=\"Safawi: \'Malaysia có cơ hội gây bất ngờ trên sân Việt nam\'\" href=\"https://thethao.vnexpress.net/tin-tuc/tin-tuc/safawi-malaysia-co-co-hoi-gay-bat-ngo-tren-san-viet-nam-3852878.html\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; color: rgb(102, 102, 102); font-size: 16px; line-height: 20.8px; font-family: Roboto, sans-serif;\">Safawi: \'Malaysia có cơ hội gây bất ngờ trên sân Việt nam\'</a></li></ul></div><div class=\"fck_detail width_common block_ads_connect\" style=\"margin: 0px; padding: 0px 0px 10px; text-rendering: geometricprecision; width: 720px; float: left; color: rgb(51, 51, 51); font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 17px; line-height: 22px; font-family: arial;\"><table align=\"center\" border=\"0\" cellpadding=\"3\" cellspacing=\"0\" class=\"tplCaption\" style=\"margin: 10px auto; padding: 0px; text-rendering: geometricprecision; max-width: 100%; position: relative; width: 720px;\"><tbody style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\"><tr style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\"><td style=\"margin: 0px; padding: 0px 0px 465px; text-rendering: geometricprecision; border: 0px; line-height: 0; background: rgb(204, 204, 204); position: relative;\"><img alt=\"Huy Hùng (số 29) ghi bàn ngay trận đá chính đầu tiên ở AFF Cup năm nay, trước khi Đức Huy (số 15) nhân đôi cách biệt cho Việt Nam. Ảnh: Đức Đồng.&nbsp;\" data-natural-h=\"465\" data-natural-width=\"720\" src=\"https://i-thethao.vnecdn.net/2018/12/12/anh-top-3295-1544600766.jpg\" data-width=\"720\" data-pwidth=\"720\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; border-width: 0px; border-color: initial; border-image: initial; font-size: 0px; line-height: 0; max-width: 100%; vertical-align: top; width: 720px; position: absolute;\"><div style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; position: absolute; bottom: 0px; left: 0px;\"><ins class=\"adsbyeclick\" ad_oninit=\"2\" ad_inimage=\"465\" data-zone=\"5537\" data-ad-width=\"720\" data-ad-height=\"1\" data-adsbyeclick=\"done\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\"></ins><div id=\"eclick_ads_frame1_wrap\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; width: 720px; height: auto;\"><div class=\"eclick height_100 width_720 list_0item \" data-zone-id=\"5537\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\"><div class=\"eclick_banner\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\"><div class=\"list_item_eclick_banner\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\"><div class=\"item_banner_eclick\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\"><div class=\"html5_banner_holder\" data-banner-id=\"2000114363\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; float: left; position: relative; width: 720px; height: 100px; z-index: 1;\"><iframe src=\"https://static.eclick.vn/html5/2018/sg/rmd/in-images/m/matbao/1212/domain/pc/3/index.html?link=http%3A%2F%2Fc.eclick.vn%2Fr%3Fbeacon%3Dzizmznznzlzjzlzkzjzlzozmzmzgzkzozlzgzmzjzozizmzmzrzg2pzhzjzjzjzjzhzgzizjzk2pzhzjzjzjziziznzgzlzgzozizjzizdzqzqzdziznzdzizqzlzo242dzqzm2ezh2j2g212jzj212h2g2kzj%26link%3Dhttps%253A%252F%252Fc.eclick.vn%252Fr%252F2000114363%252F5537%252Fzizmznznzlzjzlzkzjzlzozmzmzgzkzozhzjzjzjziziznzgzlzgzozizjzizdzqzqzdziznzdzizqzlzo242dzqzm2ezh2j2g212jzj212h2g2kzj%252Fhttps%253A%252F%252Fwww.matbao.net%252Femail-chuyen-nghiep.html%253Futm_source%253Declick%2526utm_medium%253Dundefined_cpm%2526utm_campaign%253D2000023107%2526utm_content%253D%255Bpageurl%255D%26bid%3D2000114363%26gid%3D2000114363%26ts%3D1544606706%26url%3Dhttps%253A%252F%252Fthethao.vnexpress.net%252Ftin-tuc%252Fbinh-luan%252Fong-nguyen-sy-hien-neu-khong-phai-ha-duc-chinh-chac-gi-co-co-hoi-ma-bo-lo-3853052.html%26urlref%3Dhttps%253A%252F%252Fvnexpress.net%252F%26hostname%3Dthethao.vnexpress.net%26tsv%3D1544606706%26res%3D1280x720%26zone_format%3D121%26loc%3D24-2-vn%26lp%3D24%26lz%3D2%26lc%3Dvn%26fosp_aid%3Dip95w2zudz0dtuy0%26gender%3D3%26rand%3D-1733802116%26method%3D2%26device%3D1%26os%3D%26v%3D4&amp;otherlink=\" width=\"720\" height=\"100\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" vspace=\"0\" hspace=\"0\" allowtransparency=\"true\" scrolling=\"no\" allowfullscreen=\"true\" id=\"html5_frame_holder\" name=\"html5_frame_holder\" class=\"ad_frame_protection\" style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; width: 720px; left: 0px; bottom: 0px; position: absolute;\"></iframe></div></div></div></div></div></div></div></td></tr><tr style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\"><td style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision; border: 0px; line-height: 0;\"><p class=\"Image\" style=\"margin-right: 0px; margin-left: 0px; padding: 10px; text-rendering: geometricprecision; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 15px; line-height: 19.5px; color: rgb(102, 102, 102); background: rgb(245, 245, 245); clear: both;\">Huy Hùng (số 29) ghi bàn ngay trận đá chính đầu tiên ở AFF Cup năm nay, trước khi Đức Huy (số 15) nhân đôi cách biệt cho Việt Nam. Ảnh:&nbsp;<em style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\">Đức Đồng.</em></p></td></tr></tbody></table><p class=\"Normal\" style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; text-rendering: geometricprecision; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; line-height: 22.1px; clear: both;\"><em style=\"margin: 0px; padding: 0px; text-rendering: geometricprecision;\">- Ở chung kết lượt đi AFF Cup 2018, HLV Park Hang-seo đã sử dụng hai cầu thủ chưa đá chính lần nào tại giải là Huy Hùng và Đức Chinh. Ông đánh giá như nào về cách bố trí nhân sự này?</em></p><p class=\"Normal\" style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; text-rendering: geometricprecision; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; line-height: 22.1px; clear: both;\">- HLV Park Hang-seo&nbsp;có cái lý của mình khi sắp xếp như vậy. Đức Chinh là một tiền đạo có tốc độ, tì đè và làm tường tốt. Ở mặt trận phòng ngự, cậu ấy có thể pressing tuyến phòng ngự Malaysia ngay trên phần sân đối phương nhờ thể lực và sức trẻ.&nbsp;Ông Park có thể muốn sử dụng Đức Chinh như dạng một \"chim mồi\", để nhả những đường bóng lại cho tuyến hai băng lên dứt điểm, giống như cách Văn Đức dọn cỗ cho Đức Huy nâng tỷ số lên 2-0. Một khả năng nữa khi sử dụng Đức Chinh, đó là ông Park muốn giữ sức cho tiền đạo chủ lực Anh Đức. Chúng ta đều biết, Malaysia có thể lực rất tốt. Trong những phút cuối trận, họ chứng tỏ được ưu thế này trước Việt Nam. Với thể thức đá chung kết lượt đi và về, một HLV cần phải tính toán làm sao để cầu thủ chơi tốt cả hai trận, chứ không phải bung hết sức trong 90 phút là xong. Tôi nghĩ, nhiệm vụ chính của Đức Chinh khi làm khách của Malaysia là quấy phá. Bằng chứng là khi thay cầu thủ này, HLV Park Hang-seo cũng sử dụng một tiền đạo trẻ là Tiến Linh để ngăn không cho Malaysia tăng sức ép lên phần sân Việt Nam.</p><p class=\"Normal\" style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; text-rendering: geometricprecision; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; line-height: 22.1px; clear: both;\">Về vị trí của Huy Hùng, tôi nghĩ cũng là xứng đáng. Cậu ấy đã được làm quen với không khí ở AFF Cup khi hai lần vào sân từ ghế dự bị. Ở trận bán kết lượt về, Huy Hùng được đá khoảng 30 phút. Như thế có nghĩa, ông Park đã tính tới khả năng sử dụng cầu thủ này từ trước, và tạo cho học trò cơ hội bắt nhịp với đồng đội. Huy Hùng là một tiền vệ phòng ngự đúng nghĩa, khi kết hợp với Đức Huy sẽ tạo thành bức tường vững chắc trước hàng thủ. Thực tế cho thấy, tiền vệ này không những hoàn thành nhiệm vụ đánh chặn, phòng ngự từ xa mà còn xuất sắc ghi bàn mở tỷ số.</p></div>','12-12-2018','Ông đánh giá như nào về cách bố trí nhân sự này?  - HLÔng đánh giá như nào về cách bố trí nhân sự này?  - HLÔng đánh giá như nào về cách bố trí nhân sự này?  - HLÔng đánh giá như nào về cách bố trí nhân sự này?  - HL','https://i-thethao.vnecdn.net/2018/12/12/anh-top-3295-1544600766.jpg',0,'HLV Park Hang-seo đã sử dụng hai cầu thủ chưa đá chính lần nào tại giải là Huy Hùng và Đức Chinh. V Park Hang-seo có cái lý của mình khi sắp xếp như vậy. Đức Chin','pending',NULL,1);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_tags`
--

DROP TABLE IF EXISTS `news_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `news_tags` (
  `newsid` int(11) NOT NULL,
  `tagsid` int(11) NOT NULL,
  KEY `FKe9swtw7b5dn1n3lgfu28q7sda` (`tagsid`),
  KEY `FKi9pd1ntlhtbh5jpvoh8kog1ct` (`newsid`),
  CONSTRAINT `FKe9swtw7b5dn1n3lgfu28q7sda` FOREIGN KEY (`tagsid`) REFERENCES `tags` (`id`),
  CONSTRAINT `FKi9pd1ntlhtbh5jpvoh8kog1ct` FOREIGN KEY (`newsid`) REFERENCES `news` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_tags`
--

LOCK TABLES `news_tags` WRITE;
/*!40000 ALTER TABLE `news_tags` DISABLE KEYS */;
INSERT INTO `news_tags` VALUES (1,2);
/*!40000 ALTER TABLE `news_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(30) NOT NULL,
  `controller` varchar(30) NOT NULL,
  `description` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'insert','users','add User','Add'),(2,'update','users','update User','Update'),(3,'delete','users','Delete','Delete User'),(4,'insert','news','them moi','Insert'),(5,'insert','role','add new Role','Add Role'),(6,'update','role','edit role','Edit Role'),(7,'delete','role','delete role','Delete Role'),(8,'delete','news','delete User','Add User'),(9,'update','news','update user','Update User'),(11,'insert','permission','add permission','Add Permission'),(12,'update','permission','update permission','Update Permission'),(13,'delete','permission','delete permission','Delete Permission'),(14,'insert','menu','add menu','Add Menu'),(15,'update','menu','update Menu','Update Menu'),(16,'delete','menu','delete Menu','Delete Menu'),(17,'list','users','Get List User','List User');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'user','User'),(2,'admin','Admin'),(3,'manager','Manager'),(4,'content','Content');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_menu`
--

DROP TABLE IF EXISTS `role_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role_menu` (
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`menu_id`),
  KEY `FKfg4e2mb2318tph615gh44ll3` (`menu_id`),
  CONSTRAINT `FKfg4e2mb2318tph615gh44ll3` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`),
  CONSTRAINT `FKqyvxw2gg2qk0wld3bqfcb58vq` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_menu`
--

LOCK TABLES `role_menu` WRITE;
/*!40000 ALTER TABLE `role_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role_permission` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `FKf8yllw1ecvwqy3ehyxawqa1qp` (`permission_id`),
  CONSTRAINT `FKa6jx8n8xkesmjmv6jqug6bg68` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKf8yllw1ecvwqy3ehyxawqa1qp` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8),(2,9),(2,11),(2,12),(2,13),(2,14),(2,15),(2,16),(2,17);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slide_bar`
--

DROP TABLE IF EXISTS `slide_bar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `slide_bar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(225) NOT NULL,
  `is_show` bit(1) DEFAULT NULL,
  `slogan` varchar(260) NOT NULL,
  `title` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slide_bar`
--

LOCK TABLES `slide_bar` WRITE;
/*!40000 ALTER TABLE `slide_bar` DISABLE KEYS */;
/*!40000 ALTER TABLE `slide_bar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'dfgdfgfd'),(2,'gdfdgdfg');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'tiep@gmail.com','nvtiep','$2a$10$DpXxRBFxoukcK7Zjrw55EuJJ5oVCtDxp.h/KjWXuQE1u4FAvDOGoG',1),(5,'tu3297@gmail.com','nvtu','$2a$10$dBn5yTratRCgF4sVl9lvEuZncNjGDGyl68yARdA4QZHqif/em1PMS',1),(6,'dttien@gmail.com','dttien','$2a$10$lKotyTmAHlpiSQ1hPk5yruIpU7mL5rbjy7dsb.aWl/aGPIMFA5Wpq',1),(7,'cong@gmail','nvcong','$2a$10$dfUWOYm6vals4ui.iJ1SY.feCnF/d73W66aytcBsSilkvn8RmeBoy',1),(8,'duc@gamil.com','ndduc             saasaas','$2a$10$QgzPHXVkC5l8cGmWjdgFi.G4denFdvAXWiKnkWXpd5wAD0kYgzHky',1),(10,'a@gmail.com','zxv zVcxzv','$2a$10$GnwuM3jNxVWPCW6GDo3wguZeyMBsoSoXZjcuntjN1OHV3iW8nKKlO',1),(12,'pdttuananh@gmail.com','pdtuananh','$2a$10$A2/CVBbn0/ouIYxCgZc5A.yPn9Ija6KuydY0v6eTHnkIYFak.PpoW',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_role`
--

DROP TABLE IF EXISTS `users_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users_role` (
  `users_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`users_id`,`role_id`),
  KEY `FK3qjq7qsiigxa82jgk0i0wuq3g` (`role_id`),
  CONSTRAINT `FK3qjq7qsiigxa82jgk0i0wuq3g` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKiu0xsee0dmwa28nffgyf4bcvc` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_role`
--

LOCK TABLES `users_role` WRITE;
/*!40000 ALTER TABLE `users_role` DISABLE KEYS */;
INSERT INTO `users_role` VALUES (4,1),(5,1),(6,1),(7,1),(8,1),(10,1),(12,1),(5,2),(6,2);
/*!40000 ALTER TABLE `users_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whycmc`
--

DROP TABLE IF EXISTS `whycmc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `whycmc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `whycmccontent` varchar(255) NOT NULL,
  `is_show` bit(1) DEFAULT NULL,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whycmc`
--

LOCK TABLES `whycmc` WRITE;
/*!40000 ALTER TABLE `whycmc` DISABLE KEYS */;
/*!40000 ALTER TABLE `whycmc` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-17 15:42:19
