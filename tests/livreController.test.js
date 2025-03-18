// livreController.test.js

import { livreController } from "../controllers/livreController.js";

// Test de la méthode getLivreByCategorie
async function testGetLivreByCategorie() {
    // Cas où la catégorie est présente et valide
    const req1 = {
        params: { categorie: "2" }, // Requête avec la catégorie
    };

    const res1 = {
        status: (code) => {
            return {
                json: (data) => {
                    // Vérifie le code de statut
                    if (code === 200) {
                        console.log(
                            "Test 1: Succès, livres retournés : ",
                            data,
                        );
                        if (data.length === 0) {
                            throw new Error(
                                "Aucun livre trouvé pour la catégorie spécifiée",
                            );
                        }
                    } else {
                        console.error("Test échoué: ", data);
                    }
                },
                writeHead: jest.fn(), // Ajout de writeHead dans le mock
            };
        },
    };

    await livreController.getLivreByCategorie(req1, res1); // Appelle la méthode avec la requête et la réponse simulées

    // Cas où la catégorie est absente
    const req2 = { params: {} }; // Pas de catégorie dans les paramètres
    const res2 = {
        status: (code) => {
            return {
                json: (data) => {
                    // Vérifie le code d'erreur
                    if (code === 400) {
                        console.log(
                            "Test 2: Erreur attendue, catégorie manquante",
                            data,
                        );
                        if (
                            data.error !== "Le paramètre 'categorie' est requis"
                        ) {
                            throw new Error("Message d'erreur incorrect");
                        }
                    } else {
                        console.error("Test échoué", data);
                    }
                },
                writeHead: jest.fn(), // Ajout de writeHead dans le mock
            };
        },
    };

    await livreController.getLivreByCategorie(req2, res2);
}

testGetLivreByCategorie().catch((error) =>
    console.error("Test échoué : ", error),
);
