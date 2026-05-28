"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMinimalSelectForRecordIdentifier", {
    enumerable: true,
    get: function() {
        return getMinimalSelectForRecordIdentifier;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computecolumnnameutil = require("../../field-metadata/utils/compute-column-name.util");
const _iscompositefieldmetadatatypeutil = require("../../field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const ID_FIELD = 'id';
const COMPANY_AVATAR_COLUMN = 'domainNamePrimaryLinkUrl';
const PERSON_AVATAR_COLUMN = 'avatarFile';
const getMinimalSelectForRecordIdentifier = ({ flatObjectMetadata, flatFieldMetadataMaps })=>{
    const selectColumns = [
        ID_FIELD
    ];
    const labelField = (0, _utils.isDefined)(flatObjectMetadata.labelIdentifierFieldMetadataId) ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityId: flatObjectMetadata.labelIdentifierFieldMetadataId
    }) : undefined;
    if ((0, _utils.isDefined)(labelField)) {
        const labelCompositeType = (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(labelField.type) ? _types.compositeTypeDefinitions.get(labelField.type) : undefined;
        if ((0, _utils.isDefined)(labelCompositeType)) {
            for (const compositeProperty of labelCompositeType.properties){
                selectColumns.push((0, _computecolumnnameutil.computeCompositeColumnName)(labelField.name, compositeProperty));
            }
        } else {
            selectColumns.push(labelField.name);
        }
    }
    if (flatObjectMetadata.nameSingular === 'company') {
        selectColumns.push(COMPANY_AVATAR_COLUMN);
    //TODO: Temporary solution before imageIdentifier refactor
    } else if (flatObjectMetadata.nameSingular === 'person') {
        selectColumns.push(PERSON_AVATAR_COLUMN);
    } else if ((0, _utils.isDefined)(flatObjectMetadata.imageIdentifierFieldMetadataId)) {
        const imageField = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityMaps: flatFieldMetadataMaps,
            flatEntityId: flatObjectMetadata.imageIdentifierFieldMetadataId
        });
        if ((0, _utils.isDefined)(imageField)) {
            const imageCompositeType = (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(imageField.type) ? _types.compositeTypeDefinitions.get(imageField.type) : undefined;
            if ((0, _utils.isDefined)(imageCompositeType)) {
                for (const compositeProperty of imageCompositeType.properties){
                    selectColumns.push((0, _computecolumnnameutil.computeCompositeColumnName)(imageField.name, compositeProperty));
                }
            } else {
                selectColumns.push(imageField.name);
            }
        }
    }
    return selectColumns;
};

//# sourceMappingURL=get-minimal-select-for-record-identifier.util.js.map