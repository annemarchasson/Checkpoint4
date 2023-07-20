-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema azart
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema azart
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `azart` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `azart` ;

-- -----------------------------------------------------
-- Table `azart`.`sunday_workshops`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `azart`.`sunday_workshops` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `organizer`VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `maxAttendees` INT NOT NULL,
  `currentAttendees` INT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `azart`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `azart`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `isAdmin` TINYINT(1) NULL DEFAULT '0',
  `address` VARCHAR(255) NOT NULL,
  `phoneNumber` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `azart`.`workshop_attendees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `azart`.`workshop_attendees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `workshopId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `workshopId` (`workshopId` ASC) VISIBLE,
  CONSTRAINT `workshop_attendees_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `azart`.`user` (`id`),
  CONSTRAINT `workshop_attendees_ibfk_2`
    FOREIGN KEY (`workshopId`)
    REFERENCES `azart`.`sunday_workshops` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `azart`.`workshop_organizers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `azart`.`workshop_organizers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `workshopId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `workshopId` (`workshopId` ASC) VISIBLE,
  CONSTRAINT `workshop_organizers_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `azart`.`user` (`id`),
  CONSTRAINT `workshop_organizers_ibfk_2`
    FOREIGN KEY (`workshopId`)
    REFERENCES `azart`.`sunday_workshops` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Création des tables

-- ...

-- INSERTION DES DONNÉES

-- Insertion des utilisateurs
INSERT INTO `azart`.`user` VALUES (1, 'Anne', 'Marchasson', 'annemarchasson@yahoo.fr', '2611', true, '18 chaussée watt 59100 Tourcoing', '0663634662');
INSERT INTO `azart`.`user` VALUES (2, 'Catherine', 'Tassier', 'catherinetassier@gmail.fr', '1234', false, '12 rue Bir Hakeim 59160 Lomme', '0606060606');
INSERT INTO `azart`.`user` VALUES (3, 'Sam', 'Smith', 'totosamsmith@gmail.fr', '5678', false, '3 rue de Gand 59000 Lille', '0606060606');

-- Insertion des ateliers du dimanche
INSERT INTO `azart`.`sunday_workshops` VALUES (1,'Anne', '2023-08-13 15:30:00', '18 chaussée watt 59100 Tourcoing', 10, 0);

-- Insertion des organisateurs et participants aux ateliers
INSERT INTO `azart`.`workshop_organizers` VALUES (1, 1, 1);
INSERT INTO `azart`.`workshop_attendees` VALUES (1, 2, 1);
INSERT INTO `azart`.`workshop_attendees` VALUES (2, 3, 1);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


