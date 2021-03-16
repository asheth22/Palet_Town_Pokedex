DROP DATABASE IF EXISTS pokemon; 
CREATE DATABASE pokemon;

use pokemon;
create table pokecharacter (
  id INT NOT NULL AUTO_INCREMENT,  
  pokeName  VARCHAR(45) NOT NULL,
  energyType VARCHAR(45) NOT NULL,
  cardId INT(10) NOT NULL,
  attack VARCHAR(45) NOT NULL,
  nickname VARCHAR(45),
  PRIMARY KEY (id)
);