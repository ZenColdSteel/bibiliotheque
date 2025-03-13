import { getDBConnection } from "../config/database.js";

export async function getAllAuteurRepo() {
    const db = await getDBConnection();
    return db.all("SELECT * FROM AUTEUR");
}

export async function getAuteurByIdRepo(id) {
    const db = await getDBConnection();
    return db.get("SELECT * FROM AUTEUR WHERE ID = ?", [id]);
}

export async function createAuteurRepo(
    nom,
    prenom,
    date_naissance,
    nationalite,
) {
    const db = await getDBConnection();
    const result = await db.run(
        "INSERT INTO AUTEUR (NOM, PRENOM,DATE_NAISSANCE, NATIONALITE)  VALUES (?, ?, ?, ?)",
        [nom, prenom, date_naissance, nationalite],
    );
    return { id: result.lastID, nom, prenom, date_naissance, nationalite };
}

export async function updateAuteurRepo(
    id,
    nom,
    prenom,
    date_naissance,
    nationalite,
) {
    const db = await getDBConnection();
    const result = await db.run(
        "UPDATE AUTEUR SET NOM = ?, PRENOM = ?, NATIONALITE = ?, DATE_NAISSANCE = ? WHERE ID = ?",
        [nom, prenom, nationalite, date_naissance, id], // On passe les arguments ici
    );
    if (result.changes === 0) return null;
    return { id, nom, prenom, nationalite, date_naissance };
}
// export async function deleteAuteurRepo(id) {
//     const db = await getDBConnection();
//     const result = await db.run("DELETE FROM LIVRE WHERE ID = ?", [id]);
//     return result.changes === 1;
// }
export async function deleteAuteurRepo(id) {
    try {
        const db = await getDBConnection();
        await db.run("DELETE FROM LIVRE WHERE ID_Auteur = ?", [id]);
        const result = await db.run("DELETE FROM AUTEUR WHERE id = ?", [id]);

        if (result.changes === 0) {
            throw new Error("livre introuvable ou déjà supprimé");
        }

        return true;
    } catch (error) {
        throw new Error(
            "Erreur lors de la suppression de l'auteur: " + error.message,
        );
    }
}
