import {
    getAllLivresService,
    getLivreByIdService,
    getLivresByAuteurService,
    createLivreService,
    updateLivreService,
} from "../services/livreService.js";
import { sendJsonResponse, sendErrorResponse } from "../utils/httpHelper.js";

/**
 * Récupère tous les livres
 */
export async function getAllLivresController(req, res) {
    try {
        const livres = await getAllLivresService();
        sendJsonResponse(res, 200, livres);
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
}

/**
 * Récupère un livre par son ID
 */
export async function getLivreByIdController(req, res) {
    try {
        const { id } = req.params;
        const livre = await getLivreByIdService(id);
        sendJsonResponse(res, 200, livre);
    } catch (error) {
        sendErrorResponse(res, 404, error.message);
    }
}

/**
 * Récupère les livres d'un auteur
 */
export async function getLivresByAuteurController(req, res) {
    try {
        const { id_auteur } = req.params;
        const livres = await getLivresByAuteurService(id_auteur);
        sendJsonResponse(res, 200, livres);
    } catch (error) {
        sendErrorResponse(res, 400, error.message);
    }
}

/**
 * Crée un nouveau livre
 */
export async function createLivreController(req, res) {
    try {
        const { isbn, titre, annee_publication, id_auteur } = req.body;
        const newLivre = await createLivreService(
            isbn,
            titre,
            annee_publication,
            id_auteur,
        );
        sendJsonResponse(res, 201, newLivre);
    } catch (error) {
        sendErrorResponse(res, 400, error.message);
    }
}

/**
 * Met à jour un livre
 */
export async function updateLivreController(req, res) {
    try {
        const { id } = req.params;
        const { isbn, titre, annee_publication, id_auteur } = req.body;
        const updatedLivre = await updateLivreService(
            id,
            isbn,
            titre,
            annee_publication,
            id_auteur,
        );
        sendJsonResponse(res, 200, updatedLivre);
    } catch (error) {
        sendErrorResponse(res, 400, error.message);
    }
}
