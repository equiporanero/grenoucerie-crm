"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCompositeFieldMetadataCollection", {
    enumerable: true,
    get: function() {
        return getCompositeFieldMetadataCollection;
    }
});
const _getflatfieldsforflatobjectmetadatautil = require("../../api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
function getCompositeFieldMetadataCollection(flatObjectMetadata, flatFieldMetadataMaps) {
    const compositeFieldMetadataCollection = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps).filter((fieldMetadataItem)=>(0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadataItem.type));
    return compositeFieldMetadataCollection;
}

//# sourceMappingURL=get-composite-field-metadata-collection.js.map