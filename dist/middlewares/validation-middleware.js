import { invalidDataError } from "@/errors";
import httpStatus from "http-status";
export function validateBody(schema) {
    return validate(schema, "body");
}
export function validateParams(schema) {
    return validate(schema, "params");
}
function validate(schema, type) {
    return (req, res, next) => {
        const { error } = schema.validate(req[type], {
            abortEarly: false,
        });
        if (!error) {
            next();
        }
        else {
            res
                .status(httpStatus.BAD_REQUEST)
                .send(invalidDataError(error.details.map((d) => d.message)));
        }
    };
}
