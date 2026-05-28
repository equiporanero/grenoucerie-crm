"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_FLAT_PAGE_LAYOUT_BUILDERS_BY_LAYOUT_NAME", {
    enumerable: true,
    get: function() {
        return STANDARD_FLAT_PAGE_LAYOUT_BUILDERS_BY_LAYOUT_NAME;
    }
});
const _standardpagelayoutconstant = require("../../constants/standard-page-layout.constant");
const _createstandardpagelayoutflatmetadatautil = require("./create-standard-page-layout-flat-metadata.util");
const createBuilderFromConfig = (layoutName, config)=>{
    return (args)=>(0, _createstandardpagelayoutflatmetadatautil.createStandardPageLayoutFlatMetadata)({
            ...args,
            context: {
                layoutName,
                name: config.name,
                type: config.type,
                objectUniversalIdentifier: config.objectUniversalIdentifier,
                defaultTabUniversalIdentifier: config.defaultTabUniversalIdentifier
            }
        });
};
const createBuilders = ()=>{
    return Object.fromEntries(Object.entries(_standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS).map(([layoutName, config])=>[
            layoutName,
            createBuilderFromConfig(layoutName, config)
        ]));
};
const STANDARD_FLAT_PAGE_LAYOUT_BUILDERS_BY_LAYOUT_NAME = createBuilders();

//# sourceMappingURL=standard-flat-page-layout-builders.constant.js.map