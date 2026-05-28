"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aggregateNonRelationFieldsIntoObjectActions", {
    enumerable: true,
    get: function() {
        return aggregateNonRelationFieldsIntoObjectActions;
    }
});
const _utils = require("twenty-shared/utils");
const _ismorphorrelationfieldmetadatatypeutil = require("../../../utils/is-morph-or-relation-field-metadata-type.util");
const aggregateNonRelationFieldsIntoObjectActions = ({ orchestratorActionsReport })=>{
    const createObjectActions = orchestratorActionsReport.objectMetadata.create;
    const createFieldActions = orchestratorActionsReport.fieldMetadata.create;
    const createObjectActionByObjectUniversalIdentifier = new Map();
    for (const createObjectAction of createObjectActions){
        createObjectActionByObjectUniversalIdentifier.set(createObjectAction.flatEntity.universalIdentifier, createObjectAction);
    }
    const remainingCreateFieldActions = [];
    for (const createFieldAction of createFieldActions){
        const flatFieldMetadata = createFieldAction.flatEntity;
        if ((0, _ismorphorrelationfieldmetadatatypeutil.isMorphOrRelationFieldMetadataType)(flatFieldMetadata.type)) {
            remainingCreateFieldActions.push(createFieldAction);
            continue;
        }
        const objectUniversalId = flatFieldMetadata.objectMetadataUniversalIdentifier;
        const matchingObjectAction = createObjectActionByObjectUniversalIdentifier.get(objectUniversalId);
        if ((0, _utils.isDefined)(matchingObjectAction)) {
            matchingObjectAction.universalFlatFieldMetadatas.push(flatFieldMetadata);
            if ((0, _utils.isDefined)(createFieldAction.id)) {
                matchingObjectAction.fieldIdByUniversalIdentifier = {
                    ...matchingObjectAction.fieldIdByUniversalIdentifier,
                    [flatFieldMetadata.universalIdentifier]: createFieldAction.id
                };
            }
        } else {
            remainingCreateFieldActions.push(createFieldAction);
        }
    }
    return {
        ...orchestratorActionsReport,
        objectMetadata: {
            ...orchestratorActionsReport.objectMetadata,
            create: Array.from(createObjectActionByObjectUniversalIdentifier.values())
        },
        fieldMetadata: {
            ...orchestratorActionsReport.fieldMetadata,
            create: remainingCreateFieldActions
        }
    };
};

//# sourceMappingURL=aggregate-non-relation-fields-into-object-actions.util.js.map