import { getDBConnection } from "../config/database.js";
import { Livre } from "../models/Livre.js"; // Importez Livre from "../models/Livre.js";
export async function getAllLivreRepo() {
    const db = await getDBConnection();
    return db.all("SELECT * FROM LIVRE");
}

export async function getLivreByIdRepo(id) {
    const db = await getDBConnection();
    return db.get("SELECT * FROM LIVRE WHERE ID = ?", [id]);
}

export async function getLivreByAuteurRepo(id_auteur) {
    const db = await getDBConnection();
    return db.all("SELECT * FROM LIVRE WHERE ID_Auteur = ?", [id_auteur]);
}

/**
 * Cr e un nouveau livre avec validation
 * @param {Livre} nouveauLivre Instance de Livre
 * @returns {Promise<Livre>} Instance de Livre avec l'ID du livre cr e
 */
export async function createLivreRepo({
    isbn,
    titre,
    annee_publication,
    id_auteur,
}) {
    console.log(isbn, titre, annee_publication, id_auteur);
    const db = await getDBConnection();
    const result = await db.run(
        "INSERT INTO LIVRE (ISBN, Titre, Annee_Publication, ID_Auteur) VALUES (?, ?, ?, ?)",
        [isbn, titre, annee_publication, id_auteur],
    );

    return new Livre(result.lastID, isbn, titre, annee_publication, id_auteur);
}

export async function updateLivreRepo(
    id,
    isbn,
    titre,
    annee_publication,
    id_auteur,
) {
    const db = await getDBConnection();
    const result = await db.run(
        "UPDATE LIVRE SET ISBN = ?, Titre = ?, Annee_Publication = ?, ID_Auteur = ? WHERE ID = ?",
        [isbn, titre, annee_publication, id_auteur, id], // On passe les arguments ici
    );
    if (result.changes === 0) return null;
    return { id, isbn, titre, annee_publication, id_auteur };
}
// export async function deleteLivreRepo(id) {
//     const db = await getDBConnection();
//     const result = await db.run("DELETE FROM LIVRE WHERE ID = ?", [id]);
//     return result.changes === 1;
// }
export async function deleteLivreRepo(id) {
    try {
        const db = await getDBConnection();
        await db.run("DELETE FROM EXEMPLAIRE WHERE ID_livres = ?", [id]);
        await db.run("DELETE FROM LIVRE_CATEGORIE WHERE ID_livres= ?", [id]);
        const result = await db.run("DELETE FROM livre WHERE id = ?", [id]);

        if (result.changes === 0) {
            throw new Error("Livre introuvable ou déjà supprimé");
        }

        return true;
    } catch (error) {
        throw new Error(
            "Erreur lors de la suppression du livre: " + error.message,
        );
    }
}
export async function getLivresByCategorieRepo(categorie) {
    const db = await getDBConnection();
    return db.all(
        `
        SELECT * FROM LIVRE
        INNER JOIN LIVRE_CATEGORIE ON LIVRE.ID = LIVRE_CATEGORIE.ID_LIVRES
        WHERE LIVRE_CATEGORIE.ID_CATEGORIES = ?`,
        [categorie],
    );
}
