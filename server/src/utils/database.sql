CREATE DATABASE pernchat;

CREATE TABLE messages(
  msg_id SERIAL PRIMARY KEY,
  room_id VARCHAR(255),
  message VARCHAR(255),
  username VARCHAR(255),
  time VARCHAR(255)
);

CREATE TABLE rooms(
  ref SERIAL PRIMARY KEY,
  room_id VARCHAR(255),
  room_name VARCHAR(255)
);