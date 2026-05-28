"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterMorphRelationDuplicateFields", {
    enumerable: true,
    get: function() {
        return filterMorphRelationDuplicateFields;
    }
});
const _types = require("twenty-shared/types");
const _isflatfieldmetadataoftypeutil = require("../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const _pickmorphgroupsurvivorutil = require("./pick-morph-group-survivor.util");
const filterMorphRelationDuplicateFields = (flatFieldMetadatas)=>{
    const otherFlatFieldMetadatas = [];
    const morphGroupsByMorphId = new Map();
    for (const flatFieldMetadata of flatFieldMetadatas){
        if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
            const existing = morphGroupsByMorphId.get(flatFieldMetadata.morphId) ?? [];
            morphGroupsByMorphId.set(flatFieldMetadata.morphId, [
                ...existing,
                flatFieldMetadata
            ]);
        } else {
            otherFlatFieldMetadatas.push(flatFieldMetadata);
        }
    }
    const filteredMorphFlatFieldMetadatas = [];
    for (const group of morphGroupsByMorphId.values()){
        filteredMorphFlatFieldMetadatas.push((0, _pickmorphgroupsurvivorutil.pickMorphGroupSurvivor)(group));
    }
    return [
        ...otherFlatFieldMetadatas,
        ...filteredMorphFlatFieldMetadatas
    ];
};

//# sourceMappingURL=filter-morph-relation-duplicate-fields.util.js.map