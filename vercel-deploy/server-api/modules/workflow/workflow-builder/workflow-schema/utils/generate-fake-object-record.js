"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFakeObjectRecord", {
    enumerable: true,
    get: function() {
        return generateFakeObjectRecord;
    }
});
const _generateobjectrecordfields = require("./generate-object-record-fields");
const generateFakeObjectRecord = ({ objectMetadataInfo })=>{
    const { flatObjectMetadata } = objectMetadataInfo;
    return {
        object: {
            isLeaf: true,
            icon: flatObjectMetadata.icon ?? undefined,
            label: flatObjectMetadata.labelSingular,
            value: flatObjectMetadata.description,
            fieldIdName: 'id',
            objectMetadataId: flatObjectMetadata.id
        },
        fields: (0, _generateobjectrecordfields.generateObjectRecordFields)({
            objectMetadataInfo
        }),
        _outputSchemaType: 'RECORD'
    };
};

//# sourceMappingURL=generate-fake-object-record.js.map