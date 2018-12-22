USE world;

-- List all the countries in this database
SELECT * FROM city;

# select all coloums from city
SELECT * FROM city ORDER BY Population;


#question 12 # correct 
SELECT * FROM city WHERE population > 5000000 ORDER BY Population DESC;
-- Retrieve all the countries and their life expectancy rate in descending order ****

#QUESTION 13 #correct
#Using the "world" database, retrieve the country name and continent of 
#all the countries in the world with names that end with "s"?
SELECT Name, Continent FROM country WHERE NAME like '%s';

# QUESTION 14
#Using the "world" database, retrieve the first 10 cities.  
#In other words, retrieve the first 10 rows?

USE world;
SELECT Name FROM city limit 10;

#QUESTION 15
#Using the "world" database, retrieve all the countries that 
#are in the continents of Asia and Europe?  
SELECT Name, Continent FROM country WHERE Continent IN ( 'Asia', 'Europe' );

# QUESTION 16
#Using the "world" database, retrieve all the countries in Africa 
#and their life expectancy rate?
USE world;
SELECT Name, Continent, LifeExpectancy FROM country WHERE Continent IN ( 'Africa' );
SELECT Name, LifeExpectancy FROM country WHERE Continent IN ( 'Africa' );

#QUESTION 17 
#Create new database called "DATS610210" – (5 points)

create database DATS610210; 

# create new table named "Students" 
USE DATS610210;

CREATE TABLE Students(
    studentid int,
    FirstName varchar(25) NULL,
    LastName varchar(25) NULL,
    Degree varchar(25) NULL,
    PRIMARY KEY (studentid)
);

-- Insert values to the new table --
INSERT INTO Students VALUES (1, 'James','Nicholson','B.S. in Computer Science'); # numbers you dont need quotation
INSERT INTO Students VALUES (2, 'Marie','Scott','M.S. in Electrical Engineering');
INSERT INTO Students VALUES (3, 'Kara','Bolivar','B.S. in Data Science');
INSERT INTO Students VALUES (4, 'John','Williams','M.S. in Public Education');

#Retrieve all the records from this new "Students" table - (5 points)

-- Query the Students table -- 
SELECT * FROM Students;

#Update StudentID 1 last name from "Nicholson" to "Johnson" - (5 points)
USE DATS610210;
SELECT * FROM Students;
UPDATE Students SET LastName = 'Johnson' WHERE studentid = 1;

#Retrieve the records where the StudentID is either 1 or 2 - (5 points)
SELECT * FROM Students where studentid in (1, 2)

#Delete the record where the StudentID is 4 - (5 points)
DELETE FROM Students WHERE studentid > 3;

#Drop this new "Students" table - (5 points)
DROP TABLE Students;



