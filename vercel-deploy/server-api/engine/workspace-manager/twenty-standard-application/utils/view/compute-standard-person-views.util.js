"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardPersonViews", {
    enumerable: true,
    get: function() {
        return computeStandardPersonViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardPersonViews = (args)=>{
    return {
        allPeople: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        }),
        personRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                name: 'Person Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-person-views.util.js.map