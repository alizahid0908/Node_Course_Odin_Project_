#! /usr/bin/env node

import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (255)
);
`;

const SQL_INSERT_USERNAMES = `
INSERT INTO usernames (username) VALUES ($1), ($2), ($3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    await client.query(SQL_CREATE_TABLE);

    const usernames = ["Bryan", "Odin", "Damon"];
    await client.query(SQL_INSERT_USERNAMES, usernames);

    console.log("done");
  } catch (error) {
    console.error("Error during database seeding:", error);
  } finally {
    await client.end();
  }
}

main();
