"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "entitySchemaFactories", {
    enumerable: true,
    get: function() {
        return entitySchemaFactories;
    }
});
const _entityschemacolumnfactory = require("./entity-schema-column.factory");
const _entityschemarelationfactory = require("./entity-schema-relation.factory");
const _entityschemafactory = require("./entity-schema.factory");
const entitySchemaFactories = [
    _entityschemacolumnfactory.EntitySchemaColumnFactory,
    _entityschemarelationfactory.EntitySchemaRelationFactory,
    _entityschemafactory.EntitySchemaFactory
];

//# sourceMappingURL=index.js.map