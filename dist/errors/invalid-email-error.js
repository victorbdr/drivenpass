export function invalidEmailError(email) {
    return {
        name: "InvalidEmailError",
        email: email,
        message: `"${email}" is not a valid email!`,
    };
}
