// tests/controllers/livreController.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { livreController } from "../../controllers/livreController.js";
import * as livreService from "../../services/livreService.js";
import * as httpHelper from "../../utils/httpHelper.js";

// Mock the services and helpers
vi.mock("../../services/livreService.js");
vi.mock("../../utils/httpHelper.js");

describe("Livre Controller", () => {
    let req, res;

    beforeEach(() => {
        // Reset mocks
        vi.resetAllMocks();

        // Setup request and response objects
        req = {
            params: {},
            on: vi.fn(),
        };
        res = {};
    });

    describe("getAllLivres", () => {
        it("should get all livres and send 200 response", async () => {
            // Mock data
            const mockLivres = [
                {
                    id: "1",
                    isbn: "123",
                    titre: "Test Livre",
                    annee_publication: 2022,
                    id_auteur: "1",
                },
            ];

            // Setup mocks
            livreService.getAllLivresService.mockResolvedValue(mockLivres);
            httpHelper.sendJsonResponse.mockImplementation(() => {});

            // Call the controller function
            await livreController.getAllLivres(req, res);

            // Assert service was called
            expect(livreService.getAllLivresService).toHaveBeenCalledTimes(1);

            // Assert response was sent correctly
            expect(httpHelper.sendJsonResponse).toHaveBeenCalledWith(
                res,
                200,
                mockLivres,
            );
        });

        it("should handle errors and send 500 response", async () => {
            // Setup mocks to simulate error
            const error = new Error("Database error");
            livreService.getAllLivresService.mockRejectedValue(error);
            httpHelper.sendErrorResponse.mockImplementation(() => {});

            // Call the controller function
            await livreController.getAllLivres(req, res);

            // Assert error response was sent
            expect(httpHelper.sendErrorResponse).toHaveBeenCalledWith(
                res,
                500,
                error.message,
            );
        });
    });

    describe("getLivreById", () => {
        it("should get livre by id and send 200 response", async () => {
            // Mock data
            const mockLivre = {
                id: "1",
                isbn: "123",
                titre: "Test Livre",
                annee_publication: 2022,
                id_auteur: "1",
            };
            req.params.id = "1";

            // Setup mocks
            livreService.getLivreByIdService.mockResolvedValue(mockLivre);
            httpHelper.sendJsonResponse.mockImplementation(() => {});

            // Call the controller function
            await livreController.getLivreById(req, res);

            // Assert service was called with correct params
            expect(livreService.getLivreByIdService).toHaveBeenCalledWith("1");

            // Assert response was sent correctly
            expect(httpHelper.sendJsonResponse).toHaveBeenCalledWith(
                res,
                200,
                mockLivre,
            );
        });

        it("should handle livre not found and send 404 response", async () => {
            // Setup req.params
            req.params.id = "999";

            // Setup mocks to simulate error
            const error = new Error("Livre not found");
            livreService.getLivreByIdService.mockRejectedValue(error);
            httpHelper.sendErrorResponse.mockImplementation(() => {});

            // Call the controller function
            await livreController.getLivreById(req, res);

            // Assert error response was sent
            expect(httpHelper.sendErrorResponse).toHaveBeenCalledWith(
                res,
                404,
                error.message,
            );
        });
    });

    describe("createLivre", () => {
        it("should create a livre and send 201 response", async () => {
            // Mock data
            const mockInput = {
                ISBN: "123456789",
                Titre: "New Book",
                Annee_Publication: 2023,
                ID_Auteur: "5",
            };

            const mockCreatedLivre = {
                id: "10",
                isbn: "123456789",
                titre: "New Book",
                annee_publication: 2023,
                id_auteur: "5",
            };

            // Mock the body parsing
            req.on.mockImplementation((event, callback) => {
                if (event === "end") {
                    callback();
                }
                return req;
            });

            // Mock the JSON.parse to return our mock input
            global.JSON.parse = vi.fn().mockReturnValue(mockInput);

            // Setup service mock
            livreService.createLivreService.mockResolvedValue(mockCreatedLivre);
            httpHelper.sendJsonResponse.mockImplementation(() => {});

            // Call the controller function
            await livreController.createLivre(req, res);

            // Assert service was called with correct params
            expect(livreService.createLivreService).toHaveBeenCalledWith(
                mockInput.ISBN,
                mockInput.Titre,
                mockInput.Annee_Publication,
                mockInput.ID_Auteur,
            );

            // Assert response was sent correctly
            expect(httpHelper.sendJsonResponse).toHaveBeenCalledWith(
                res,
                201,
                mockCreatedLivre,
            );
        });

        it("should handle creation errors and send 400 response", async () => {
            // Mock the request events
            req.on.mockImplementation((event, callback) => {
                if (event === "error") {
                    callback(new Error("Parsing error"));
                }
                return req;
            });

            httpHelper.sendErrorResponse.mockImplementation(() => {});

            // Call the controller function and catch the error
            try {
                await livreController.createLivre(req, res);
            } catch (error) {
                // We expect the function to throw an error
                expect(httpHelper.sendErrorResponse).toHaveBeenCalledWith(
                    res,
                    400,
                    expect.any(String),
                );
            }
        });
    });

    // Tests for other controller methods would follow the same pattern
    describe("updateLivre", () => {
        it("should update a livre and send 200 response", async () => {
            // Mock data
            req.params.id = "1";
            const mockInput = {
                isbn: "987654321",
                titre: "Updated Book",
                annee_publication: 2024,
                id_auteur: "3",
            };

            const mockUpdatedLivre = {
                id: "1",
                ...mockInput,
            };

            // Mock the body parsing
            req.on.mockImplementation((event, callback) => {
                if (event === "end") {
                    callback();
                }
                return req;
            });

            // Mock the JSON.parse to return our mock input
            global.JSON.parse = vi.fn().mockReturnValue(mockInput);

            // Setup service mock
            livreService.updateLivreService.mockResolvedValue(mockUpdatedLivre);
            httpHelper.sendJsonResponse.mockImplementation(() => {});

            // Call the controller function
            await livreController.updateLivre(req, res);

            // Assert service was called with correct params
            expect(livreService.updateLivreService).toHaveBeenCalledWith(
                "1",
                mockInput.isbn,
                mockInput.titre,
                mockInput.annee_publication,
                mockInput.id_auteur,
            );

            // Assert response was sent correctly
            expect(httpHelper.sendJsonResponse).toHaveBeenCalledWith(
                res,
                200,
                mockUpdatedLivre,
            );
        });
    });
});
