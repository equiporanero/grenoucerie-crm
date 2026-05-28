"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostgresException", {
    enumerable: true,
    get: function() {
        return PostgresException;
    }
});
let PostgresException = class PostgresException extends Error {
    constructor(message, code){
        super(message);
        this.code = code;
    }
};

//# sourceMappingURL=postgres-exception.js.map