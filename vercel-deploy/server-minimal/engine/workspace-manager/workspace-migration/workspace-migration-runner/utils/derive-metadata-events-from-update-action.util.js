"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deriveMetadataEventsFromUpdateAction", {
    enumerable: true,
    get: function() {
        return deriveMetadataEventsFromUpdateAction;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _metadataeventtoemitconstant = require("../constants/metadata-event-to-emit.constant");
const _flatentitytoscalarflatentityutil = require("./flat-entity-to-scalar-flat-entity.util");
const buildUpdateMetadataEvent = ({ metadataName, before, after, updatedFields })=>{
    const diff = Object.fromEntries(updatedFields.map((field)=>[
            field,
            {
                before: before[field],
                after: after[field]
            }
        ]));
    return {
        type: 'updated',
        metadataName,
        recordId: before.id,
        properties: {
            updatedFields,
            diff,
            before: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                flatEntity: before,
                metadataName
            }),
            after: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                flatEntity: after,
                metadataName
            })
        }
    };
};
const deriveMetadataEventsFromUpdateAction = ({ flatAction, allFlatEntityMaps })=>{
    const events = deriveAllMetadataEventsFromUpdateAction({
        flatAction,
        allFlatEntityMaps
    });
    return events.filter((event)=>_metadataeventtoemitconstant.METADATA_EVENTS_TO_EMIT[event.metadataName]);
};
const deriveAllMetadataEventsFromUpdateAction = ({ flatAction, allFlatEntityMaps })=>{
    switch(flatAction.metadataName){
        case 'index':
            {
                const fromFlatEntity = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: flatAction.entityId,
                    flatEntityMaps: allFlatEntityMaps['flatIndexMaps']
                });
                const toFlatEntity = flatAction.updatedFlatIndex;
                const deleteIndexMetadataEvent = {
                    metadataName: 'index',
                    recordId: fromFlatEntity.id,
                    properties: {
                        before: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                            flatEntity: fromFlatEntity,
                            metadataName: 'index'
                        })
                    },
                    type: 'deleted'
                };
                const createIndexMetadataEvent = {
                    metadataName: 'index',
                    recordId: toFlatEntity.id,
                    properties: {
                        after: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                            flatEntity: toFlatEntity,
                            metadataName: 'index'
                        })
                    },
                    type: 'created'
                };
                return [
                    deleteIndexMetadataEvent,
                    createIndexMetadataEvent
                ];
            }
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
                const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(flatAction.metadataName);
                const fromFlatEntity = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: flatAction.entityId,
                    flatEntityMaps: allFlatEntityMaps[flatEntityMapsKey]
                });
                const toFlatEntity = {
                    ...fromFlatEntity,
                    ...flatAction.update
                };
                const updatedFields = Object.keys(flatAction.update);
                return [
                    buildUpdateMetadataEvent({
                        metadataName: flatAction.metadataName,
                        before: fromFlatEntity,
                        after: toFlatEntity,
                        updatedFields
                    })
                ];
            }
        default:
            {
                (0, _utils.assertUnreachable)(flatAction);
            }
    }
};

//# sourceMappingURL=derive-metadata-events-from-update-action.util.js.map