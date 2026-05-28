"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isGmailApiError", {
    enumerable: true,
    get: function() {
        return isGmailApiError;
    }
});
const _zod = require("zod");
const gmailApiErrorSchema = _zod.z.object({
    response: _zod.z.object({
        status: _zod.z.number().optional(),
        data: _zod.z.object({
            error: _zod.z.union([
                _zod.z.object({
                    errors: _zod.z.array(_zod.z.object({
                        reason: _zod.z.string().optional(),
                        message: _zod.z.string().optional()
                    })).optional()
                }),
                _zod.z.string()
            ]).optional(),
            error_description: _zod.z.string().optional()
        }).optional()
    })
});
const isGmailApiError = (error)=>{
    return gmailApiErrorSchema.safeParse(error).success;
};

//# sourceMappingURL=is-gmail-api-error.util.js.map