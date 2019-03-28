-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: ludum_db
-- ------------------------------------------------------
-- Server version	8.0.15

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
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (0,'55315','Västra Storgatan 12','Jönköping');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `announcement_comments`
--

LOCK TABLES `announcement_comments` WRITE;
/*!40000 ALTER TABLE `announcement_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcement_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `announcement_materials`
--

LOCK TABLES `announcement_materials` WRITE;
/*!40000 ALTER TABLE `announcement_materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcement_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `assignment_comments`
--

LOCK TABLES `assignment_comments` WRITE;
/*!40000 ALTER TABLE `assignment_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignment_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `assignment_materials`
--

LOCK TABLES `assignment_materials` WRITE;
/*!40000 ALTER TABLE `assignment_materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignment_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('DAODAC0','Dator- och nätverksteknik','https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DDAO%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3','https://lh4.googleusercontent.com/-NTu7w33ISoI/VN0oq46CZTI/AAAAAAAAAWI/RCzYUnYqQbQ/w984-h209-no/19_flower.jpg','SY17','f9a825'),('ENGENG06','Engelska 6','https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DENG%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3','https://lh6.googleusercontent.com/-dmSrjGL4Eu8/VN0ouHRzFxI/AAAAAAAAAXc/TVbz4BB8a5I/w984-h209-no/32_tree.jpg','TE17B','f9a825'),('FYSFYS01a','Fysik 1a','https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DFYS%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3','https://lh4.googleusercontent.com/-Ze5AXIltkd0/VN0otDrb-6I/AAAAAAAAAXI/QrrpSFrBY3k/w984-h209-no/29_robots.jpg','TE17B','f9a825'),('IDRIDR01','Idrott & Hälsa 1','https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DIDR%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3','https://lh5.googleusercontent.com/-ZPVymv1eE4A/VMqrKxYt9TI/AAAAAAAAARI/stoLf-fFfIA/w1256-h267-no/33_chevron_hand_red.jpg','TE17B','f9a825'),('MATMAT03c','Matematik 3c','https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DMAT%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3','https://lh5.googleusercontent.com/-Fu7AEy1bRQs/VN0ojktkA4I/AAAAAAAAATE/73rXQ2D-iR0/w984-h209-no/13_drops.jpg','TE17B','f9a825'),('PRRPRR01','Programmering 1','https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DPRR%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3','https://lh3.googleusercontent.com/-x7r6Dqc5A-g/VN0oj5IZuLI/AAAAAAAAATU/J2FKVN78TbM/w984-h209-no/140_leaf_lightgreen.jpg','SY17','f9a825'),('SVESVE02','Svenska 2','https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DSVE%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3','https://lh6.googleusercontent.com/-7L8HfLghmCk/VN0orNiPTtI/AAAAAAAAAWM/KelIFiI2eNI/w984-h209-no/20_microphone.jpg','TE17B','f9a825'),('WEUWEB01','Webbutveckling 1','https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DWEU%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3','https://lh6.googleusercontent.com/-VgxGXhLZ4k0/VMqrI2p-7bI/AAAAAAAAARI/NLAgVKwP064/w1005-h214-no/129_rainbowtriangle_ltblue.jpg','SY17','f9a825');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `grade_requirement`
--

LOCK TABLES `grade_requirement` WRITE;
/*!40000 ALTER TABLE `grade_requirement` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (4,'Påminnelse om Plugg- och Mattestuga','Hej allihopa!\n\n\n\nNu är Pluggstugan och Mattestugan igång i Magenta och Cyan. Här finns lärare som har massor med tid till att hjälpa de elever som behöver stöd i studierna, jobba ikapp, planera sina studier, öva inför prov, plugga inför prövningar osv. Alla som inte ligger 100 % i fas med kurserna borde vara här. Det är nu ni har chansen! \n\n\n\nHälsningar Stina, rektor','2019-03-28 21:42:11',NULL,'sdasdasdasdasdasd1'),(5,'Tider för IT-support med Bea','Beatrice som har hand om IT-support på skolan har satt upp nya tider som hon är tilgänglig för detta endamål. Tiderna är: \n\n\n\nmån: 10-12\ntors: 13-15\n\n\n\nBea sitter i ett av rummen i korridoren till E-sport rummet.','2019-03-28 21:45:57',NULL,'sdasdfdfdfdfdf'),(6,'Låna bok skolbiblioteket','LÅNA BOK\n\nSka du låna en bok från skolbiblioteket? Det är enkelt!\n\n\n\nScanna QR-koden och fyll i formuläret så har du lånat boken i 1 månad.\n\nVill du låna den längre är det bara att fylla i formuläret igen. Du kan som mest låna boken 3 gånger i rad.\n\n\n\nNär du ska lämna tillbaka boken så lägger du den i \"facket\" på väggen utanför Agnes kontor (administrationen), är facket fullt eller boken är för tjock, lägg den på Agnes skrivbord.\n\n\n\nIngen QR-läsare?\n\nGå till formuläret via länken: https://goo.gl/forms/PpXhYWJhg4oo2QCI2\n\nFinns även på LBS.se under ”elevinformation”.\n\n\n\nFrågor? \n- Kontakta Agnes','2019-03-28 21:45:57',NULL,'sdasdfdfdfdfdf'),(7,'Ledighetsansökan','Ni kommer åt ledighetsansökan på hemsidan http://www.lbs.se/terminstider.\n\nKlicka här för direktlänk!','2019-03-28 21:45:57',NULL,'gffassafgsfdg'),(8,'Pluggstuga v. 11','Vecka 11 är det dags för utvecklingssamtal och då bryter vi undervisningen vid lunch. Varje eftermiddag finns möjlighet att få extra hjälp med sina studier i form av Räknestuga i Cyan och Pluggstuga i Magenta. Det kommer finnas lärare på plats mellan kl 13.00-15.45. Världens chans att ta tag i sina studier! Alla elever är välkomna!','2019-03-28 21:47:16',NULL,'sdasdasdasdasdasd1');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `news_comments`
--

LOCK TABLES `news_comments` WRITE;
/*!40000 ALTER TABLE `news_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `news_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `news_materials`
--

LOCK TABLES `news_materials` WRITE;
/*!40000 ALTER TABLE `news_materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `news_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `student_group`
--

LOCK TABLES `student_group` WRITE;
/*!40000 ALTER TABLE `student_group` DISABLE KEYS */;
INSERT INTO `student_group` VALUES ('SY17','Systemutvecklare 2017'),('TE17B','Teknik B 2017');
/*!40000 ALTER TABLE `student_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `student_guardians`
--

LOCK TABLES `student_guardians` WRITE;
/*!40000 ALTER TABLE `student_guardians` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_guardians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('gffassafgsfdg','Cecilia','Båge','https://www.lbs.se/wp-content/uploads/resized/b7/Cissi_680x532_4d214144e4293d8b5634690b1aad558f.jpg','cecilia.bage@test.lbs.se','1972-04-23',NULL,NULL,NULL),('hghsghsfghsfgh','Johan','Rosenströmer','https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg','johan.rosenstromer@test.lbs.se','1977-09-01',NULL,NULL,NULL),('hgshghgsgfhfsghsgfh','Daniel','Ståhl','https://www.lbs.se/wp-content/uploads/resized/27/Daniel_680x532_79a32f8c178f4470b904ad5b1fc55d1a.jpg','daniel.stahl@test.lbs.se','1977-02-15',NULL,NULL,NULL),('jhdghjdghjdghjdhhj','Linnea','Stenmarker','https://www.lbs.se/wp-content/uploads/resized/d7/Linnea_680x532_8e253261cd9b9ea7eb2aaa2298421524.jpg','linnea.stenmarker@test.lbs.se','1980-05-29',NULL,NULL,NULL),('kjdghdfghdfghdfgh','Robert','Eliasson','https://www.lbs.se/wp-content/uploads/resized/5c/Robban_680x532_89a30a9edabd148a402c1a76a973c256.jpg','robert.eliasson@test.lbs.se','1974-12-24',NULL,NULL,NULL),('kljshfgjkhslkjhsdfgkjlh','Erik','Johansson','https://www.lbs.se/wp-content/uploads/resized/fb/Erik_680x532_326a4b6e0eb78e0b7280828e42005fb0.jpg','erik.johansson@test.lbs.se','1991-02-13',NULL,NULL,NULL),('lkjasdflkjlkajsdfljkja','Anna','Lindkvist','https://lh3.googleusercontent.com/a-/AAuE7mDY36wgYaMQAxVVAaEGCJ0Z6BaNTFvotjpqOvjA','anna.lindkvist@test.lbs.se','1975-01-21',NULL,NULL,NULL),('sdasdasdasdasdasd1','Stina','Geijer','https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg','stina.geijer@test.lbs.se','1975-11-02',NULL,NULL,NULL),('sdasdfdfdfdfdf','Agnes','Johansson','https://www.lbs.se/wp-content/uploads/resized/7d/Agnes_680x532_ceeab99e798d0715ed48c78026829195.jpg','agnes.johansson@test.lbs.se','1986-03-12',NULL,NULL,NULL),('uadsfuiouadsifioujka','Rasmus','Hellström','https://www.lbs.se/wp-content/uploads/resized/71/Rasmus_680x532_fa0c0ddf672512f2a2f4b450a81bb40f.jpg','rasmus.hellstrom@test.lbs.se','1978-09-18',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_admins`
--

LOCK TABLES `user_admins` WRITE;
/*!40000 ALTER TABLE `user_admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_chats`
--

LOCK TABLES `user_chats` WRITE;
/*!40000 ALTER TABLE `user_chats` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_courses`
--

LOCK TABLES `user_courses` WRITE;
/*!40000 ALTER TABLE `user_courses` DISABLE KEYS */;
INSERT INTO `user_courses` VALUES ('kljshfgjkhslkjhsdfgkjlh','DAODAC0'),('uadsfuiouadsifioujka','ENGENG06'),('hgshghgsgfhfsghsgfh','FYSFYS01a'),('lkjasdflkjlkajsdfljkja','FYSFYS01a'),('hghsghsfghsfgh','IDRIDR01'),('jhdghjdghjdghjdhhj','MATMAT03c'),('kljshfgjkhslkjhsdfgkjlh','PRRPRR01'),('kjdghdfghdfghdfgh','SVESVE02'),('kljshfgjkhslkjhsdfgkjlh','WEUWEB01');
/*!40000 ALTER TABLE `user_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_student_groups`
--

LOCK TABLES `user_student_groups` WRITE;
/*!40000 ALTER TABLE `user_student_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_student_groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-29  0:31:56
