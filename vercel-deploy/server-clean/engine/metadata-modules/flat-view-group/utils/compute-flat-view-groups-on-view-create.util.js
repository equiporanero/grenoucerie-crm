"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFlatViewGroupsOnViewCreate", {
    enumerable: true,
    get: function() {
        return computeFlatViewGroupsOnViewCreate;
    }
});
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const computeFlatViewGroupsOnViewCreate = ({ flatViewToCreateUniversalIdentifier, mainGroupByFieldMetadataId, flatFieldMetadataMaps })=>{
    const mainGroupByFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: mainGroupByFieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(mainGroupByFieldMetadata)) {
        throw new _flatentitymapsexception.FlatEntityMapsException('mainGroupByFieldMetadataId not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const createdAt = new Date().toISOString();
    const flatViewGroupsFromOptions = (mainGroupByFieldMetadata.options ?? []).map((option, index)=>({
            viewUniversalIdentifier: flatViewToCreateUniversalIdentifier,
            createdAt,
            updatedAt: createdAt,
            deletedAt: null,
            universalIdentifier: (0, _uuid.v4)(),
            isVisible: index < _constants.VIEW_GROUP_VISIBLE_OPTIONS_MAX,
            fieldValue: option.value,
            position: index,
            applicationUniversalIdentifier: mainGroupByFieldMetadata.applicationUniversalIdentifier
        }));
    const flatViewGroups = [
        ...flatViewGroupsFromOptions
    ];
    if (mainGroupByFieldMetadata.isNullable === true) {
        const emptyGroupId = (0, _uuid.v4)();
        const emptyGroupPosition = flatViewGroupsFromOptions.length;
        flatViewGroups.push({
            viewUniversalIdentifier: flatViewToCreateUniversalIdentifier,
            createdAt,
            updatedAt: createdAt,
            deletedAt: null,
            universalIdentifier: emptyGroupId,
            isVisible: emptyGroupPosition < _constants.VIEW_GROUP_VISIBLE_OPTIONS_MAX,
            fieldValue: '',
            position: emptyGroupPosition,
            applicationUniversalIdentifier: mainGroupByFieldMetadata.applicationUniversalIdentifier
        });
    }
    return flatViewGroups;
};

//# sourceMappingURL=compute-flat-view-groups-on-view-create.util.js.map