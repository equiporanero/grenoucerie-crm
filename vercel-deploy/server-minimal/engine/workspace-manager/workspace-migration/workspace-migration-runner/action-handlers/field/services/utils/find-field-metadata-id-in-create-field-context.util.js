"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFieldMetadataIdInCreateFieldContext", {
    enumerable: true,
    get: function() {
        return findFieldMetadataIdInCreateFieldContext;
    }
});
const _utils = require("twenty-shared/utils");
const findFieldMetadataIdInCreateFieldContext = ({ universalIdentifier, allFieldIdToBeCreatedInActionByUniversalIdentifierMap, flatFieldMetadataMaps })=>{
    const generatedId = allFieldIdToBeCreatedInActionByUniversalIdentifierMap.get(universalIdentifier);
    if ((0, _utils.isDefined)(generatedId)) {
        return generatedId;
    }
    const existingField = flatFieldMetadataMaps.byUniversalIdentifier[universalIdentifier];
    return existingField?.id ?? null;
};

//# sourceMappingURL=find-field-metadata-id-in-create-field-context.util.js.map