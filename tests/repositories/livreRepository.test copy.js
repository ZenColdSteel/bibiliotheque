// tests/repositories/livreRepository.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
    getAllLivreRepo,
    getLivreByIdRepo,
    getLivreByAuteurRepo,
    createLivreRepo,
    updateLivreRepo,
    deleteLivreRepo,
    getLivresByCategorieRepo,
} from "../../repositories/livreRepository.js";
import { getDBConnection } from "../../config/database.js";

// Mock du module database
vi.mock("../../config/database.js", () => ({
    getDBConnection: vi.fn(),
}));

// Mock du module Livre
vi.mock("../../models/Livre.js", () => ({
    Livre: vi
        .fn()
        .mockImplementation((id, isbn, titre, annee_publication, id_auteur) => {
            return { id, isbn, titre, annee_publication, id_auteur };
        }),
}));

describe("Livre Repository", () => {
    // Objet mockDb pour simuler les opérations de base de données
    let mockDb;

    beforeEach(() => {
        // Créer un nouvel objet mockDb pour chaque test
        mockDb = {
            all: vi.fn(),
            get: vi.fn(),
            run: vi.fn(),
        };

        // Configurer getDBConnection pour retourner notre mockDb
        getDBConnection.mockResolvedValue(mockDb);

        // Réinitialiser tous les mocks
        vi.clearAllMocks();
    });

    describe("getAllLivreRepo", () => {
        it("should return all livres from database", async () => {
            // Données fictives pour le test
            const mockLivres = [
                {
                    id: 1,
                    isbn: "1234567890",
                    titre: "Livre 1",
                    annee_publication: 2020,
                    id_auteur: 1,
                },
                {
                    id: 2,
                    isbn: "0987654321",
                    titre: "Livre 2",
                    annee_publication: 2021,
                    id_auteur: 2,
                },
            ];

            // Configuration du mock pour retourner nos données fictives
            mockDb.all.mockResolvedValue(mockLivres);

            // Appel de la fonction à tester
            const result = await getAllLivreRepo();

            console.log("etsdgsfdghdshd", result);

            // Vérification que la bonne requête SQL a été exécutée
            expect(mockDb.all).toHaveBeenCalledWith("SELECT * FROM LIVRE");

            // Vérification que le résultat est correct
            expect(result).toEqual(mockLivres);
        });
        it("should return an empty array when no livres exist", async () => {
            // Simuler une base de données vide
            mockDb.all.mockResolvedValue([]);

            const result = await getAllLivreRepo();

            expect(mockDb.all).toHaveBeenCalledWith("SELECT * FROM LIVRE");
            expect(result).toEqual([]);
        });
        it("should propagate database errors", async () => {
            // Simuler une erreur de base de données
            const dbError = new Error("Database connection failed");
            mockDb.all.mockRejectedValue(dbError);

            // Vérification que l'erreur est bien propagée
            await expect(getAllLivreRepo()).rejects.toThrow(
                "Database connection failed",
            );
        });
    });

    describe("getLivreByIdRepo", () => {
        it("should return a specific livre by ID", async () => {
            const mockLivre = {
                id: 1,
                isbn: "1234567890",
                titre: "Livre Test",
                annee_publication: 2020,
                id_auteur: 1,
            };

            mockDb.get.mockResolvedValue(mockLivre);

            const result = await getLivreByIdRepo(1);

            expect(mockDb.get).toHaveBeenCalledWith(
                "SELECT * FROM LIVRE WHERE ID = ?",
                [1],
            );
            expect(result).toEqual(mockLivre);
        });

        it("should return undefined when livre is not found", async () => {
            mockDb.get.mockResolvedValue(undefined);

            const result = await getLivreByIdRepo(999);

            expect(mockDb.get).toHaveBeenCalledWith(
                "SELECT * FROM LIVRE WHERE ID = ?",
                [999],
            );
            expect(result).toBeUndefined();
        });
    });

    describe("getLivreByAuteurRepo", () => {
        it("should return all livres by a specific author", async () => {
            const mockLivres = [
                {
                    id: 1,
                    isbn: "1234567890",
                    titre: "Livre 1",
                    annee_publication: 2020,
                    id_auteur: 5,
                },
                {
                    id: 3,
                    isbn: "1122334455",
                    titre: "Livre 3",
                    annee_publication: 2022,
                    id_auteur: 5,
                },
            ];

            mockDb.all.mockResolvedValue(mockLivres);

            const result = await getLivreByAuteurRepo(5);

            expect(mockDb.all).toHaveBeenCalledWith(
                "SELECT * FROM LIVRE WHERE ID_Auteur = ?",
                [5],
            );
            expect(result).toEqual(mockLivres);
        });
    });

    describe("createLivreRepo", () => {
        it("should create a new livre and return it with ID", async () => {
            const newLivre = {
                isbn: "9876543210",
                titre: "Nouveau Livre",
                annee_publication: 2023,
                id_auteur: 3,
            };

            // Simuler un résultat d'insertion avec lastID
            mockDb.run.mockResolvedValue({ lastID: 10 });

            const result = await createLivreRepo(newLivre);

            expect(mockDb.run).toHaveBeenCalledWith(
                "INSERT INTO LIVRE (ISBN, Titre, Annee_Publication, ID_Auteur) VALUES (?, ?, ?, ?)",
                [
                    newLivre.isbn,
                    newLivre.titre,
                    newLivre.annee_publication,
                    newLivre.id_auteur,
                ],
            );

            expect(result).toEqual({
                id: 10,
                isbn: newLivre.isbn,
                titre: newLivre.titre,
                annee_publication: newLivre.annee_publication,
                id_auteur: newLivre.id_auteur,
            });
        });
    });

    describe("updateLivreRepo", () => {
        it("should update an existing livre and return the updated data", async () => {
            const livreId = 5;
            const updatedData = {
                isbn: "5555555555",
                titre: "Livre Mis à Jour",
                annee_publication: 2024,
                id_auteur: 2,
            };

            // Simuler une mise à jour réussie
            mockDb.run.mockResolvedValue({ changes: 1 });

            const result = await updateLivreRepo(
                livreId,
                updatedData.isbn,
                updatedData.titre,
                updatedData.annee_publication,
                updatedData.id_auteur,
            );

            expect(mockDb.run).toHaveBeenCalledWith(
                "UPDATE LIVRE SET ISBN = ?, Titre = ?, Annee_Publication = ?, ID_Auteur = ? WHERE ID = ?",
                [
                    updatedData.isbn,
                    updatedData.titre,
                    updatedData.annee_publication,
                    updatedData.id_auteur,
                    livreId,
                ],
            );

            expect(result).toEqual({
                id: livreId,
                ...updatedData,
            });
        });

        it("should return null when no livre is updated", async () => {
            // Simuler qu'aucune ligne n'a été modifiée
            mockDb.run.mockResolvedValue({ changes: 0 });

            const result = await updateLivreRepo(999, "isbn", "titre", 2022, 1);

            expect(result).toBeNull();
        });
    });

    describe("deleteLivreRepo", () => {
        it("should delete a livre and its related records successfully", async () => {
            // Simuler une suppression réussie
            mockDb.run
                .mockResolvedValueOnce({})
                .mockResolvedValueOnce({})
                .mockResolvedValueOnce({ changes: 1 });

            const result = await deleteLivreRepo(5);

            // Vérifier que les requêtes de suppression ont été exécutées dans le bon ordre
            expect(mockDb.run).toHaveBeenNthCalledWith(
                1,
                "DELETE FROM EXEMPLAIRE WHERE ID_livres = ?",
                [5],
            );
            expect(mockDb.run).toHaveBeenNthCalledWith(
                2,
                "DELETE FROM LIVRE_CATEGORIE WHERE ID_livres= ?",
                [5],
            );
            expect(mockDb.run).toHaveBeenNthCalledWith(
                3,
                "DELETE FROM livre WHERE id = ?",
                [5],
            );

            expect(result).toBe(true);
        });

        it("should throw an error when livre is not found", async () => {
            // Simuler qu'aucune ligne n'a été supprimée
            mockDb.run
                .mockResolvedValueOnce({})
                .mockResolvedValueOnce({})
                .mockResolvedValueOnce({ changes: 0 });

            await expect(deleteLivreRepo(999)).rejects.toThrow(
                "Livre introuvable ou déjà supprimé",
            );
        });

        it("should propagate database errors", async () => {
            // Simuler une erreur de base de données
            const dbError = new Error("Foreign key constraint failed");
            mockDb.run.mockRejectedValue(dbError);

            await expect(deleteLivreRepo(5)).rejects.toThrow(
                /Erreur lors de la suppression du livre/,
            );
        });
    });

    describe("getLivresByCategorieRepo", () => {
        it("should return all livres in a specific category", async () => {
            const categorieId = 3;
            const mockLivres = [
                {
                    id: 2,
                    isbn: "2222222222",
                    titre: "Livre Catégorie",
                    annee_publication: 2021,
                    id_auteur: 1,
                },
            ];

            mockDb.all.mockResolvedValue(mockLivres);

            const result = await getLivresByCategorieRepo(categorieId);

            expect(mockDb.all).toHaveBeenCalledWith(
                expect.stringContaining("INNER JOIN LIVRE_CATEGORIE"),
                [categorieId],
            );

            expect(result).toEqual(mockLivres);
        });
    });
});
