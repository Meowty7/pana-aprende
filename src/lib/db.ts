import sqlite from "better-sqlite3";

// Abre la base de datos
export const db = sqlite("database.db");

// Crea la tabla de usuarios si no existe
db.exec(`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
)`);

// Crea la tabla de sesiones si no existe
db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
)`);

// Crea la tabla de puntajes si no existe
db.exec(`
	CREATE TABLE IF NOT EXISTS scores 
	(
	 id INTEGER PRIMARY KEY AUTOINCREMENT,
	 user_id TEXT NOT NULL,
	 score INTEGER NOT NULL,
	 FOREIGN KEY (user_id) REFERENCES user(id)
	)
`);

// Define la interfaz de usuario para TypeScript
export interface DatabaseUser {
	id: string;
	username: string;
	password_hash: string;
}

// Define la interfaz de puntaje para TypeScript
export interface DatabaseScore {
	id: number;
	user_id: string;
	score: number;
}
