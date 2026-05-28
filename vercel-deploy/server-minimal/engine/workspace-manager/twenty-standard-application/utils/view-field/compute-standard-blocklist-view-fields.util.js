"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardBlocklistViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardBlocklistViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardBlocklistViewFields = (args)=>{
    return {
        allBlocklistsHandle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'blocklist',
            context: {
                viewName: 'allBlocklists',
                viewFieldName: 'handle',
                fieldName: 'handle',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allBlocklistsWorkspaceMember: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'blocklist',
            context: {
                viewName: 'allBlocklists',
                viewFieldName: 'workspaceMember',
                fieldName: 'workspaceMember',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allBlocklistsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'blocklist',
            context: {
                viewName: 'allBlocklists',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        blocklistRecordPageFieldsWorkspaceMember: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'blocklist',
            context: {
                viewName: 'blocklistRecordPageFields',
                viewFieldName: 'workspaceMember',
                fieldName: 'workspaceMember',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        blocklistRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'blocklist',
            context: {
                viewName: 'blocklistRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        blocklistRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'blocklist',
            context: {
                viewName: 'blocklistRecordPageFields',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-blocklist-view-fields.util.js.map