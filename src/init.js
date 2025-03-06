const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Créer une instance de la base de données SQLite
const dbPath = path.join(__dirname, "..", "database", "bibliotheque.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(
            "Erreur lors de la connexion à la base de données:",
            err.message,
        );
    } else {
        console.log("Connexion à la base de données réussie!");
    }
});

// Lire et exécuter le fichier SQL de création des tables
const fs = require("fs");
const initSQL = fs.readFileSync(
    path.join(__dirname, "..", "database", "init.sql"),
    "utf8",
);

// Exécuter le script SQL pour initialiser la base
db.exec(initSQL, (err) => {
    if (err) {
        console.error("Erreur lors de l'exécution du script SQL:", err.message);
    } else {
        console.log("Base de données initialisée avec succès!");
    }
});

// Fermer la base de données après l'exécution
db.close((err) => {
    if (err) {
        console.error(
            "Erreur lors de la fermeture de la base de données:",
            err.message,
        );
    } else {
        console.log("Base de données fermée!");
    }
});
