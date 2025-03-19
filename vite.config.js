import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: true, // Active les tests globaux
        environment: "node", // Utilisation de l'environnement Node.js pour les tests
    },
});
