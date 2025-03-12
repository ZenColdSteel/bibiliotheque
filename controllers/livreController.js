// controllers/livreController.js
async function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => resolve(JSON.parse(body)));
        req.on("error", reject);
    });
}

import {
    getAllLivresService,
    getLivreByIdService,
    getLivresByAuteurService,
    createLivreService,
    updateLivreService,
    deleteLivreService,
} from "../services/livreService.js";
import { sendJsonResponse, sendErrorResponse } from "../utils/httpHelper.js";

export const livreController = {
    async getAllLivres(req, res) {
        try {
            const livres = await getAllLivresService();
            console.log("livreController || getAllLivres || livres", livres);

            sendJsonResponse(res, 200, livres);
        } catch (error) {
            sendErrorResponse(res, 500, error.message);
        }
    },

    async getLivreById(req, res) {
        try {
            const { id } = req.params;
            const livre = await getLivreByIdService(id);
            sendJsonResponse(res, 200, livre);
        } catch (error) {
            sendErrorResponse(res, 404, error.message);
        }
    },

    async getLivresByAuteurController(req, res) {
        try {
            const { id_auteur } = req.params;
            const livres = await getLivresByAuteurService(id_auteur);
            sendJsonResponse(res, 200, livres);
        } catch (error) {
            sendErrorResponse(res, 400, error.message);
        }
    },

    async createLivre(req, res) {
        try {
            const { isbn, titre, annee_publication, id_auteur } =
                await parseBody(req);
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
    },

    async updateLivre(req, res) {
        try {
            console.log("req.body", req.body);
            const { id } = req.params;
            const { isbn, titre, annee_publication, id_auteur } =
                await parseBody(req);

            // Log les données reçues

            console.log("Updating livre with id:", id);
            console.log("New data:", {
                isbn,
                titre,
                annee_publication,
                id_auteur,
            });

            const updatedLivre = await updateLivreService(
                id,
                isbn,
                titre,
                annee_publication,
                id_auteur,
            );

            // Log les données mises à jour
            console.log("Updated livre:", updatedLivre);
            sendJsonResponse(res, 200, updatedLivre);
        } catch (error) {
            console.error("Error updating livre:", error);
            sendErrorResponse(res, 400, error.message);
        }
    },
    async deleteLivre(req, res) {
        try {
            const { id } = req.params;
            await deleteLivreService(id);
            sendJsonResponse(res, 200, {
                message: "Livre supprimé avec succès",
            });
        } catch (error) {
            sendErrorResponse(res, 400, error.message);
        }
    },
};
