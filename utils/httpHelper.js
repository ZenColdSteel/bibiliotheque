// utils/httpHelper.js
export const sendJsonResponse = (res, statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true, data })); // retourne un objet, pas une chaîne
};

export const sendErrorResponse = (res, statusCode, message) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: message })); // retourne un objet, pas une chaîne
};
