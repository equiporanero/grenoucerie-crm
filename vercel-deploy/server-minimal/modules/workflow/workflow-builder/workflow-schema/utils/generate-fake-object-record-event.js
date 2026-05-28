"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFakeObjectRecordEvent", {
    enumerable: true,
    get: function() {
        return generateFakeObjectRecordEvent;
    }
});
const _databaseeventaction = require("../../../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
const _generateobjectrecordfields = require("./generate-object-record-fields");
const generateFakeObjectRecordEventWithPrefix = ({ objectMetadataInfo, prefix })=>{
    const { flatObjectMetadata } = objectMetadataInfo;
    const recordFields = (0, _generateobjectrecordfields.generateObjectRecordFields)({
        objectMetadataInfo
    });
    const prefixedRecordFields = Object.entries(recordFields).reduce((acc, [key, value])=>{
        acc[`${prefix}.${key}`] = value;
        return acc;
    }, {});
    return {
        object: {
            isLeaf: true,
            icon: flatObjectMetadata.icon ?? undefined,
            label: flatObjectMetadata.labelSingular,
            value: flatObjectMetadata.description,
            fieldIdName: `${prefix}.id`,
            objectMetadataId: flatObjectMetadata.id
        },
        fields: prefixedRecordFields,
        _outputSchemaType: 'RECORD'
    };
};
const generateFakeObjectRecordEvent = (objectMetadataInfo, action)=>{
    switch(action){
        case _databaseeventaction.DatabaseEventAction.CREATED:
        case _databaseeventaction.DatabaseEventAction.UPDATED:
        case _databaseeventaction.DatabaseEventAction.UPSERTED:
            return generateFakeObjectRecordEventWithPrefix({
                objectMetadataInfo,
                prefix: 'properties.after'
            });
        case _databaseeventaction.DatabaseEventAction.DELETED:
        case _databaseeventaction.DatabaseEventAction.DESTROYED:
            return generateFakeObjectRecordEventWithPrefix({
                objectMetadataInfo,
                prefix: 'properties.before'
            });
        default:
            throw new Error(`Unknown action '${action}'`);
    }
};

//# sourceMappingURL=generate-fake-object-record-event.js.map