"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "enrichCreateWorkspaceMigrationActionsWithIds", {
    enumerable: true,
    get: function() {
        return enrichCreateWorkspaceMigrationActionsWithIds;
    }
});
const _utils = require("twenty-shared/utils");
const buildFieldIdByUniversalIdentifierForObjectAction = ({ action, fieldMetadataIdByUniversalIdentifier })=>{
    const fieldIdByUniversalIdentifier = {
        ...action.fieldIdByUniversalIdentifier
    };
    for (const universalFlatFieldMetadata of action.universalFlatFieldMetadatas){
        const providedFieldId = fieldMetadataIdByUniversalIdentifier[universalFlatFieldMetadata.universalIdentifier];
        if ((0, _utils.isDefined)(providedFieldId)) {
            fieldIdByUniversalIdentifier[universalFlatFieldMetadata.universalIdentifier] = providedFieldId;
        }
    }
    if (Object.keys(fieldIdByUniversalIdentifier).length === 0) {
        return undefined;
    }
    return fieldIdByUniversalIdentifier;
};
const buildTabIdByUniversalIdentifier = ({ action, pageLayoutTabIdByUniversalIdentifier })=>{
    const tabIdByUniversalIdentifier = {
        ...action.tabIdByUniversalIdentifier,
        ...pageLayoutTabIdByUniversalIdentifier
    };
    if (Object.keys(tabIdByUniversalIdentifier).length === 0) {
        return undefined;
    }
    return tabIdByUniversalIdentifier;
};
const enrichCreateWorkspaceMigrationActionsWithIds = ({ workspaceMigration, idByUniversalIdentifierByMetadataName })=>{
    const fieldMetadataIdByUniversalIdentifier = idByUniversalIdentifierByMetadataName.fieldMetadata;
    const pageLayoutTabIdByUniversalIdentifier = idByUniversalIdentifierByMetadataName.pageLayoutTab;
    const enrichedActions = workspaceMigration.actions.map((action)=>{
        if (action.type !== 'create') {
            return action;
        }
        const idByUniversalIdentifier = idByUniversalIdentifierByMetadataName[action.metadataName];
        if (!(0, _utils.isDefined)(idByUniversalIdentifier) && !(0, _utils.isDefined)(fieldMetadataIdByUniversalIdentifier) && !(0, _utils.isDefined)(pageLayoutTabIdByUniversalIdentifier)) {
            return action;
        }
        switch(action.metadataName){
            case 'objectMetadata':
                {
                    const id = (0, _utils.isDefined)(idByUniversalIdentifier) ? idByUniversalIdentifier[action.flatEntity.universalIdentifier] : undefined;
                    const fieldIdByUniversalIdentifier = (0, _utils.isDefined)(fieldMetadataIdByUniversalIdentifier) ? buildFieldIdByUniversalIdentifierForObjectAction({
                        action,
                        fieldMetadataIdByUniversalIdentifier
                    }) : undefined;
                    return {
                        ...action,
                        id,
                        fieldIdByUniversalIdentifier
                    };
                }
            case 'fieldMetadata':
                {
                    if (!(0, _utils.isDefined)(fieldMetadataIdByUniversalIdentifier)) {
                        return action;
                    }
                    const relatedFieldId = (0, _utils.isDefined)(action.relatedUniversalFlatFieldMetadata) ? fieldMetadataIdByUniversalIdentifier[action.relatedUniversalFlatFieldMetadata.universalIdentifier] : undefined;
                    return {
                        ...action,
                        id: fieldMetadataIdByUniversalIdentifier[action.flatEntity.universalIdentifier],
                        relatedFieldId
                    };
                }
            case 'pageLayout':
                {
                    const id = (0, _utils.isDefined)(idByUniversalIdentifier) ? idByUniversalIdentifier[action.flatEntity.universalIdentifier] : undefined;
                    const tabIdByUniversalIdentifier = (0, _utils.isDefined)(pageLayoutTabIdByUniversalIdentifier) ? buildTabIdByUniversalIdentifier({
                        action,
                        pageLayoutTabIdByUniversalIdentifier
                    }) : undefined;
                    return {
                        ...action,
                        id,
                        tabIdByUniversalIdentifier
                    };
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
            case 'pageLayoutWidget':
            case 'pageLayoutTab':
            case 'commandMenuItem':
            case 'navigationMenuItem':
            case 'frontComponent':
            case 'viewSort':
            case 'rolePermissionFlag':
            case 'permissionFlag':
            case 'objectPermission':
            case 'fieldPermission':
            case 'webhook':
            case 'applicationVariable':
            case 'connectionProvider':
                {
                    if (!(0, _utils.isDefined)(idByUniversalIdentifier)) {
                        return action;
                    }
                    return {
                        ...action,
                        id: idByUniversalIdentifier[action.flatEntity.universalIdentifier]
                    };
                }
            default:
                {
                    (0, _utils.assertUnreachable)(action);
                }
        }
    });
    return {
        ...workspaceMigration,
        actions: enrichedActions
    };
};

//# sourceMappingURL=enrich-create-workspace-migration-action-with-ids.util.js.map