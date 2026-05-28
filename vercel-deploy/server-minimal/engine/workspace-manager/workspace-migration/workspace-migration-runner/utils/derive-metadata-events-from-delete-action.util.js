"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deriveMetadataEventsFromDeleteAction", {
    enumerable: true,
    get: function() {
        return deriveMetadataEventsFromDeleteAction;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _metadataeventtoemitconstant = require("../constants/metadata-event-to-emit.constant");
const _flatentitytoscalarflatentityutil = require("./flat-entity-to-scalar-flat-entity.util");
const deriveMetadataEventsFromDeleteAction = ({ flatAction, allFlatEntityMaps })=>{
    const events = deriveAllMetadataEventsFromDeleteAction({
        flatAction,
        allFlatEntityMaps
    });
    return events.filter((event)=>_metadataeventtoemitconstant.METADATA_EVENTS_TO_EMIT[event.metadataName]);
};
const deriveAllMetadataEventsFromDeleteAction = ({ flatAction, allFlatEntityMaps })=>{
    switch(flatAction.metadataName){
        case 'applicationVariable':
            {
                return [];
            }
        case 'fieldMetadata':
        case 'objectMetadata':
        case 'view':
        case 'viewField':
        case 'viewGroup':
        case 'viewFieldGroup':
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
        case 'viewSort':
        case 'webhook':
        case 'connectionProvider':
            {
                const flatEntityToDelete = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: flatAction.entityId,
                    flatEntityMaps: allFlatEntityMaps[(0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(flatAction.metadataName)]
                });
                return [
                    {
                        type: 'deleted',
                        metadataName: flatAction.metadataName,
                        recordId: flatAction.entityId,
                        properties: {
                            before: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                                flatEntity: flatEntityToDelete,
                                metadataName: flatAction.metadataName
                            })
                        }
                    }
                ];
            }
        default:
            {
                (0, _utils.assertUnreachable)(flatAction);
            }
    }
};

//# sourceMappingURL=derive-metadata-events-from-delete-action.util.js.map