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
INSERT INTO `announcement` VALUES (1,'Till lektion 3 (onsdag/torsdag), v. 17\r \r Repetera enligt fliken \"Rep. Inför NP\" i länkat dokument.','2019-04-18 21:25:31','2019-04-21 17:50:23','MATMAT03c'),(2,'Tisdag, v. 17 (Studiedagen)\r \r Repetera kap 3 och 4, ifall diagnoserna inte gick som önskat.\r Om du var Nöjd med resultatet: ledig.','2019-04-18 21:27:40','2019-04-21 17:50:23','MATMAT03c'),(3,'Programmeringsuppgift - en instruktion.','2019-04-18 21:27:40','2019-04-18 21:27:40','MATMAT03c'),(4,'Diagnoser\nKap 3\nE-nivå: C3WaKM\nCA-nicå: 491Dst\n\nKap 4\nE-nivå: y5MV9P\nCA-nivå: K2Rqhx','2019-04-18 21:28:30','2019-04-18 21:28:30','MATMAT03c');
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `announcement_comments`
--

LOCK TABLES `announcement_comments` WRITE;
/*!40000 ALTER TABLE `announcement_comments` DISABLE KEYS */;
INSERT INTO `announcement_comments` VALUES (62,2),(63,1),(64,1),(65,1),(66,1),(68,1),(69,1),(70,1),(71,1),(72,1),(73,1),(74,1),(75,1),(76,1),(77,1),(78,1),(79,1),(81,1),(82,1),(83,1),(84,1),(85,1),(87,1),(95,1),(97,1),(104,1),(106,1),(107,1),(108,1),(109,1),(110,1),(111,1),(112,1),(113,1),(114,1);
/*!40000 ALTER TABLE `announcement_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `announcement_materials`
--

LOCK TABLES `announcement_materials` WRITE;
/*!40000 ALTER TABLE `announcement_materials` DISABLE KEYS */;
INSERT INTO `announcement_materials` VALUES (1,1),(1,2),(1,6),(1,8),(3,1),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12);
/*!40000 ALTER TABLE `announcement_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (1,'Prov kap. 1','Här är provet till kapitel 1! Gör ditt bästa på provet!','2019-05-11 23:59:00','2019-03-18 21:35:41','2019-04-18 21:38:34',NULL,'MATMAT03c','110882501398047352348'),(2,'Prov kap. 2','Här är provet till kapitel 2! Gör absolut inte ditt bästa på provet! :(','2019-06-01 23:59:00','2019-04-18 21:35:41','2019-04-18 21:35:41',NULL,'MATMAT03c','110882501398047352348');
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `assignment_comments`
--

LOCK TABLES `assignment_comments` WRITE;
/*!40000 ALTER TABLE `assignment_comments` DISABLE KEYS */;
INSERT INTO `assignment_comments` VALUES (1,57),(1,58),(2,59),(2,60),(2,61);
/*!40000 ALTER TABLE `assignment_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `assignment_materials`
--

LOCK TABLES `assignment_materials` WRITE;
/*!40000 ALTER TABLE `assignment_materials` DISABLE KEYS */;
INSERT INTO `assignment_materials` VALUES (1,3),(2,3),(2,4);
/*!40000 ALTER TABLE `assignment_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` VALUES (2,'tt','2019-04-18 20:45:23','2019-04-18 20:48:33',1,'jhdghjdghjdghjdhhj',NULL);
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (57,'bodyyy','2019-04-28 22:21:23','2019-04-28 22:21:23','110882501398047352348'),(58,'bodyyy','2019-04-28 22:23:09','2019-04-28 22:23:09','110882501398047352348'),(59,'bodyyy','2019-04-28 22:24:27','2019-04-28 22:24:27','110882501398047352348'),(60,'bodyyy','2019-04-28 22:27:10','2019-04-28 22:27:10','110882501398047352348'),(61,'bodyyy','2019-04-28 22:42:20','2019-04-28 22:42:20','110882501398047352348'),(62,'bodyyy','2019-04-28 22:43:09','2019-04-28 22:43:09','110882501398047352348'),(63,'Hello there','2019-04-28 23:08:50','2019-05-07 18:13:26','jhdghjdghjdghjdhhj'),(64,'General Kenobi...','2019-04-28 23:09:08','2019-04-28 23:36:29','110882501398047352348'),(65,'( ͠° ͜ʖ °)','2019-04-28 23:10:26','2019-05-07 18:13:26','jhdghjdghjdghjdhhj'),(66,'test','2019-04-30 00:12:24','2019-04-30 00:12:24','110882501398047352348'),(68,'eyyyyy','2019-04-30 00:14:48','2019-04-30 00:14:48','110882501398047352348'),(69,'test 47','2019-04-30 00:16:45','2019-04-30 00:16:45','110882501398047352348'),(70,'eyyy','2019-05-03 19:20:12','2019-05-03 19:20:12','110882501398047352348'),(71,'asdasdasd das Auto\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd','2019-05-03 19:24:03','2019-05-21 22:31:15','110882501398047352348'),(72,'yeet','2019-05-03 19:24:48','2019-05-03 19:24:48','110882501398047352348'),(73,'test','2019-05-03 19:26:32','2019-05-03 19:26:32','110882501398047352348'),(74,'test','2019-05-03 19:28:13','2019-05-07 18:13:26','jhdghjdghjdghjdhhj'),(75,'eeee','2019-05-03 19:28:46','2019-05-03 19:28:46','110882501398047352348'),(76,'ttt','2019-05-03 19:29:38','2019-05-03 19:29:38','110882501398047352348'),(77,'test','2019-05-03 19:35:06','2019-05-03 19:35:06','110882501398047352348'),(78,'yayeet','2019-05-03 19:36:41','2019-05-03 19:36:41','110882501398047352348'),(79,'ooof','2019-05-03 19:38:28','2019-05-03 19:38:28','110882501398047352348'),(81,'new comment here we goo booiiisssss\n\n\n\n\n\n\nit is multiline that is c o r r e c t hecc ye','2019-05-03 19:48:32','2019-05-03 19:48:32','110882501398047352348'),(82,'eyyyyy\n\n\n\n\ntest','2019-05-03 19:56:30','2019-05-03 19:56:30','110882501398047352348'),(83,'kommentar','2019-05-05 22:24:25','2019-05-05 22:24:25','110882501398047352348'),(84,'eyyyy','2019-05-06 23:52:07','2019-05-06 23:52:07','110882501398047352348'),(85,'test comment','2019-05-07 19:18:15','2019-05-07 19:18:15','110882501398047352348'),(87,'dafda','2019-05-11 00:01:41','2019-05-11 00:01:41','110882501398047352348'),(95,'asdfasdfasdf','2019-05-11 00:02:14','2019-05-11 00:02:14','110882501398047352348'),(97,'asdfasdfasdf','2019-05-11 00:02:22','2019-05-11 00:02:22','110882501398047352348'),(104,'test222','2019-05-11 15:57:47','2019-05-11 15:57:47','110882501398047352348'),(106,'this is a test','2019-05-11 21:30:56','2019-05-11 21:30:56','110882501398047352348'),(107,'testing once again\n\n\n\n\n\n\nayy lmao top 12','2019-05-11 21:35:53','2019-05-11 21:35:53','110882501398047352348'),(108,'cool cool','2019-05-11 21:36:46','2019-05-11 21:36:46','110882501398047352348'),(109,'new stateful commentbox!','2019-05-11 21:40:09','2019-05-11 21:40:09','110882501398047352348'),(110,'very najs','2019-05-11 22:14:56','2019-05-11 22:14:56','110882501398047352348'),(111,'asdasdasds\nasd\nas\nd\nasd\nas\nd\nasd\nas\nd\nasd\na\nsd\nasd\na\nsd\nasd\na\nsd\nasd\na\nsd\nhg\ngh\nfg\nkjgh\njgh\njgh\njg\nhjghj\ng\nhj\ngh\nj\nghj\n\n\njh\ngh\njg\nhj\ngh\nj\nghj\ng\nhj\ngh\njg\nhj\näö\nöä\nlåö\nläök\nläö\nkälöåk\nlöäk\nlöåk\nlöä\nkläö\nkläö\nkälö\näklöå\n\'lö¨\n¨hj\nk\'\'jh\nkhj\nk¨hj','2019-05-12 02:28:42','2019-05-12 02:28:42','110882501398047352348'),(112,'test','2019-05-21 20:58:23','2019-05-21 20:58:23','110882501398047352348'),(113,'test2','2019-05-21 21:02:57','2019-05-21 21:02:57','110882501398047352348'),(114,'this is a comment, please edit me D A D D Y\nasd\nasd','2019-05-21 21:31:08','2019-05-21 22:25:28','110882501398047352348');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('DAODAC0','Dator- och nätverksteknik','SY17','https://lh4.googleusercontent.com/-NTu7w33ISoI/VN0oq46CZTI/AAAAAAAAAWI/RCzYUnYqQbQ/w984-h209-no/19_flower.jpg','https://lh4.googleusercontent.com/-NTu7w33ISoI/VN0oq46CZTI/AAAAAAAAAWI/RCzYUnYqQbQ/w984-h209-no/19_flower.jpg','7627bb','cb8fff'),('ENGENG06','Engelska 6','TE17B','https://lh6.googleusercontent.com/-dmSrjGL4Eu8/VN0ouHRzFxI/AAAAAAAAAXc/TVbz4BB8a5I/w984-h209-no/32_tree.jpg','https://lh6.googleusercontent.com/-dmSrjGL4Eu8/VN0ouHRzFxI/AAAAAAAAAXc/TVbz4BB8a5I/w984-h209-no/32_tree.jpg','c26401','ff8c13'),('FYSFYS01a','Fysik 1a','TE17B','https://lh4.googleusercontent.com/-Ze5AXIltkd0/VN0otDrb-6I/AAAAAAAAAXI/QrrpSFrBY3k/w984-h209-no/29_robots.jpg','https://lh4.googleusercontent.com/-Ze5AXIltkd0/VN0otDrb-6I/AAAAAAAAAXI/QrrpSFrBY3k/w984-h209-no/29_robots.jpg','174ea6','75aaff'),('IDRIDR01','Idrott & Hälsa 1','TE17B','https://lh5.googleusercontent.com/-ZPVymv1eE4A/VMqrKxYt9TI/AAAAAAAAARI/stoLf-fFfIA/w1256-h267-no/33_chevron_hand_red.jpg','https://lh5.googleusercontent.com/-ZPVymv1eE4A/VMqrKxYt9TI/AAAAAAAAARI/stoLf-fFfIA/w1256-h267-no/33_chevron_hand_red.jpg','b80672','ff7acb'),('MATMAT03c','Matematik 3c','TE17B','https://lh5.googleusercontent.com/-Fu7AEy1bRQs/VN0ojktkA4I/AAAAAAAAATE/73rXQ2D-iR0/w984-h209-no/13_drops.jpg','https://lh5.googleusercontent.com/-Fu7AEy1bRQs/VN0ojktkA4I/AAAAAAAAATE/73rXQ2D-iR0/w984-h209-no/13_drops.jpg','7627bb','cb8fff'),('PRRPRR01','Programmering 1','SY17','https://lh3.googleusercontent.com/-x7r6Dqc5A-g/VN0oj5IZuLI/AAAAAAAAATU/J2FKVN78TbM/w984-h209-no/140_leaf_lightgreen.jpg','https://lh3.googleusercontent.com/-x7r6Dqc5A-g/VN0oj5IZuLI/AAAAAAAAATU/J2FKVN78TbM/w984-h209-no/140_leaf_lightgreen.jpg','137333','23c358'),('SVESVE02','Svenska 2','TE17B','https://lh6.googleusercontent.com/-7L8HfLghmCk/VN0orNiPTtI/AAAAAAAAAWM/KelIFiI2eNI/w984-h209-no/20_microphone.jpg','https://lh6.googleusercontent.com/-7L8HfLghmCk/VN0orNiPTtI/AAAAAAAAAWM/KelIFiI2eNI/w984-h209-no/20_microphone.jpg','202124','a2a8bb'),('WEUWEB01','Webbutveckling 1','SY17','https://lh6.googleusercontent.com/-VgxGXhLZ4k0/VMqrI2p-7bI/AAAAAAAAARI/NLAgVKwP064/w1005-h214-no/129_rainbowtriangle_ltblue.jpg','https://lh6.googleusercontent.com/-VgxGXhLZ4k0/VMqrI2p-7bI/AAAAAAAAARI/NLAgVKwP064/w1005-h214-no/129_rainbowtriangle_ltblue.jpg','174ea6','75aaff');
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
INSERT INTO `material` VALUES (1,'https://drive.google.com/open?id=1rSeH_qBsQojzIJ-zAhM2SdiwMWzxfzAWbdm7S6clVY0'),(2,'https://drive.google.com/open?id=1Tiew5N22DmR1ASjYB0LeV1ZGgf_kCmgNa05BS1slqTY'),(3,'https://www.kunskapsmatrisen.se/'),(4,'https://docs.google.com/spreadsheets/u/0/'),(5,'https://docs.google.com/document/d/1Tiew5N22DmR1ASjYB0LeV1ZGgf_kCmgNa05BS1slqTY/edit'),(6,'https://www.youtube.com/watch?v=R_W7epN8Mec'),(7,'https://www.youtube.com/watch?v=krBZhNyCJfM'),(8,'https://drive.google.com/open?id=0B9kQzOpiqBrNV1kyZGZZZEVoVVU'),(9,'https://drive.google.com/open?id=0B9kQzOpiqBrNLUlkcldEb1M4VEE'),(10,'https://drive.google.com/open?id=0B9kQzOpiqBrNZUVpNi1OVlphUmc'),(11,'https://murt.in/'),(12,'https://docs.google.com/forms/d/e/1FAIpQLSepoRzBOpXOdtRHJ6g-TAgi3smunEVrli-mJgIl4pbSzF5Qkg/viewform');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (4,'Påminnelse om Plugg- och Mattestuga','Hej allihopa!\r \r \r \r Nu är Pluggstugan och Mattestugan igång i Magenta och Cyan. Här finns lärare som har massor med tid till att hjälpa de elever som behöver stöd i studierna, jobba ikapp, planera sina studier, öva inför prov, plugga inför prövningar osv. Alla som inte ligger 100 % i fas med kurserna borde vara här. Det är nu ni har chansen! \r \r \r \r Hälsningar Stina, rektor','2019-03-30 21:42:11','2019-04-21 16:40:31','sdasdasdasdasdasd1'),(5,'Tider för IT-support med Bea','Beatrice som har hand om IT-support på skolan har satt upp nya tider som hon är tilgänglig för detta endamål. Tiderna är: \n\n\n\nmån: 10-12\ntors: 13-15\n\n\n\nBea sitter i ett av rummen i korridoren till E-sport rummet.','2019-03-28 21:45:57','2019-03-28 21:45:57','sdasdfdfdfdfdf'),(6,'Låna bok skolbiblioteket','LÅNA BOK\n\nSka du låna en bok från skolbiblioteket? Det är enkelt!\n\n\n\nScanna QR-koden och fyll i formuläret så har du lånat boken i 1 månad.\n\nVill du låna den längre är det bara att fylla i formuläret igen. Du kan som mest låna boken 3 gånger i rad.\n\n\n\nNär du ska lämna tillbaka boken så lägger du den i \"facket\" på väggen utanför Agnes kontor (administrationen), är facket fullt eller boken är för tjock, lägg den på Agnes skrivbord.\n\n\n\nIngen QR-läsare?\n\nGå till formuläret via länken: https://goo.gl/forms/PpXhYWJhg4oo2QCI2\n\nFinns även på LBS.se under ”elevinformation”.\n\n\n\nFrågor? \n- Kontakta Agnes','2019-03-28 21:45:57','2019-03-28 21:45:57','sdasdfdfdfdfdf'),(7,'Ledighetsansökan','Ni kommer åt ledighetsansökan på hemsidan http://www.lbs.se/terminstider.\n\nKlicka här för direktlänk!','2019-03-28 21:45:57','2019-03-28 21:45:57','gffassafgsfdg'),(8,'Pluggstuga v. 11','Vecka 11 är det dags för utvecklingssamtal och då bryter vi undervisningen vid lunch. Varje eftermiddag finns möjlighet att få extra hjälp med sina studier i form av Räknestuga i Cyan och Pluggstuga i Magenta. Det kommer finnas lärare på plats mellan kl 13.00-15.45. Världens chans att ta tag i sina studier! Alla elever är välkomna!','2019-03-28 21:47:16','2019-03-28 21:47:16','sdasdasdasdasdasd1');
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
INSERT INTO `school` VALUES (1,'LBS Jönköping','https://static1.squarespace.com/static/59b2858d8419c20a25b8689e/t/5a0878dcc83025174d07093a/1535460743875/LBS.png','Ljud- och Bild-Skolan i Jönköping',0,'elev.ga.lbs.se');
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('5ounKeu06wlagq_23m9CFlpRi9_RYcjj',1558557076,'{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2019-05-22T20:13:38.303Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"user\":{\"iss\":\"accounts.google.com\",\"azp\":\"425892769172-0jb5mo5gm07avnjraabf75pkula2uv65.apps.googleusercontent.com\",\"aud\":\"425892769172-0jb5mo5gm07avnjraabf75pkula2uv65.apps.googleusercontent.com\",\"sub\":\"110882501398047352348\",\"hd\":\"elev.ga.lbs.se\",\"email\":\"martin.jonsson@elev.ga.lbs.se\",\"email_verified\":true,\"at_hash\":\"KRcfN6cx2fCtNJqm0Jt3Ww\",\"name\":\"Martin Jonsson\",\"picture\":\"https://lh6.googleusercontent.com/-3dPWeQ4BbYg/AAAAAAAAAAI/AAAAAAAAAAg/4TBODT-6Sic/s96-c/photo.jpg\",\"given_name\":\"Martin\",\"family_name\":\"Jonsson\",\"locale\":\"sv\",\"iat\":1558469273,\"exp\":1558472873,\"jti\":\"61ffa29083185fdf294a464f504c7f2398738548\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
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
INSERT INTO `user` VALUES ('110882501398047352348','Martin','Jonsson','https://lh6.googleusercontent.com/-3dPWeQ4BbYg/AAAAAAAAAAI/AAAAAAAAAAg/4TBODT-6Sic/s96-c/photo.jpg','martin.jonsson@elev.ga.lbs.se',NULL,NULL,NULL,NULL),('11231231231231','test1','test1','test1','test1',NULL,NULL,NULL,NULL),('24524524352345235','test3','test3','test3','test3',NULL,NULL,NULL,NULL),('542524523452345234','test2','test2','test2','test2',NULL,NULL,NULL,NULL),('56335634563456','test4','test4','test4','test4',NULL,NULL,NULL,NULL),('gffassafgsfdg','Cecilia','Båge','https://www.lbs.se/wp-content/uploads/resized/b7/Cissi_680x532_4d214144e4293d8b5634690b1aad558f.jpg','cecilia.bage@test.lbs.se','1972-04-23',NULL,NULL,NULL),('hghsghsfghsfgh','Johan','Rosenströmer','https://www.lbs.se/wp-content/uploads/resized/3f/Johan-R_680x532_ec07ca4ea57812259a9e4facc510b29a.jpg','johan.rosenstromer@test.lbs.se','1977-09-01',NULL,NULL,NULL),('hgshghgsgfhfsghsgfh','Daniel','Ståhl','https://www.lbs.se/wp-content/uploads/resized/27/Daniel_680x532_79a32f8c178f4470b904ad5b1fc55d1a.jpg','daniel.stahl@test.lbs.se','1977-02-15',NULL,NULL,NULL),('jhdghjdghjdghjdhhj','Linnea','Stenmarker','https://www.lbs.se/wp-content/uploads/resized/d7/Linnea_680x532_8e253261cd9b9ea7eb2aaa2298421524.jpg','linnea.stenmarker@test.lbs.se','1980-05-29',NULL,NULL,NULL),('kjdghdfghdfghdfgh','Robert','Eliasson','https://www.lbs.se/wp-content/uploads/resized/5c/Robban_680x532_89a30a9edabd148a402c1a76a973c256.jpg','robert.eliasson@test.lbs.se','1974-12-24',NULL,NULL,NULL),('kljshfgjkhslkjhsdfgkjlh','Erik','Johansson','https://www.lbs.se/wp-content/uploads/resized/fb/Erik_680x532_326a4b6e0eb78e0b7280828e42005fb0.jpg','erik.johansson@test.lbs.se','1991-02-13',NULL,NULL,NULL),('lkjasdflkjlkajsdfljkja','Anna','Lindkvist','https://lh3.googleusercontent.com/a-/AAuE7mDY36wgYaMQAxVVAaEGCJ0Z6BaNTFvotjpqOvjA','anna.lindkvist@test.lbs.se','1975-01-21',NULL,NULL,NULL),('sdasdasdasdasdasd1','Stina','Geijer','https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg','stina.geijer@test.lbs.se','1975-11-02',NULL,NULL,NULL),('sdasdfdfdfdfdf','Agnes','Johansson','https://www.lbs.se/wp-content/uploads/resized/7d/Agnes_680x532_ceeab99e798d0715ed48c78026829195.jpg','agnes.johansson@test.lbs.se','1986-03-12',NULL,NULL,NULL),('uadsfuiouadsifioujka','Rasmus','Hellström','https://www.lbs.se/wp-content/uploads/resized/71/Rasmus_680x532_fa0c0ddf672512f2a2f4b450a81bb40f.jpg','rasmus.hellstrom@test.lbs.se','1978-09-18',NULL,NULL,NULL);
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
INSERT INTO `user_student_groups` VALUES ('SY17','110882501398047352348'),('SY17','11231231231231'),('SY17','24524524352345235'),('TE17B','110882501398047352348'),('TE17B','542524523452345234'),('TE17B','56335634563456');
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

-- Dump completed on 2019-05-21 22:46:48
