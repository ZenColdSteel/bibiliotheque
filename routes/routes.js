import { livreController } from "../controllers/livreController.js";
import { auteurController } from "../controllers/auteurController.js";
import { empruntController } from "../controllers/empruntController.js";
import { logger } from "../utils/logger.js";
export const routes = (req, res) => {
    const url = req.url;
    const method = req.method;

    // Routes pour les livres
    const livreIdMatch = url.match(/^\/api\/livres\/([0-9]+)$/);
    const livreId = livreIdMatch ? parseInt(livreIdMatch[1]) : null;

    if (url === "/api/livres" && method === "GET") {
        livreController.getAllLivres(req, res);
    } else if (url === "/api/livres" && method === "POST") {
        livreController.createLivre(req, res);
    } else if (livreId && method === "GET") {
        livreController.getLivreById(req, res, livreId);
    } else if (livreId && method === "PUT") {
        livreController.updateLivre(req, res, livreId);
    } else if (livreId && method === "DELETE") {
        livreController.deleteLivre(req, res, livreId);
    }

    // Routes pour les auteurs (à implémenter)
    else if (url === "/api/auteurs" && method === "GET") {
        auteurController.getAllAuteurs(req, res);
    }
    // Autres routes auteurs...

    // Routes pour les emprunts (à implémenter)
    else if (url === "/api/emprunts" && method === "GET") {
        empruntController.getAllEmprunts(req, res);
    }
    // Autres routes emprunts...

    // Route non trouvée
    else {
        logger.warn(`Route non trouvée: ${method} ${url}`);
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Route non trouvée" }));
    }
};
