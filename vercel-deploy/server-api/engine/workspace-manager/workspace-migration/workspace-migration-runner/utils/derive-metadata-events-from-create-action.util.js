"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deriveMetadataEventsFromCreateAction", {
    enumerable: true,
    get: function() {
        return deriveMetadataEventsFromCreateAction;
    }
});
const _utils = require("twenty-shared/utils");
const _metadataeventtoemitconstant = require("../constants/metadata-event-to-emit.constant");
const _flatentitytoscalarflatentityutil = require("./flat-entity-to-scalar-flat-entity.util");
const deriveMetadataEventsFromCreateAction = (flatAction)=>{
    const events = deriveAllMetadataEventsFromCreateAction(flatAction);
    return events.filter((event)=>_metadataeventtoemitconstant.METADATA_EVENTS_TO_EMIT[event.metadataName]);
};
const deriveAllMetadataEventsFromCreateAction = (flatAction)=>{
    switch(flatAction.metadataName){
        case 'fieldMetadata':
            {
                const flatFieldMetadatas = [
                    flatAction.flatEntity,
                    flatAction.relatedFlatFieldMetadata
                ].filter(_utils.isDefined);
                return flatFieldMetadatas.map((flatFieldMetadata)=>({
                        type: 'created',
                        recordId: flatFieldMetadata.id,
                        metadataName: 'fieldMetadata',
                        properties: {
                            after: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                                flatEntity: flatFieldMetadata,
                                metadataName: 'fieldMetadata'
                            })
                        }
                    }));
            }
        case 'objectMetadata':
            {
                const objectEvent = {
                    type: 'created',
                    metadataName: 'objectMetadata',
                    recordId: flatAction.flatEntity.id,
                    properties: {
                        after: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                            flatEntity: flatAction.flatEntity,
                            metadataName: 'objectMetadata'
                        })
                    }
                };
                const fieldEvents = flatAction.flatFieldMetadatas.map((flatFieldMetadata)=>({
                        type: 'created',
                        recordId: flatFieldMetadata.id,
                        metadataName: 'fieldMetadata',
                        properties: {
                            after: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                                flatEntity: flatFieldMetadata,
                                metadataName: 'fieldMetadata'
                            })
                        }
                    }));
                return [
                    objectEvent,
                    ...fieldEvents
                ];
            }
        case 'applicationVariable':
            {
                return [];
            }
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
                return [
                    {
                        type: 'created',
                        recordId: flatAction.flatEntity.id,
                        metadataName: flatAction.metadataName,
                        properties: {
                            after: (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                                flatEntity: flatAction.flatEntity,
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

//# sourceMappingURL=derive-metadata-events-from-create-action.util.js.map