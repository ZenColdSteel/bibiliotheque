import {
    getAllAuteurRepo,
    getAuteurByIdRepo,
    createAuteurRepo,
    updateAuteurRepo,
    deleteAuteurRepo,
} from "../repositories/auteurRepository.js";
/**
 * Récupère tous les auteurs
 */
export async function getAllAuteurService() {
    return await getAllAuteurRepo();
}

/**
 * Récupère un auteur par son ID
 */
export async function getAuteurByIdService(id) {
    if (!id) throw new Error("L'ID du auteur est requis");

    const auteur = await getAuteurByIdRepo(id);
    if (!auteur) throw new Error("Auteur introuvable");

    return auteur;
}

/**
 * Crée un nouveau auteur avec validation
 */
export async function createAuteurService(
    nom,
    prenom,
    date_naissance,
    nationalite,
) {
    const validateDate = new Date(date_naissance);

    if (isNaN(validateDate.getTime())) {
        throw new Error("L'annee de naissance est invalide");
    }
    console.log(nom + prenom + date_naissance + nationalite);
    if (!nom || !prenom || !date_naissance || !nationalite) {
        throw new Error("Tous les champs sont requis");
    }

    return await createAuteurRepo(nom, prenom, date_naissance, nationalite);
}

/**
 * Met à jour un auteur existant
 */
export async function updateAuteurService(
    id,
    nom,
    prenom,
    date_naissance,
    nationalite,
) {
    const validateDate = new Date(date_naissance);
    if (!id) throw new Error("L'ID du auteur est requis");
    if (isNaN(validateDate.getTime())) {
        throw new Error("L'annee de naissance est invalide");
    }
    console.log(nom + prenom + date_naissance + nationalite);
    if (!nom || !prenom || !date_naissance || !nationalite) {
        throw new Error("Tous les champs sont requis");
    }

    const updatedAuteur = await updateAuteurRepo(
        id,
        nom,
        prenom,
        date_naissance,
        nationalite,
    );
    if (!updatedAuteur)
        throw new Error("Auteur non trouvé ou mise à jour impossible");

    return updatedAuteur;
}

export async function deleteAuteurService(id) {
    if (!id) throw new Error("L'ID du auteur est requis");

    const deleted = await deleteAuteurRepo(id);
    if (!deleted) throw new Error("Auteur introuvable ou déjà supprimé");

    return deleted;
}
