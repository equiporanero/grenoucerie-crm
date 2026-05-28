"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildEntitySchemaMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildEntitySchemaMetadataMaps;
    }
});
const buildEntitySchemaMetadataMaps = (objectMetadatas, fieldMetadatas)=>{
    const fieldIdsByObjectId = new Map();
    for (const field of fieldMetadatas){
        const existing = fieldIdsByObjectId.get(field.objectMetadataId);
        if (existing) {
            existing.push(field.id);
        } else {
            fieldIdsByObjectId.set(field.objectMetadataId, [
                field.id
            ]);
        }
    }
    const objectMetadataMaps = {
        byId: {}
    };
    for (const object of objectMetadatas){
        objectMetadataMaps.byId[object.id] = {
            id: object.id,
            nameSingular: object.nameSingular,
            isCustom: object.isCustom,
            fieldIds: fieldIdsByObjectId.get(object.id) ?? []
        };
    }
    const fieldMetadataMaps = {
        byId: {}
    };
    for (const field of fieldMetadatas){
        fieldMetadataMaps.byId[field.id] = {
            id: field.id,
            name: field.name,
            type: field.type,
            settings: field.settings,
            isNullable: field.isNullable,
            isUnique: field.isUnique,
            defaultValue: field.defaultValue,
            options: field.options,
            objectMetadataId: field.objectMetadataId,
            relationTargetObjectMetadataId: field.relationTargetObjectMetadataId,
            relationTargetFieldMetadataId: field.relationTargetFieldMetadataId
        };
    }
    return {
        objectMetadataMaps,
        fieldMetadataMaps
    };
};

//# sourceMappingURL=entity-schema-metadata.type.js.map