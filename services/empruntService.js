import * as empruntRepo from "../repositories/empruntRepository.js";

export async function getAllEmprunts() {
    return await empruntRepo.getAllEmpruntRepo();
}

export async function getEmpruntById(id) {
    if (!id) throw new Error("L'ID est requis");
    return await empruntRepo.getEmpruntByIdRepo(id);
}

export async function createEmprunt(
    Id_Membre,
    Date_Emprunt,
    Date_Retour_Pevu,
    Date_Dernier_Delai,
) {
    if (!Id_Membre || !Date_Retour_Pevu || !Date_Dernier_Delai) {
        throw new Error("Tous les champs obligatoires doivent être fournis");
    }
    return await empruntRepo.createEmpruntRepo(
        Id_Membre,
        Date_Emprunt,
        Date_Retour_Pevu,
        Date_Dernier_Delai,
    );
}

export async function updateEmprunt(
    id,
    Id_Membre,
    Date_Emprunt,
    Date_Retour_Pevu,
    Date_Dernier_Delai,
) {
    if (!id || !Id_Membre || !Date_Retour_Pevu || !Date_Dernier_Delai) {
        throw new Error("Tous les champs obligatoires doivent être fournis");
    }
    return await empruntRepo.updateEmpruntRepo(
        id,
        Id_Membre,
        Date_Emprunt,
        Date_Retour_Pevu,
        Date_Dernier_Delai,
    );
}

export async function deleteEmprunt(id) {
    if (!id) throw new Error("L'ID est requis");
    return await empruntRepo.deleteEmpruntRepo(id);
}
