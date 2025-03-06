const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connexion à la base de données
const dbPath = path.join(__dirname, "..", "database", "bibliotheque.db");
const db = new sqlite3.Database(dbPath);

// Ajouter un auteur
const addAuthor = (nom, prenom, dateNaissance, nationalite) => {
    const sql = `INSERT INTO AUTEUR (Nom, Prenom, Date_Naissance, Nationalite) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nom, prenom, dateNaissance, nationalite], function (err) {
        if (err) {
            console.error("Erreur lors de l'ajout de l'auteur:", err.message);
        } else {
            console.log(`Auteur ajouté avec l'ID ${this.lastID}`);
        }
    });
};

// Ajouter un livre
const addBook = (isbn, titre, anneePublication, idAuteur) => {
    const sql = `INSERT INTO LIVRE (ISBN, Titre, Annee_Publication, ID_Auteur) VALUES (?, ?, ?, ?)`;
    db.run(sql, [isbn, titre, anneePublication, idAuteur], function (err) {
        if (err) {
            console.error("Erreur lors de l'ajout du livre:", err.message);
        } else {
            console.log(`Livre ajouté avec l'ID ${this.lastID}`);
        }
    });
};

// Exemple d'utilisation
addAuthor("Asimov", "Isaac", "1920-01-02", "Américaine");
addBook("9780451524935", "Fondation", 1951, 1);

// Fermer la base de données après utilisation
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
