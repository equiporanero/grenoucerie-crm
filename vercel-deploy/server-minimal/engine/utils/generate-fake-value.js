"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFakeValue", {
    enumerable: true,
    get: function() {
        return generateFakeValue;
    }
});
const _types = require("twenty-shared/types");
const generatePrimitiveValue = (valueType)=>{
    if (valueType === 'string') {
        return 'My text';
    } else if (valueType === 'number') {
        return 20;
    } else if (valueType === 'boolean') {
        return true;
    } else if (valueType === 'Date') {
        return new Date();
    } else if (valueType.endsWith('[]')) {
        const elementType = valueType.replace('[]', '');
        return Array.from({
            length: 3
        }, ()=>generateFakeValue(elementType));
    } else if (valueType.startsWith('{') && valueType.endsWith('}')) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const objData = {};
        const properties = valueType.slice(1, -1).split(';').map((p)=>p.trim()).filter((p)=>p);
        properties.forEach((property)=>{
            const [key, valueType] = property.split(':').map((s)=>s.trim());
            objData[key] = generateFakeValue(valueType);
        });
        return objData;
    } else {
        return null;
    }
};
const generateFieldMetadataTypeValue = (valueType)=>{
    // composite types do not need to be generated
    switch(valueType){
        case _types.FieldMetadataType.TEXT:
            return 'My text';
        case _types.FieldMetadataType.NUMBER:
            return 20;
        case _types.FieldMetadataType.BOOLEAN:
            return true;
        case _types.FieldMetadataType.DATE:
            return '01/23/2025';
        case _types.FieldMetadataType.DATE_TIME:
            return '01/23/2025 15:16';
        case _types.FieldMetadataType.ADDRESS:
            return '123 Main St, Anytown, CA 12345';
        case _types.FieldMetadataType.FULL_NAME:
            return 'Tim Cook';
        case _types.FieldMetadataType.RAW_JSON:
            return null;
        case _types.FieldMetadataType.UUID:
            return '123e4567-e89b-12d3-a456-426614174000';
        default:
            return null;
    }
};
const generateFakeValue = (valueType, classification = 'Primitive')=>{
    switch(classification){
        case 'Primitive':
            return generatePrimitiveValue(valueType);
        case 'FieldMetadataType':
            return generateFieldMetadataTypeValue(valueType);
        default:
            return null;
    }
};

//# sourceMappingURL=generate-fake-value.js.map