CREATE TABLE airlines (
id int CONSTRAINT airlines_id_unique UNIQUE,
abbreviation VARCHAR(6) CONSTRAINT airlines_abr_pk PRIMARY KEY,
name VARCHAR NOT NULL,
rating float NOT NULL
);

CREATE TABLE continents (
id int CONSTRAINT continents_id_pk PRIMARY KEY,
name VARCHAR
);

CREATE TABLE countries (
id int CONSTRAINT countries_id_pk PRIMARY KEY,
continent_id INT, 
name VARCHAR,
CONSTRAINT continents_id_fk FOREIGN KEY(continent_id) REFERENCES continents(id)
);

CREATE TABLE airports (
id int CONSTRAINT ariport_id_unique UNIQUE,
abbreviation VARCHAR(3) CONSTRAINT airport_abr_pk PRIMARY KEY,
name VARCHAR NOT NULL,
country_id INT,
CONSTRAINT country_id_fk FOREIGN KEY(country_id) REFERENCES countries(id)
);

CREATE Table flights (
flightnumber VARCHAR(6) CONSTRAINT flights_flnum_pk PRIMARY KEY,
airline_id INT,
start_airport_id int,
dest_airport_id int,
CONSTRAINT airline_id_fk FOREIGN KEY(airline_id) REFERENCES airlines(id),
CONSTRAINT start_ap_id_fk FOREIGN KEY(start_airport_id) REFERENCES airports(id),
CONSTRAINT dest_ap_id_fk FOREIGN KEY(dest_airport_id) REFERENCES airports(id)
);


CREATE SEQUENCE airlines_sequence start 1 increment 1 OWNED BY airlines.id;

CREATE SEQUENCE countries_sequence start 1 increment 1 OWNED BY countries.id;

CREATE SEQUENCE airports_sequence start 1 increment 1 OWNED BY airports.id;
