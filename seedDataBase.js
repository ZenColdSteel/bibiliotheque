import { getDBConnection } from "./config/database.js";

async function seedDatabase() {
    const db = await getDBConnection();

    try {
        await db.run(`
        INSERT INTO EXEMPLAIRE (Dispo, Date_Aquisition, ID_livres, ID_EMPRUNT)
        VALUES
        (1, '2025-03-10', 6, NULL),
    `);

        console.log("Base de données remplie avec des données de test !");
    } catch (error) {
        console.error(
            "Erreur lors de l'insertion des données de test :",
            error,
        );
    } finally {
        await db.close();
    }
}

// Exécuter le script
seedDatabase();
