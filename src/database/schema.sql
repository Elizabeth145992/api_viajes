CREATE TABLE places (
    id INT PRIMARY KEY AUTO_INCREMENT,
    state VARCHAR(150) NOT NULL,
    municipality VARCHAR(150) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE trips (
    id INT PRIMARY KEY AUTO_INCREMENT,
    origin_id INT NOT NULL,
    destination_id INT NOT NULL,
    departure_date DATETIME NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_trips_origin FOREIGN KEY (origin_id) REFERENCES places(id),
    CONSTRAINT fk_trips_destination FOREIGN KEY (destination_id) REFERENCES places(id),
    CONSTRAINT chk_different_places CHECK (origin_id <> destination_id)
);

CREATE TABLE passengers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(225) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE reservation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    passenger_id INT NOT NULL,
    trip_id INT NOT NULL,
    seat_number INT NOT NULL CHECK (seat_number > 0),
    status VARCHAR(50) NOT NULL CHECK (status IN ('CONFIRMED', 'CANCELLED')),
    active_seat_number INT GENERATED ALWAYS AS (
        CASE 
            WHEN status = 'CONFIRMED' THEN seat_number 
            ELSE NULL 
        END
    ) STORED,
    CONSTRAINT fk_reservation_passenger FOREIGN KEY (passenger_id) REFERENCES passengers(id),
    CONSTRAINT fk_reservation_trip FOREIGN KEY (trip_id) REFERENCES trips(id),
    CONSTRAINT uq_active_trip_seat UNIQUE (trip_id, active_seat_number)
);