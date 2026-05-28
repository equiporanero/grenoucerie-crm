"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCompositeFieldObjectTypeKey", {
    enumerable: true,
    get: function() {
        return computeCompositeFieldObjectTypeKey;
    }
});
const _utils = require("twenty-shared/utils");
const _objecttypedefinitionkindenum = require("../../enums/object-type-definition-kind.enum");
const computeCompositeFieldObjectTypeKey = (compositeFieldMetadataType)=>{
    return `${(0, _utils.pascalCase)(compositeFieldMetadataType)}${_objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain.toString()}`;
};

//# sourceMappingURL=compute-composite-field-object-type-key.util.js.map