CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name CHARACTER(255) NOT NULL UNIQUE,
    gender CHARACTER(255) NOT NULL,
    grade CHARACTER(255) NOT NULL,
    password_hash CHARACTER(255) NOT NULL
);

CREATE TABLE schedules (
    id SERIAL NOT NULL PRIMARY KEY,
    date CHARACTER(255) NOT NULL,
    time CHARACTER(255) NOT NULL,
    departure_place CHARACTER(255) NOT NULL,
    destination CHARACTER(255) NOT NULL,
    capacity CHARACTER(1) NOT NULL,
    memo CHARACTER(255) NOT NULL,
    userName CHARACTER(255) NOT NULL,
    gender CHARACTER(255) NOT NULL,
    grade CHARACTER(255) NOT NULL,
    candidates CHARACTER(255) NOT NULL
);