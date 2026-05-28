"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFieldInputTypeOptions", {
    enumerable: true,
    get: function() {
        return computeFieldInputTypeOptions;
    }
});
const _types = require("twenty-shared/types");
const _gqlinputtypedefinitionkindenum = require("../enums/gql-input-type-definition-kind.enum");
const computeFieldInputTypeOptions = (fieldMetadata, kind)=>{
    return {
        nullable: fieldMetadata.isNullable ?? undefined,
        defaultValue: fieldMetadata.defaultValue ?? undefined,
        isArray: kind !== _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter && fieldMetadata.type === _types.FieldMetadataType.MULTI_SELECT,
        settings: fieldMetadata.settings,
        isIdField: fieldMetadata.name === 'id'
    };
};

//# sourceMappingURL=compute-field-input-type-options.util.js.map