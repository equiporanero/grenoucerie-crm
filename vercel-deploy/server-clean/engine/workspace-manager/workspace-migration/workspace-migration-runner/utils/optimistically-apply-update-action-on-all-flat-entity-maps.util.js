"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "optimisticallyApplyUpdateActionOnAllFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return optimisticallyApplyUpdateActionOnAllFlatEntityMaps;
    }
});
const _utils = require("twenty-shared/utils");
const _addflatentitytoflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const _deleteflatentityfromflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../../../../metadata-modules/flat-entity/utils/delete-flat-entity-from-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _replaceflatentityinflatentitymapsthroughmutationorthrowutil = require("../../utils/replace-flat-entity-in-flat-entity-maps-through-mutation-or-throw.util");
const optimisticallyApplyUpdateActionOnAllFlatEntityMaps = ({ flatAction, allFlatEntityMaps })=>{
    switch(flatAction.metadataName){
        case 'index':
            {
                const flatIndex = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: flatAction.entityId,
                    flatEntityMaps: allFlatEntityMaps['flatIndexMaps']
                });
                (0, _deleteflatentityfromflatentityandrelatedentitymapsthroughmutationorthrowutil.deleteFlatEntityFromFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                    flatEntity: flatIndex,
                    flatEntityAndRelatedMapsToMutate: allFlatEntityMaps,
                    metadataName: flatAction.metadataName
                });
                (0, _addflatentitytoflatentityandrelatedentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                    flatEntity: flatAction.updatedFlatIndex,
                    flatEntityAndRelatedMapsToMutate: allFlatEntityMaps,
                    metadataName: flatAction.metadataName
                });
                return allFlatEntityMaps;
            }
        case 'fieldMetadata':
        case 'objectMetadata':
        case 'view':
        case 'viewField':
        case 'viewGroup':
        case 'viewFieldGroup':
        case 'viewSort':
        case 'rowLevelPermissionPredicate':
        case 'rowLevelPermissionPredicateGroup':
        case 'viewFilterGroup':
        case 'logicFunction':
        case 'viewFilter':
        case 'role':
        case 'roleTarget':
        case 'agent':
        case 'skill':
        case 'pageLayout':
        case 'pageLayoutWidget':
        case 'pageLayoutTab':
        case 'commandMenuItem':
        case 'frontComponent':
        case 'navigationMenuItem':
        case 'rolePermissionFlag':
        case 'permissionFlag':
        case 'objectPermission':
        case 'fieldPermission':
        case 'webhook':
        case 'applicationVariable':
        case 'connectionProvider':
            {
                const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(flatAction.metadataName);
                const fromFlatEntity = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: flatAction.entityId,
                    flatEntityMaps: allFlatEntityMaps[flatEntityMapsKey]
                });
                const toFlatEntity = {
                    ...fromFlatEntity,
                    ...flatAction.update
                };
                (0, _replaceflatentityinflatentitymapsthroughmutationorthrowutil.replaceFlatEntityInFlatEntityMapsThroughMutationOrThrow)({
                    flatEntity: toFlatEntity,
                    flatEntityMapsToMutate: allFlatEntityMaps[flatEntityMapsKey]
                });
                return allFlatEntityMaps;
            }
        default:
            {
                (0, _utils.assertUnreachable)(flatAction);
            }
    }
};

//# sourceMappingURL=optimistically-apply-update-action-on-all-flat-entity-maps.util.js.map