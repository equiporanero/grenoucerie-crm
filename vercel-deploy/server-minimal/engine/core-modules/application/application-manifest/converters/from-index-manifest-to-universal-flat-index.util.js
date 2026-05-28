"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromIndexManifestToUniversalFlatIndex", {
    enumerable: true,
    get: function() {
        return fromIndexManifestToUniversalFlatIndex;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _iscompositefieldmetadatatypeutil = require("../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _generateflatindexutil = require("../../../../metadata-modules/index-metadata/utils/generate-flat-index.util");
const _validateindextypeagainstfieldsutil = require("../../../../metadata-modules/index-metadata/utils/validate-index-type-against-fields.util");
const fromIndexManifestToUniversalFlatIndex = ({ indexManifest, flatObjectMetadata, objectFlatFieldMetadatas, applicationUniversalIdentifier, now })=>{
    if (indexManifest.fields.length === 0) {
        throw new Error(`Index "${indexManifest.universalIdentifier}" must reference at least one field`);
    }
    const dedupKeys = indexManifest.fields.map((entry)=>`${entry.fieldUniversalIdentifier}::${entry.subFieldName ?? ''}`);
    if (new Set(dedupKeys).size !== dedupKeys.length) {
        throw new Error(`Index "${indexManifest.universalIdentifier}" lists the same column twice`);
    }
    const resolvedIndexType = indexManifest.indexType ?? 'BTREE';
    const resolvedFieldsForValidation = [];
    const universalFlatIndexFieldMetadatas = indexManifest.fields.map((entry, order)=>{
        const flatField = objectFlatFieldMetadatas.find((candidate)=>candidate.universalIdentifier === entry.fieldUniversalIdentifier);
        if (!(0, _utils.isDefined)(flatField)) {
            throw new Error(`Index "${indexManifest.universalIdentifier}" references unknown field ${entry.fieldUniversalIdentifier} on object ${flatObjectMetadata.universalIdentifier}`);
        }
        const isComposite = (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(flatField.type);
        if (isComposite) {
            if (!(0, _guards.isNonEmptyString)(entry.subFieldName)) {
                throw new Error(`Composite field "${flatField.name}" requires a subFieldName in index "${indexManifest.universalIdentifier}"`);
            }
            const property = _types.compositeTypeDefinitions.get(flatField.type)?.properties.find((compositeProperty)=>compositeProperty.name === entry.subFieldName);
            if (!(0, _utils.isDefined)(property)) {
                throw new Error(`Sub-field "${entry.subFieldName}" not found on composite field "${flatField.name}" in index "${indexManifest.universalIdentifier}"`);
            }
        } else if ((0, _guards.isNonEmptyString)(entry.subFieldName)) {
            throw new Error(`Field "${flatField.name}" is not composite — subFieldName must be omitted in index "${indexManifest.universalIdentifier}"`);
        }
        const subFieldName = isComposite ? entry.subFieldName ?? null : null;
        resolvedFieldsForValidation.push({
            type: flatField.type,
            name: flatField.name,
            label: flatField.label,
            subFieldName
        });
        return {
            createdAt: now,
            updatedAt: now,
            order,
            subFieldName,
            fieldMetadataUniversalIdentifier: flatField.universalIdentifier,
            indexMetadataUniversalIdentifier: indexManifest.universalIdentifier
        };
    });
    (0, _validateindextypeagainstfieldsutil.validateIndexTypeAgainstFieldsOrThrow)({
        indexType: resolvedIndexType,
        fields: resolvedFieldsForValidation
    });
    return (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
        flatObjectMetadata,
        objectFlatFieldMetadatas,
        flatIndex: {
            createdAt: now,
            updatedAt: now,
            universalIdentifier: indexManifest.universalIdentifier,
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier: flatObjectMetadata.universalIdentifier,
            indexType: resolvedIndexType,
            indexWhereClause: null,
            isCustom: false,
            isUnique: indexManifest.isUnique ?? false,
            universalFlatIndexFieldMetadatas
        }
    });
};

//# sourceMappingURL=from-index-manifest-to-universal-flat-index.util.js.map