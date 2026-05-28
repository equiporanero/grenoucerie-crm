"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFakeRecordField", {
    enumerable: true,
    get: function() {
        return generateFakeRecordField;
    }
});
const _types = require("twenty-shared/types");
const _generatefakevalue = require("../../../../../engine/utils/generate-fake-value");
const _cameltotitlecase = require("../../../../../utils/camel-to-title-case");
const generateFakeRecordField = ({ type, label, icon, value, fieldMetadataId })=>{
    const compositeType = _types.compositeTypeDefinitions.get(type);
    if (compositeType) {
        return {
            isLeaf: false,
            type: type,
            icon: icon,
            label: label,
            fieldMetadataId,
            value: compositeType.properties.reduce((acc, property)=>{
                // @ts-expect-error legacy noImplicitAny
                acc[property.name] = {
                    isLeaf: true,
                    type: property.type,
                    label: (0, _cameltotitlecase.camelToTitleCase)(property.name),
                    value: value || (0, _generatefakevalue.generateFakeValue)(property.type, 'FieldMetadataType'),
                    fieldMetadataId,
                    isCompositeSubField: true
                };
                return acc;
            }, {})
        };
    }
    return {
        isLeaf: true,
        type: type,
        icon: icon,
        label: label,
        value: value || (0, _generatefakevalue.generateFakeValue)(type, 'FieldMetadataType'),
        fieldMetadataId
    };
};

//# sourceMappingURL=generate-fake-record-field.js.map