export function forbiddenError(message) {
    return {
        name: "ForbiddenError",
        message,
    };
}
