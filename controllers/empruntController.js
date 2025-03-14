import * as empruntService from "../services/empruntService.js";
import { sendJsonResponse, sendErrorResponse } from "../utils/httpHelper.js";

// Fonction utilitaire pour analyser le corps de la requête
async function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => resolve(JSON.parse(body)));
        req.on("error", reject);
    });
}

export const empruntController = {
    async getAllEmprunts(req, res) {
        try {
            const emprunts = await empruntService.getAllEmprunts();
            sendJsonResponse(res, 200, emprunts);
        } catch (error) {
            sendErrorResponse(res, 500, error.message);
        }
    },

    async getEmpruntById(req, res) {
        try {
            const { id } = req.params;
            const emprunt = await empruntService.getEmpruntById(id);
            if (!emprunt) {
                sendErrorResponse(res, 404, "Emprunt non trouvé");
            } else {
                sendJsonResponse(res, 200, emprunt);
            }
        } catch (error) {
            sendErrorResponse(res, 400, error.message);
        }
    },

    async createEmprunt(req, res) {
        try {
            const {
                Id_Membre,
                Date_Emprunt,
                Date_Retour_Pevu,
                Date_Dernier_Delai,
            } = await parseBody(req);

            const newEmprunt = await empruntService.createEmprunt(
                Id_Membre,
                Date_Emprunt,
                Date_Retour_Pevu,
                Date_Dernier_Delai,
            );

            sendJsonResponse(res, 201, newEmprunt);
        } catch (error) {
            sendErrorResponse(res, 400, error.message);
        }
    },

    async updateEmprunt(req, res) {
        try {
            const { id } = req.params;
            const {
                Id_Membre,
                Date_Emprunt,
                Date_Retour_Pevu,
                Date_Dernier_Delai,
            } = await parseBody(req);

            const updatedEmprunt = await empruntService.updateEmprunt(
                id,
                Id_Membre,
                Date_Emprunt,
                Date_Retour_Pevu,
                Date_Dernier_Delai,
            );

            if (!updatedEmprunt) {
                sendErrorResponse(res, 404, "Emprunt non trouvé");
            } else {
                sendJsonResponse(res, 200, updatedEmprunt);
            }
        } catch (error) {
            sendErrorResponse(res, 400, error.message);
        }
    },

    async deleteEmprunt(req, res) {
        try {
            const { id } = req.params;
            const deleted = await empruntService.deleteEmprunt(id);
            if (!deleted) {
                sendErrorResponse(res, 404, "Emprunt non trouvé");
            } else {
                sendJsonResponse(res, 204, null); // No content, just the status code
            }
        } catch (error) {
            sendErrorResponse(res, 400, error.message);
        }
    },
};
