"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "converRelationTypeToTypeORMRelationType", {
    enumerable: true,
    get: function() {
        return converRelationTypeToTypeORMRelationType;
    }
});
const _relationtypeinterface = require("../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const converRelationTypeToTypeORMRelationType = (type)=>{
    switch(type){
        case _relationtypeinterface.RelationType.ONE_TO_MANY:
            return 'one-to-many';
        case _relationtypeinterface.RelationType.MANY_TO_ONE:
            return 'many-to-one';
        default:
            throw new Error(`Invalid relation type: ${type}`);
    }
};

//# sourceMappingURL=convert-relation-type-to-typeorm-relation-type.util.js.map