"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFakeFormField", {
    enumerable: true,
    get: function() {
        return generateFakeFormField;
    }
});
const _generatefakevalue = require("../../../../../engine/utils/generate-fake-value");
const generateFakeFormField = ({ type, label, value })=>{
    return {
        isLeaf: true,
        type: type,
        label: label,
        value: value ?? (0, _generatefakevalue.generateFakeValue)(type, 'FieldMetadataType')
    };
};

//# sourceMappingURL=generate-fake-form-field.js.map