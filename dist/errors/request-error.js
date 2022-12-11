export function requestError(status, statusText) {
    return {
        name: "RequestError",
        data: null,
        status,
        statusText,
        message: "No result for this search!",
    };
}
