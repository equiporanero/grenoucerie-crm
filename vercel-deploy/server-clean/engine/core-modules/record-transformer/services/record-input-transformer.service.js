"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RecordInputTransformerService", {
    enumerable: true,
    get: function() {
        return RecordInputTransformerService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _transformemailsvalueutil = require("../utils/transform-emails-value.util");
const _transformlinksvalueutil = require("../utils/transform-links-value.util");
const _transformphonesvalueutil = require("../utils/transform-phones-value.util");
const _transformrichtextutil = require("../utils/transform-rich-text.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RecordInputTransformerService = class RecordInputTransformerService {
    async process({ recordInput, flatObjectMetadata, flatFieldMetadataMaps }) {
        let transformedEntries = {};
        const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        for (const [key, value] of Object.entries(recordInput)){
            const fieldMetadataId = fieldIdByName[key];
            const fieldMetadata = fieldMetadataId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            }) : undefined;
            if (!fieldMetadata) {
                transformedEntries = {
                    ...transformedEntries,
                    [key]: value
                };
                continue;
            }
            const transformedValue = this.parseSubFields(fieldMetadata.type, await this.transformFieldValue(fieldMetadata.type, this.stringifySubFields(fieldMetadata.type, value)));
            transformedEntries = {
                ...transformedEntries,
                [key]: transformedValue
            };
        }
        return transformedEntries;
    }
    async transformFieldValue(fieldType, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    value) {
        if (!(0, _utils.isDefined)(value)) {
            return value;
        }
        switch(fieldType){
            case _types.FieldMetadataType.UUID:
                return value || null;
            case _types.FieldMetadataType.NUMBER:
                return value === null ? null : Number(value);
            case _types.FieldMetadataType.RICH_TEXT:
                return await (0, _transformrichtextutil.transformRichTextValue)(value);
            case _types.FieldMetadataType.LINKS:
                return (0, _transformlinksvalueutil.transformLinksValue)(value);
            case _types.FieldMetadataType.EMAILS:
                return (0, _transformemailsvalueutil.transformEmailsValue)(value);
            case _types.FieldMetadataType.PHONES:
                return (0, _transformphonesvalueutil.transformPhonesValue)({
                    input: value
                });
            default:
                return value;
        }
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    stringifySubFields(fieldMetadataType, value) {
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadataType);
        if (!compositeType) {
            return value;
        }
        return Object.entries(value).reduce((acc, [subFieldName, subFieldValue])=>{
            const subFieldType = compositeType.properties.find((property)=>property.name === subFieldName)?.type;
            if (subFieldType === _types.FieldMetadataType.RAW_JSON) {
                return {
                    ...acc,
                    [subFieldName]: subFieldValue ? JSON.stringify(subFieldValue) : subFieldValue
                };
            }
            return {
                ...acc,
                [subFieldName]: subFieldValue
            };
        }, {});
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    parseSubFields(fieldMetadataType, value) {
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadataType);
        if (!compositeType) {
            return value;
        }
        return Object.entries(value).reduce(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
        (acc, [subFieldName, subFieldValue])=>{
            const subFieldType = compositeType.properties.find((property)=>property.name === subFieldName)?.type;
            if (subFieldType === _types.FieldMetadataType.RAW_JSON) {
                return {
                    ...acc,
                    [subFieldName]: subFieldValue ? JSON.parse(subFieldValue) : subFieldValue
                };
            }
            return {
                ...acc,
                [subFieldName]: subFieldValue
            };
        }, {});
    }
};
RecordInputTransformerService = _ts_decorate([
    (0, _common.Injectable)()
], RecordInputTransformerService);

//# sourceMappingURL=record-input-transformer.service.js.map