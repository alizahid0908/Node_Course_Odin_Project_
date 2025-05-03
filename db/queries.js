import pool from "./pool.js";

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function searchUsernames(searchTerm) {
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE username ILIKE $1",
    [`%${searchTerm}%`] 
  );
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function deleteAllUsernames() {
    await pool.query("DELETE FROM usernames");
  }

export default {
  getAllUsernames,
  searchUsernames,
  insertUsername,
  deleteAllUsernames
};
