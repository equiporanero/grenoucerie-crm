"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "optimisticallyApplyDeleteActionOnAllFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return optimisticallyApplyDeleteActionOnAllFlatEntityMaps;
    }
});
const _utils = require("twenty-shared/utils");
const _deleteflatentityfromflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../../../../metadata-modules/flat-entity/utils/delete-flat-entity-from-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const optimisticallyApplyDeleteActionOnAllFlatEntityMaps = ({ flatAction, allFlatEntityMaps })=>{
    switch(flatAction.metadataName){
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
        case 'index':
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
                const flatEntityToDelete = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: flatAction.entityId,
                    flatEntityMaps: allFlatEntityMaps[(0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(flatAction.metadataName)]
                });
                (0, _deleteflatentityfromflatentityandrelatedentitymapsthroughmutationorthrowutil.deleteFlatEntityFromFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                    flatEntity: flatEntityToDelete,
                    flatEntityAndRelatedMapsToMutate: allFlatEntityMaps,
                    metadataName: flatAction.metadataName
                });
                return allFlatEntityMaps;
            }
        default:
            {
                (0, _utils.assertUnreachable)(flatAction);
            }
    }
};

//# sourceMappingURL=optimistically-apply-delete-action-on-all-flat-entity-maps.util.js.map