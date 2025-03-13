import { Livre } from "../models/Livre.js";
import {
    getAllLivreRepo,
    getLivreByIdRepo,
    getLivreByAuteurRepo,
    createLivreRepo,
    updateLivreRepo,
    deleteLivreRepo,
} from "../repositories/livreRepository.js";
/**
 * Récupère tous les livres
 */
export async function getAllLivresService() {
    return await getAllLivreRepo();
}

/**
 * Récupère un livre par son ID
 */
export async function getLivreByIdService(id) {
    if (!id) throw new Error("L'ID du livre est requis");

    const livre = await getLivreByIdRepo(id);
    if (!livre) throw new Error("Livre introuvable");

    return livre;
}

/**
 * Récupère les livres d'un auteur donné
 */
export async function getLivresByAuteurService(id_auteur) {
    if (!id_auteur) throw new Error("L'ID de l'auteur est requis");

    return await getLivreByAuteurRepo(id_auteur);
}

/**
 * Crée un nouveau livre avec validation
 */
export async function createLivreService(
    isbn,
    titre,
    annee_publication,
    id_auteur,
) {
    const nouveauLivre = new Livre(
        null,
        isbn,
        titre,
        annee_publication,
        id_auteur,
    );
    console.log("nouveauLivre", nouveauLivre);
    await createLivreRepo(nouveauLivre);
    return;
}

/**
 * Met à jour un livre existant
 */
export async function updateLivreService(
    id,
    isbn,
    titre,
    annee_publication,
    id_auteur,
) {
    if (!id) throw new Error("L'ID du livre est requis");
    if (!isbn || !titre || !annee_publication || !id_auteur) {
        throw new Error("Tous les champs sont requis");
    }

    if (
        isNaN(annee_publication) ||
        annee_publication < 1000 ||
        annee_publication > new Date().getFullYear()
    ) {
        throw new Error("L'année de publication est invalide");
    }

    const updatedLivre = await updateLivreRepo(
        id,
        isbn,
        titre,
        annee_publication,
        id_auteur,
    );
    if (!updatedLivre)
        throw new Error("Livre non trouvé ou mise à jour impossible");

    return updatedLivre;
}

export async function deleteLivreService(id) {
    if (!id) throw new Error("L'ID du livre est requis");

    const deleted = await deleteLivreRepo(id);
    if (!deleted) throw new Error("Livre introuvable ou déjà supprimé");

    return deleted;
}
