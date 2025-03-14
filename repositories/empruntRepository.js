import { getDBConnection } from "../config/database.js";
export async function getAllEmpruntRepo() {
    const db = await getDBConnection();
    return db.all("SELECT * FROM EMPRUNT");
}
export async function getEmpruntByIdRepo(id) {
    const db = await getDBConnection();
    return db.get("SELECT * FROM EMPRUNT WHERE ID = ?", [id]);
}
export async function createEmpruntRepo(
    Id_Membre,
    Date_Emprunt,
    Date_Retour_Pevu,
    Date_Dernier_Delai,
) {
    const db = await getDBConnection();
    const result = await db.run(
        "INSERT INTO EMPRUNT (ID_MEMBRE, DATE_EMPRUNT ,DATE_RETOUR_PEVU ,DATE_DERNIER_DELAI) VALUES (?, ?, ?, ?)",
        [Id_Membre, Date_Emprunt, Date_Retour_Pevu, Date_Dernier_Delai],
    );
    return {
        id: result.lastID,
        Id_Membre,
        Date_Emprunt,
        Date_Retour_Pevu,
        Date_Dernier_Delai,
    };
}
export async function updateEmpruntRepo(
    id,
    Id_Membre,
    Date_Emprunt,
    Date_Retour_Pevu,
    Date_Dernier_Delai,
) {
    const db = await getDBConnection();
    const result = await db.run(
        "UPDATE EMPRUNT SET ( ID_MEMBRE, DATE_EMPRUNT ,DATE_RETOUR_PEVU ,DATE_DERNIER_DELAI) VALUES (?, ?, ?, ?) WHERE ID = ?",
        [Id_Membre, Date_Emprunt, Date_Retour_Pevu, Date_Dernier_Delai, id],
    );
    if (result.changes === 0) return null;
    return {
        id,
        Id_Membre,
        Date_Emprunt,
        Date_Retour_Pevu,
        Date_Dernier_Delai,
    };
}
export async function deleteEmpruntRepo(id) {
    const db = await getDBConnection();
    const result = await db.run("DELETE FROM EMPRUNT WHERE ID = ?", [id]);
    return result.changes === 1;
}
