"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DataArgProcessorService", {
    enumerable: true,
    get: function() {
        return DataArgProcessorService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _transformactorfieldutil = require("./transformer-utils/transform-actor-field.util");
const _transformaddressfieldutil = require("./transformer-utils/transform-address-field.util");
const _transformarrayfieldutil = require("./transformer-utils/transform-array-field.util");
const _transformcurrencyfieldutil = require("./transformer-utils/transform-currency-field.util");
const _transformfullnamefieldutil = require("./transformer-utils/transform-full-name-field.util");
const _transformnumericfieldutil = require("./transformer-utils/transform-numeric-field.util");
const _transformrawjsonfieldutil = require("./transformer-utils/transform-raw-json-field.util");
const _transformtextfieldutil = require("./transformer-utils/transform-text-field.util");
const _isrelationnestedoperationutil = require("./utils/is-relation-nested-operation.util");
const _validateactorfieldorthrowutil = require("./validator-utils/validate-actor-field-or-throw.util");
const _validateaddressfieldorthrowutil = require("./validator-utils/validate-address-field-or-throw.util");
const _validatearrayfieldorthrowutil = require("./validator-utils/validate-array-field-or-throw.util");
const _validatebooleanfieldorthrowutil = require("./validator-utils/validate-boolean-field-or-throw.util");
const _validatecurrencyfieldorthrowutil = require("./validator-utils/validate-currency-field-or-throw.util");
const _validatedatefieldorthrowutil = require("./validator-utils/validate-date-field-or-throw.util");
const _validatedatetimefieldorthrowutil = require("./validator-utils/validate-date-time-field-or-throw.util");
const _validateemailsfieldorthrowutil = require("./validator-utils/validate-emails-field-or-throw.util");
const _validatefilesfieldorthrowutil = require("./validator-utils/validate-files-field-or-throw.util");
const _validatefullnamefieldorthrowutil = require("./validator-utils/validate-full-name-field-or-throw.util");
const _validatelinksfieldorthrowutil = require("./validator-utils/validate-links-field-or-throw.util");
const _validatemultiselectfieldorthrowutil = require("./validator-utils/validate-multi-select-field-or-throw.util");
const _validatenumberfieldorthrowutil = require("./validator-utils/validate-number-field-or-throw.util");
const _validatenumericfieldorthrowutil = require("./validator-utils/validate-numeric-field-or-throw.util");
const _validateoverriddenpositionfieldorthrowutil = require("./validator-utils/validate-overridden-position-field-or-throw.util");
const _validatephonesfieldorthrowutil = require("./validator-utils/validate-phones-field-or-throw.util");
const _validateratingandselectfieldorthrowutil = require("./validator-utils/validate-rating-and-select-field-or-throw.util");
const _validaterawjsonfieldorthrowutil = require("./validator-utils/validate-raw-json-field-or-throw.util");
const _validaterichtextfieldorthrowutil = require("./validator-utils/validate-rich-text-field-or-throw.util");
const _validatetextfieldorthrowutil = require("./validator-utils/validate-text-field-or-throw.util");
const _validateuuidfieldorthrowutil = require("./validator-utils/validate-uuid-field-or-throw.util");
const _commonqueryrunnerexception = require("../../common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../common-query-runners/errors/standard-error-message.constant");
const _recordpositionservice = require("../../../../core-modules/record-position/services/record-position.service");
const _transformemailsvalueutil = require("../../../../core-modules/record-transformer/utils/transform-emails-value.util");
const _transformlinksvalueutil = require("../../../../core-modules/record-transformer/utils/transform-links-value.util");
const _transformphonesvalueutil = require("../../../../core-modules/record-transformer/utils/transform-phones-value.util");
const _transformrichtextutil = require("../../../../core-modules/record-transformer/utils/transform-rich-text.util");
const _workspaceexception = require("../../../../core-modules/workspace/workspace.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DataArgProcessorService = class DataArgProcessorService {
    async process({ partialRecordInputs, authContext, flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps, shouldBackfillPositionIfUndefined = true }) {
        if (!(0, _utils.isDefined)(partialRecordInputs)) {
            return [];
        }
        const workspace = authContext.workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        const { fieldIdByName, fieldIdByJoinColumnName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        const overriddenPositionRecords = await this.recordPositionService.overridePositionOnRecords({
            partialRecordInputs: partialRecordInputs,
            workspaceId: workspace.id,
            objectMetadata: {
                isCustom: flatObjectMetadata.isCustom,
                nameSingular: flatObjectMetadata.nameSingular,
                fieldIdByName
            },
            shouldBackfillPositionIfUndefined
        });
        const processedRecords = [];
        for (const record of overriddenPositionRecords){
            const processedRecord = {};
            for (const [key, value] of Object.entries(record)){
                const fieldMetadataId = fieldIdByName[key] || fieldIdByJoinColumnName[key];
                if (!(0, _utils.isDefined)(fieldMetadataId)) {
                    throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Object ${flatObjectMetadata.nameSingular} doesn't have any "${key}" field.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                        userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                    });
                }
                const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: fieldMetadataId,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                if (!fieldMetadata) {
                    throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Field metadata not found for field ${key}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                        userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                    });
                }
                if (!(0, _utils.isDefined)(fieldMetadata.defaultValue) && !fieldMetadata.isNullable && (0, _guards.isNull)(value)) {
                    throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Field ${key} is not nullable and has no default value.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "FVCXUT",
                            message: "A required field is missing."
                        }
                    });
                }
                if ((0, _guards.isUndefined)(value)) {
                    continue;
                }
                processedRecord[key] = await this.processField(fieldMetadata, key, value, flatFieldMetadataMaps, flatObjectMetadataMaps);
            }
            processedRecords.push(processedRecord);
        }
        return processedRecords;
    }
    async processField(fieldMetadata, key, value, flatFieldMetadataMaps, flatObjectMetadataMaps) {
        switch(fieldMetadata.type){
            case _types.FieldMetadataType.POSITION:
                return (0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(value, key);
            case _types.FieldMetadataType.NUMERIC:
                {
                    const validatedValue = (0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)(value, key);
                    return (0, _transformnumericfieldutil.transformNumericField)(validatedValue);
                }
            case _types.FieldMetadataType.NUMBER:
                {
                    return (0, _validatenumberfieldorthrowutil.validateNumberFieldOrThrow)(value, key);
                }
            case _types.FieldMetadataType.TEXT:
                {
                    const validatedValue = (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(value, key);
                    return (0, _transformtextfieldutil.transformTextField)(validatedValue);
                }
            case _types.FieldMetadataType.DATE_TIME:
                return (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(value, key);
            case _types.FieldMetadataType.DATE:
                return (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(value, key);
            case _types.FieldMetadataType.BOOLEAN:
                return (0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(value, key);
            case _types.FieldMetadataType.RATING:
            case _types.FieldMetadataType.SELECT:
                {
                    (0, _validateratingandselectfieldorthrowutil.validateRatingAndSelectFieldOrThrow)(value, key, fieldMetadata.options?.map((option)=>option.value));
                    return value;
                }
            case _types.FieldMetadataType.MULTI_SELECT:
                {
                    const validatedValue = (0, _validatemultiselectfieldorthrowutil.validateMultiSelectFieldOrThrow)(value, key, fieldMetadata.options?.map((option)=>option.value));
                    return (0, _transformarrayfieldutil.transformArrayField)(validatedValue);
                }
            case _types.FieldMetadataType.UUID:
                return (0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)(value, key);
            case _types.FieldMetadataType.ARRAY:
                {
                    const validatedValue = (0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)(value, key);
                    return (0, _transformarrayfieldutil.transformArrayField)(validatedValue);
                }
            case _types.FieldMetadataType.RAW_JSON:
                {
                    const validatedValue = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(value, key);
                    return (0, _transformrawjsonfieldutil.transformRawJsonField)(validatedValue);
                }
            case _types.FieldMetadataType.RELATION:
            case _types.FieldMetadataType.MORPH_RELATION:
                {
                    const relationSettings = fieldMetadata.settings;
                    if (relationSettings.relationType === _types.RelationType.ONE_TO_MANY) {
                        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`One-to-many relation ${key} field does not support write operations.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                        });
                    }
                    const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                        name: fieldMetadata.name
                    });
                    if (key === joinColumnName) {
                        return (0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)(value, key);
                    }
                    if ((0, _utils.isDefined)(joinColumnName) && !(0, _isrelationnestedoperationutil.isRelationNestedOperation)(value)) {
                        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Relation "${key}" requires connect or disconnect operation`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                        });
                    }
                    const connectOperation = value;
                    const connectWhere = connectOperation.connect?.where;
                    if ((0, _guards.isObject)(connectWhere)) {
                        const processedWhere = await this.processConnectWhere(connectWhere, fieldMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps);
                        return {
                            ...connectOperation,
                            connect: {
                                ...connectOperation.connect,
                                where: processedWhere
                            }
                        };
                    }
                    return value;
                }
            case _types.FieldMetadataType.PHONES:
                {
                    const validatedValue = (0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(value, key);
                    return (0, _transformphonesvalueutil.transformPhonesValue)({
                        input: validatedValue
                    });
                }
            case _types.FieldMetadataType.EMAILS:
                {
                    const validatedValue = (0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(value, key);
                    return (0, _transformemailsvalueutil.transformEmailsValue)(validatedValue);
                }
            case _types.FieldMetadataType.FILES:
                {
                    const validatedValue = (0, _validatefilesfieldorthrowutil.validateFilesFieldOrThrow)(value, key, fieldMetadata.settings);
                    return (0, _transformrawjsonfieldutil.transformRawJsonField)(validatedValue);
                }
            case _types.FieldMetadataType.FULL_NAME:
                {
                    const validatedValue = (0, _validatefullnamefieldorthrowutil.validateFullNameFieldOrThrow)(value, key);
                    return (0, _transformfullnamefieldutil.transformFullNameField)(validatedValue);
                }
            case _types.FieldMetadataType.ADDRESS:
                {
                    const validatedValue = (0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, key);
                    return (0, _transformaddressfieldutil.transformAddressField)(validatedValue);
                }
            case _types.FieldMetadataType.CURRENCY:
                {
                    const validatedValue = (0, _validatecurrencyfieldorthrowutil.validateCurrencyFieldOrThrow)(value, key);
                    return (0, _transformcurrencyfieldutil.transformCurrencyField)(validatedValue);
                }
            case _types.FieldMetadataType.ACTOR:
                {
                    const validatedValue = (0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)(value, key);
                    return (0, _transformactorfieldutil.transformActorField)(validatedValue);
                }
            case _types.FieldMetadataType.RICH_TEXT:
                {
                    const validatedValue = (0, _validaterichtextfieldorthrowutil.validateRichTextFieldOrThrow)(value, key);
                    return await (0, _transformrichtextutil.transformRichTextValue)(validatedValue);
                }
            case _types.FieldMetadataType.LINKS:
                {
                    const validatedValue = (0, _validatelinksfieldorthrowutil.validateLinksFieldOrThrow)(value, key);
                    return (0, _transformlinksvalueutil.transformLinksValue)(validatedValue);
                }
            case _types.FieldMetadataType.TS_VECTOR:
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`${key} ${fieldMetadata.type}-typed field does not support write operations`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                });
            default:
                (0, _utils.assertUnreachable)(fieldMetadata.type, 'Should never occur, add validator for new field type');
        }
    }
    async processConnectWhere(connectWhere, relationFieldMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps) {
        if (!(0, _utils.isDefined)(relationFieldMetadata.relationTargetObjectMetadataId)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Relation target object metadata id not found for field ${relationFieldMetadata.name}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: relationFieldMetadata.relationTargetObjectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(targetObjectMetadata)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Relation target object metadata not found for field ${relationFieldMetadata.name}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, targetObjectMetadata);
        const processedWhere = {};
        for (const [whereKey, whereValue] of Object.entries(connectWhere)){
            const fieldId = fieldIdByName[whereKey];
            if (!(0, _utils.isDefined)(fieldId)) {
                processedWhere[whereKey] = whereValue;
                continue;
            }
            const whereFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(whereFieldMetadata)) {
                processedWhere[whereKey] = whereValue;
                continue;
            }
            try {
                const processedValue = await this.processField(whereFieldMetadata, whereKey, whereValue, flatFieldMetadataMaps, flatObjectMetadataMaps);
                // Only keep original keys — processField may add null subfields that alter WHERE semantics
                if ((0, _guards.isObject)(whereValue) && (0, _guards.isObject)(processedValue)) {
                    const originalKeys = new Set(Object.keys(whereValue));
                    processedWhere[whereKey] = Object.fromEntries(Object.entries(processedValue).filter(([k])=>originalKeys.has(k)));
                } else {
                    processedWhere[whereKey] = processedValue;
                }
            } catch  {
                processedWhere[whereKey] = whereValue;
            }
        }
        return processedWhere;
    }
    constructor(recordPositionService){
        this.recordPositionService = recordPositionService;
    }
};
DataArgProcessorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _recordpositionservice.RecordPositionService === "undefined" ? Object : _recordpositionservice.RecordPositionService
    ])
], DataArgProcessorService);

//# sourceMappingURL=data-arg-processor.service.js.map