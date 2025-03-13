export class Livre {
    constructor(id, isbn, titre, annee_publication, id_auteur) {
        this.id = id;
        this.isbn = isbn;
        this.titre = titre;
        this.annee_publication = annee_publication;
        this.id_auteur = id_auteur;
    }

    // Validation
    estValide() {
        if (!this.titre || !this.titre.trim() === "") {
            throw new Error("Le titre ne peut pas être vide");
        }
        if (
            !this.isbn ||
            !this.titre ||
            !this.annee_publication ||
            !this.id_auteur
        ) {
            throw new Error("Tous les champs sont requis");
        }

        if (
            isNaN(this.annee_publication) ||
            this.annee_publication < 1000 ||
            this.annee_publication > new Date().getFullYear()
        ) {
            throw new Error("L'année de publication est invalide");
        }
        return { valide: true };
    }
}
