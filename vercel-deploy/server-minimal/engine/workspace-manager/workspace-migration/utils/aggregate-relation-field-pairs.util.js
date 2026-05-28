"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aggregateRelationFieldPairs", {
    enumerable: true,
    get: function() {
        return aggregateRelationFieldPairs;
    }
});
const _utils = require("twenty-shared/utils");
const aggregateRelationFieldPairs = ({ orchestratorActionsReport })=>{
    const createFieldActions = orchestratorActionsReport.fieldMetadata.create;
    const actionByFieldUniversalIdentifier = new Map();
    for (const action of createFieldActions){
        actionByFieldUniversalIdentifier.set(action.flatEntity.universalIdentifier, action);
    }
    const processedFieldUniversalIdentifiers = new Set();
    const aggregatedCreateFieldActions = [];
    for (const [universalIdentifier, action] of actionByFieldUniversalIdentifier){
        if (processedFieldUniversalIdentifiers.has(universalIdentifier)) {
            continue;
        }
        processedFieldUniversalIdentifiers.add(universalIdentifier);
        const targetUniversalIdentifier = action.flatEntity.relationTargetFieldMetadataUniversalIdentifier;
        if (!(0, _utils.isDefined)(targetUniversalIdentifier)) {
            aggregatedCreateFieldActions.push(action);
            continue;
        }
        const targetAction = actionByFieldUniversalIdentifier.get(targetUniversalIdentifier);
        if (!(0, _utils.isDefined)(targetAction) || processedFieldUniversalIdentifiers.has(targetUniversalIdentifier)) {
            aggregatedCreateFieldActions.push(action);
            continue;
        }
        processedFieldUniversalIdentifiers.add(targetUniversalIdentifier);
        aggregatedCreateFieldActions.push({
            type: 'create',
            metadataName: 'fieldMetadata',
            flatEntity: action.flatEntity,
            id: action.id,
            relatedUniversalFlatFieldMetadata: targetAction.flatEntity,
            relatedFieldId: targetAction.id
        });
    }
    return {
        ...orchestratorActionsReport,
        fieldMetadata: {
            ...orchestratorActionsReport.fieldMetadata,
            create: aggregatedCreateFieldActions
        }
    };
};

//# sourceMappingURL=aggregate-relation-field-pairs.util.js.map