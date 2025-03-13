// controllers/auteurController.js
async function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => resolve(JSON.parse(body)));
        req.on("error", reject);
    });
}

import {
    getAllAuteurService,
    getAuteurByIdService,
    createAuteurService,
    updateAuteurService,
    deleteAuteurService,
} from "../services/auteurService.js";
import { sendJsonResponse, sendErrorResponse } from "../utils/httpHelper.js";

export const auteurController = {
    async getAllAuteur(req, res) {
        try {
            const auteurs = await getAllAuteurService();
            console.log("auteurController || getAllAuteur || auteurs", auteurs);

            sendJsonResponse(res, 200, auteurs);
        } catch (error) {
            sendErrorResponse(res, 500, error.message);
        }
    },

    async getAuteurById(req, res) {
        try {
            const { id } = req.params;
            const auteur = await getAuteurByIdService(id);
            sendJsonResponse(res, 200, auteur);
        } catch (error) {
            sendErrorResponse(res, 404, error.message);
        }
    },

    /**
     * Crée un nouveau auteur
     *
     * @param {http.IncomingMessage} req - Requête HTTP entrante
     * @param {http.ServerResponse} res - Réponse HTTP
     * @returns {Promise<void>}
     */
    async createAuteur(req, res) {
        try {
            const { Nom, Prenom, Date_Naissance, Nationalite } =
                await parseBody(req);
            const newAuteur = await createAuteurService(
                Nom,
                Prenom,
                Date_Naissance,
                Nationalite,
            );
            sendJsonResponse(res, 201, newAuteur);
        } catch (error) {
            sendErrorResponse(res, 400, error.message);
        }
    },

    async updateAuteur(req, res) {
        try {
            console.log("req.body", req.body);
            const { id } = req.params;
            const { Nom, Prenom, Date_Naissance, Nationalite } =
                await parseBody(req);

            // Log les données reçues

            console.log("Updating auteur with id:", id);
            console.log("New data:", {
                Nom,
                Prenom,
                Date_Naissance,
                Nationalite,
            });

            const updatedAuteur = await updateAuteurService(
                id,
                Nom,
                Prenom,
                Date_Naissance,
                Nationalite,
            );

            // Log les données mises à jour
            console.log("Updated auteur:", updatedAuteur);
            sendJsonResponse(res, 200, updatedAuteur);
        } catch (error) {
            console.error("Error updating auteur:", error);
            sendErrorResponse(res, 400, error.message);
        }
    },
    async deleteAuteur(req, res) {
        try {
            const { id } = req.params;
            await deleteAuteurService(id);
            sendJsonResponse(res, 200, {
                message: "Auteur supprimé avec succès",
            });
        } catch (error) {
            sendErrorResponse(res, 400, error.message);
        }
    },
};
