import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { logError } from "./logger.js";
async function initDb(db) {
    try {
        await db.exec(`
          PRAGMA foreign_keys = ON;

          CREATE TABLE IF NOT EXISTS AUTEUR (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nom VARCHAR(255) NOT NULL,
            Prenom VARCHAR(255),
            Date_Naissance DATE,
            Nationalite VARCHAR(255)
          );

          CREATE TABLE IF NOT EXISTS LIVRE (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            ISBN VARCHAR(255) UNIQUE,
            Titre VARCHAR(255) NOT NULL,
            Annee_Publication INTEGER,
            ID_Auteur INTEGER,
            FOREIGN KEY (ID_Auteur) REFERENCES AUTEUR(ID)
          );

          CREATE TABLE IF NOT EXISTS MEMBRE (
            ID_Membre INTEGER PRIMARY KEY AUTOINCREMENT,
            Nom VARCHAR(255) NOT NULL,
            Prenom VARCHAR(255) NOT NULL,
            Email VARCHAR(255) UNIQUE,
            Adresse VARCHAR(255),
            Date_Inscription DATE DEFAULT CURRENT_DATE
          );

          CREATE TABLE IF NOT EXISTS EMPRUNT (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            ID_Membre INTEGER NOT NULL,
            Date_Emprunt DATE DEFAULT CURRENT_DATE,
            Date_Retour_Prevu DATE NOT NULL,
            Date_Dernier_Delai DATE NOT NULL,
            FOREIGN KEY (ID_Membre) REFERENCES MEMBRE(ID_Membre)
          );

          CREATE TABLE IF NOT EXISTS CATEGORIES (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nom VARCHAR(255) NOT NULL,
            Description VARCHAR(255)
          );

          CREATE TABLE IF NOT EXISTS Livre_Categorie (
            ID_livres INTEGER,
            ID_categories INTEGER,
            PRIMARY KEY (ID_livres, ID_categories),
            FOREIGN KEY (ID_livres) REFERENCES LIVRE(ID),
            FOREIGN KEY (ID_categories) REFERENCES CATEGORIES(ID)
          );

          CREATE TABLE IF NOT EXISTS EXEMPLAIRE (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Dispo INTEGER NOT NULL DEFAULT 1,
            Date_Aquisition DATE DEFAULT CURRENT_DATE,
            ID_livres INTEGER,
            ID_EMPRUNT INTEGER,
            FOREIGN KEY (ID_livres) REFERENCES LIVRE(ID),
            FOREIGN KEY (ID_EMPRUNT) REFERENCES EMPRUNT(ID)
          );
      `);
    } catch (error) {
        await logError(error);
        throw new Error(
            "Erreur lors de l'initialisation de la base de données",
        );
    }
}
export async function getDBConnection() {
    try {
        const db = await open({
            filename: "bibliotheque.db",
            driver: sqlite3.Database,
        });

        // S'assurer que les tables existent
        await initDb(db);

        return db;
    } catch (error) {
        await logError(error);
        throw new Error("Failed to open database");
    }
}
