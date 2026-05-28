"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMorphNameFromMorphFieldMetadataName", {
    enumerable: true,
    get: function() {
        return getMorphNameFromMorphFieldMetadataName;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _searchandreplacelastutil = require("./search-and-replace-last.util");
const getMorphNameFromMorphFieldMetadataName = ({ morphRelationFlatFieldMetadata, nameSingular, namePlural })=>{
    const isManyToOneRelationType = morphRelationFlatFieldMetadata.universalSettings.relationType === _types.RelationType.MANY_TO_ONE;
    return (0, _searchandreplacelastutil.searchAndReplaceLast)({
        source: morphRelationFlatFieldMetadata.name,
        replace: '',
        search: isManyToOneRelationType ? (0, _utils.capitalize)(nameSingular) : (0, _utils.capitalize)(namePlural)
    });
};

//# sourceMappingURL=get-morph-name-from-morph-field-metadata-name.util.js.map