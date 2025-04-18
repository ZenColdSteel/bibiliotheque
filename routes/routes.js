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
    const auteurIdMatch = url.match(/^\/api\/auteurs\/([0-9]+)$/);
    const auteurId = auteurIdMatch ? parseInt(auteurIdMatch[1]) : null;
    const empruntIdMatch = url.match(/^\/api\/emprunts\/([0-9]+)$/);
    const empruntId = empruntIdMatch ? parseInt(empruntIdMatch[1]) : null;
    // const cateIdMatch = url.match(/^\/api\/livres\/categorie\/([0-9]+)$/);
    // const cateId = cateIdMatch ? parseInt(cateIdMatch[1]) : null;

    if (url === "/api/livres" && method === "GET") {
        livreController.getAllLivres(req, res);
    } else if (url === "/api/livres" && method === "POST") {
        livreController.createLivre(req, res);
    } else if (livreId && method === "GET") {
        req.params = { id: livreId }; // Ajoute l'ID aux params de la requête
        livreController.getLivreById(req, res);
        // } else if (cateId && method === "GET") {
        //     req.params = { id: cateId }; // Ajoute l'ID aux params de la requête
        //     livreController.getLivreByCategorie(req, res);
        // } else if (livreId && method === "PUT") {
        req.params = { id: livreId }; // Ajoute l'ID aux params de la requête
        livreController.updateLivre(req, res);
    } else if (livreId && method === "DELETE") {
        req.params = { id: livreId }; // Ajoute l'ID aux params de la requête
        livreController.deleteLivre(req, res);
    }
    // Routes pour les auteurs
    else if (url === "/api/auteurs" && method === "GET") {
        auteurController.getAllAuteur(req, res);
    } else if (url === "/api/auteurs" && method === "POST") {
        auteurController.createAuteur(req, res);
    } else if (auteurId && method === "GET") {
        req.params = { id: auteurId }; // Ajoute l'ID aux params de la requête
        auteurController.getAuteurById(req, res);
    } else if (auteurId && method === "PUT") {
        req.params = { id: auteurId }; // Ajoute l'ID aux params de la requête
        auteurController.updateAuteur(req, res);
    } else if (auteurId && method === "DELETE") {
        req.params = { id: auteurId }; // Ajoute l'ID aux params de la requête
        auteurController.deleteAuteur(req, res);
    }

    // Routes pour les emprunts
    else if (url === "/api/emprunts" && method === "GET") {
        empruntController.getAllEmprunts(req, res);
    } else if (url === "/api/emprunts" && method === "POST") {
        empruntController.createEmprunt(req, res);
    } else if (empruntId && method === "GET") {
        req.params = { id: empruntId }; // Ajoute l'ID aux params de la requête
        empruntController.getEmpruntById(req, res);
    } else if (empruntId && method === "PUT") {
        req.params = { id: empruntId }; // Ajoute l'ID aux params de la requête
        empruntController.updateEmprunt(req, res);
    } else if (empruntId && method === "DELETE") {
        req.params = { id: empruntId }; // Ajoute l'ID aux params de la requête
        empruntController.deleteEmprunt(req, res);
    } // Route non trouvée
    const cateIdMatch = url.match(/^\/api\/livres\/categorie\/([0-9]+)$/);
    const cateId = cateIdMatch ? parseInt(cateIdMatch[1]) : null;

    if (cateId && method === "GET") {
        req.params = { categorie: cateId }; // Assure-toi que c'est bien "categorie"
        console.log("Catégorie extraite :", req.params.categorie); // Debugging
        livreController.getLivreByCategorie(req, res);
    } else if (!cateIdMatch) {
        console.error("Erreur : L'URL ne correspond pas au format attendu.");
    } else {
        logger.warn(`Route non trouvée: ${method} ${url}`);
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Route non trouvée" }));
    }
};
