"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeSearchVectorUniversalSettingsFromObjectManifest", {
    enumerable: true,
    get: function() {
        return computeSearchVectorUniversalSettingsFromObjectManifest;
    }
});
const _gettsvectorcolumnexpressionutil = require("../../../../workspace-manager/utils/get-ts-vector-column-expression.util");
const _utils = require("twenty-shared/utils");
const computeSearchVectorUniversalSettingsFromObjectManifest = ({ objectManifest })=>{
    const labelIdentifierField = objectManifest.fields.find((field)=>field.universalIdentifier === objectManifest.labelIdentifierFieldMetadataUniversalIdentifier);
    if (!(0, _utils.isDefined)(labelIdentifierField) || !(0, _utils.isSearchableFieldType)(labelIdentifierField.type)) {
        return null;
    }
    return {
        asExpression: (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)([
            {
                name: labelIdentifierField.name,
                type: labelIdentifierField.type
            }
        ]),
        generatedType: 'STORED'
    };
};

//# sourceMappingURL=compute-search-vector-universal-settings-from-object-manifest.util.js.map