"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CodeInterpreterInputZodSchema", {
    enumerable: true,
    get: function() {
        return CodeInterpreterInputZodSchema;
    }
});
const _zod = require("zod");
const CodeInterpreterInputZodSchema = _zod.z.object({
    code: _zod.z.string().describe('Python code to execute'),
    files: _zod.z.array(_zod.z.object({
        filename: _zod.z.string().describe('Name of the file'),
        fileId: _zod.z.string().describe('ID of the uploaded file (from user attachments)')
    })).optional().describe('Files to make available in the execution environment')
});

//# sourceMappingURL=code-interpreter-tool.schema.js.map