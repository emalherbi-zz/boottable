DELIMITER ;

CREATE DATABASE  IF NOT EXISTS `boottable`;
USE `boottable`;

-- --------------------------------------------------------------------------------
-- TABLE
-- --------------------------------------------------------------------------------

CREATE TABLE `USER` (
  `ID_USER` smallint(6) NOT NULL auto_increment,
  `NAME` varchar(10) default NULL,
  `PASSWORD` varchar(10) default NULL,
  `ACTIVE` int(11) default 1,
  PRIMARY KEY  (`ID_USER`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------------------------------
-- STORED PROCEDURES
-- --------------------------------------------------------------------------------

DELIMITER $$

-- DROP PROCEDURE IF EXISTS `SX_USER`;
CREATE PROCEDURE `SX_USER`(
	INOUT PID_USER INT,
	IN PNAME VARCHAR(10),
	IN PPASSWORD VARCHAR(10), 
	IN PACTIVE INT
)
BEGIN
    INSERT INTO USER VALUES (PID_USER,PNAME,PPASSWORD,PACTIVE)
		ON DUPLICATE KEY
    UPDATE NAME=PNAME,PASSWORD=PPASSWORD,ACTIVE=PACTIVE;   
    
    SELECT LAST_INSERT_ID() INTO PID_USER;
END
