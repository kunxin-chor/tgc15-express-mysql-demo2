-- assume we to insert the actor Keanu Reeves
--
INSERT INTO actor (first_name, last_name) VALUES ('Keanu', 'Reeves');

UPDATE actor SET first_name="LANDRA", last_name="SECK"
             WHERE actor_id = 30;

DELETE FROM actor WHERE actor_id = 202;

SELECT city, country FROM city JOIN country
ON city.country_id = country.country_id;

SELECT * from film_actor  JOIN actor 
                          ON film_actor.actor_id = actor.actor_id
                          WHERE film_id = 1004;

SELECT * FROM film 
                            JOIN language
                            ON film.language_id = language.language_id
                            WHERE film_id = 1