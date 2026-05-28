"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "optimisticallyApplyCreateActionOnAllFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return optimisticallyApplyCreateActionOnAllFlatEntityMaps;
    }
});
const _utils = require("twenty-shared/utils");
const _addflatentitytoflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const optimisticallyApplyCreateActionOnAllFlatEntityMaps = ({ flatAction, allFlatEntityMaps })=>{
    switch(flatAction.metadataName){
        case 'fieldMetadata':
            {
                const flatFieldMetadatas = [
                    flatAction.flatEntity,
                    flatAction.relatedFlatFieldMetadata
                ].filter(_utils.isDefined);
                flatFieldMetadatas.forEach((flatEntity)=>(0, _addflatentitytoflatentityandrelatedentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                        flatEntity,
                        flatEntityAndRelatedMapsToMutate: allFlatEntityMaps,
                        metadataName: flatAction.metadataName
                    }));
                return allFlatEntityMaps;
            }
        case 'objectMetadata':
            {
                (0, _addflatentitytoflatentityandrelatedentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                    flatEntity: flatAction.flatEntity,
                    flatEntityAndRelatedMapsToMutate: allFlatEntityMaps,
                    metadataName: flatAction.metadataName
                });
                flatAction.flatFieldMetadatas.forEach((flatField)=>(0, _addflatentitytoflatentityandrelatedentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                        flatEntity: flatField,
                        flatEntityAndRelatedMapsToMutate: allFlatEntityMaps,
                        metadataName: 'fieldMetadata'
                    }));
                return allFlatEntityMaps;
            }
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
                (0, _addflatentitytoflatentityandrelatedentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                    flatEntity: flatAction.flatEntity,
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

//# sourceMappingURL=optimistically-apply-create-action-on-all-flat-entity-maps.util.js.map