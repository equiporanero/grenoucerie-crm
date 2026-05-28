"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUniversalSettingsToFlatFieldMetadataSettings", {
    enumerable: true,
    get: function() {
        return fromUniversalSettingsToFlatFieldMetadataSettings;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _isfieldmetadatasettingsoftypeutil = require("../../../../../../../metadata-modules/field-metadata/utils/is-field-metadata-settings-of-type.util");
const _findfieldmetadataidincreatefieldcontextutil = require("./find-field-metadata-id-in-create-field-context.util");
const _workspacemigrationactionexecutionexception = require("../../../../exceptions/workspace-migration-action-execution.exception");
const fromUniversalSettingsToFlatFieldMetadataSettings = ({ universalSettings, allFieldIdToBeCreatedInActionByUniversalIdentifierMap, flatFieldMetadataMaps })=>{
    if (!(0, _utils.isDefined)(universalSettings)) {
        return null;
    }
    if ((0, _isfieldmetadatasettingsoftypeutil.isUniversalFieldMetadataSettingsOftype)(universalSettings, _types.FieldMetadataType.RELATION) || (0, _isfieldmetadatasettingsoftypeutil.isUniversalFieldMetadataSettingsOftype)(universalSettings, _types.FieldMetadataType.MORPH_RELATION)) {
        const { junctionTargetFieldUniversalIdentifier, ...rest } = universalSettings;
        const junctionTargetFieldId = (0, _utils.isDefined)(junctionTargetFieldUniversalIdentifier) ? (0, _findfieldmetadataidincreatefieldcontextutil.findFieldMetadataIdInCreateFieldContext)({
            universalIdentifier: junctionTargetFieldUniversalIdentifier,
            allFieldIdToBeCreatedInActionByUniversalIdentifierMap,
            flatFieldMetadataMaps
        }) ?? undefined : undefined;
        if ((0, _utils.isDefined)(junctionTargetFieldUniversalIdentifier) && !(0, _utils.isDefined)(junctionTargetFieldId)) {
            throw new _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException({
                code: _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionExceptionCode.FIELD_METADATA_NOT_FOUND,
                message: `Could not not find junction column id for universal identifier ${junctionTargetFieldUniversalIdentifier}`
            });
        }
        return {
            ...rest,
            junctionTargetFieldId
        };
    }
    return universalSettings;
};

//# sourceMappingURL=from-universal-settings-to-flat-field-metadata-settings.util.js.map