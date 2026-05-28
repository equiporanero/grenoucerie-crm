"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validationSchemaManager", {
    enumerable: true,
    get: function() {
        return validationSchemaManager;
    }
});
const _classvalidatorjsonschema = require("class-validator-jsonschema");
let ValidationSchemaManager = class ValidationSchemaManager {
    static getInstance() {
        if (!ValidationSchemaManager.instance) {
            ValidationSchemaManager.instance = new ValidationSchemaManager();
        }
        return ValidationSchemaManager.instance;
    }
    getSchemas() {
        if (!this.schemas) {
            this.schemas = (0, _classvalidatorjsonschema.validationMetadatasToSchemas)();
        }
        return this.schemas;
    }
    constructor(){
        this.schemas = null;
    }
};
const validationSchemaManager = ValidationSchemaManager.getInstance();

//# sourceMappingURL=get-json-schema.js.map