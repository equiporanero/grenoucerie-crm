"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatFieldMetadataTypeValidatorService", {
    enumerable: true,
    get: function() {
        return FlatFieldMetadataTypeValidatorService;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _validateenumflatfieldmetadatautil = require("../validators/utils/validate-enum-flat-field-metadata.util");
const _validatefilesflatfieldmetadatautil = require("../validators/utils/validate-files-flat-field-metadata.util");
const _validatemorphorrelationflatfieldmetadatautil = require("../validators/utils/validate-morph-or-relation-flat-field-metadata.util");
const _validatemorphrelationflatfieldmetadatautil = require("../validators/utils/validate-morph-relation-flat-field-metadata.util");
const _validatepositionflatfieldmetadatautil = require("../validators/utils/validate-position-flat-field-metadata.util");
const _validatetsvectorflatfieldmetadatautil = require("../validators/utils/validate-ts-vector-flat-field-metadata.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const DEFAULT_NO_VALIDATION = ()=>[];
const rejectUserCreation = (fieldType, message, userFriendlyMessage)=>{
    return (args)=>{
        const isCreation = !(0, _classvalidator.isDefined)(args.update);
        const isCustomField = args.flatEntityToValidate.isCustom;
        if (isCreation && isCustomField) {
            return [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                    message,
                    value: fieldType,
                    userFriendlyMessage
                }
            ];
        }
        return [];
    };
};
let FlatFieldMetadataTypeValidatorService = class FlatFieldMetadataTypeValidatorService {
    validateFlatFieldMetadataTypeSpecificities(args) {
        const { flatEntityToValidate } = args;
        const fieldType = flatEntityToValidate.type;
        const fieldMetadataTypeValidator = this.FIELD_METADATA_TYPE_VALIDATOR_HASHMAP[fieldType];
        if (!(0, _classvalidator.isDefined)(fieldMetadataTypeValidator)) {
            return [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.UNCOVERED_FIELD_METADATA_TYPE_VALIDATION,
                    message: `Unsupported field metadata type ${fieldType}`,
                    value: fieldType,
                    userFriendlyMessage: /*i18n*/ {
                        id: "crxihq",
                        message: "Unsupported field metadata type {fieldType}",
                        values: {
                            fieldType: fieldType
                        }
                    }
                }
            ];
        }
        return fieldMetadataTypeValidator(// @ts-expect-error TODO could be improved
        args);
    }
    constructor(){
        this.FIELD_METADATA_TYPE_VALIDATOR_HASHMAP = {
            ACTOR: DEFAULT_NO_VALIDATION,
            ADDRESS: DEFAULT_NO_VALIDATION,
            ARRAY: DEFAULT_NO_VALIDATION,
            BOOLEAN: DEFAULT_NO_VALIDATION,
            CURRENCY: DEFAULT_NO_VALIDATION,
            DATE: DEFAULT_NO_VALIDATION,
            DATE_TIME: DEFAULT_NO_VALIDATION,
            EMAILS: DEFAULT_NO_VALIDATION,
            FILES: _validatefilesflatfieldmetadatautil.validateFilesFlatFieldMetadata,
            FULL_NAME: DEFAULT_NO_VALIDATION,
            LINKS: DEFAULT_NO_VALIDATION,
            NUMBER: DEFAULT_NO_VALIDATION,
            NUMERIC: rejectUserCreation(_types.FieldMetadataType.NUMERIC, 'Field type NUMERIC is not supported for field creation. Use NUMBER instead.', /*i18n*/ {
                id: "stY5BO",
                message: "Field type NUMERIC is not supported. Use Number instead."
            }),
            PHONES: DEFAULT_NO_VALIDATION,
            POSITION: _validatepositionflatfieldmetadatautil.validatePositionFlatFieldMetadata,
            RAW_JSON: DEFAULT_NO_VALIDATION,
            RICH_TEXT: DEFAULT_NO_VALIDATION,
            TEXT: DEFAULT_NO_VALIDATION,
            TS_VECTOR: _validatetsvectorflatfieldmetadatautil.validateTsVectorFlatFieldMetadata,
            UUID: DEFAULT_NO_VALIDATION,
            MORPH_RELATION: _validatemorphrelationflatfieldmetadatautil.validateMorphRelationFlatFieldMetadata,
            MULTI_SELECT: _validateenumflatfieldmetadatautil.validateEnumSelectFlatFieldMetadata,
            RATING: _validateenumflatfieldmetadatautil.validateEnumSelectFlatFieldMetadata,
            RELATION: _validatemorphorrelationflatfieldmetadatautil.validateMorphOrRelationFlatFieldMetadata,
            SELECT: _validateenumflatfieldmetadatautil.validateEnumSelectFlatFieldMetadata
        };
    }
};
FlatFieldMetadataTypeValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], FlatFieldMetadataTypeValidatorService);

//# sourceMappingURL=flat-field-metadata-type-validator.service.js.map