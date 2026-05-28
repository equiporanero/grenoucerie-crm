"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _metadata = require("twenty-shared/metadata");
const _alluniversalflatentitypropertiestocompareandstringifyconstant = require("../all-universal-flat-entity-properties-to-compare-and-stringify.constant");
describe('ALL_UNIVERSAL_FLAT_ENTITY_PROPERTIES_TO_COMPARE_AND_STRINGIFY', ()=>{
    it('should match snapshot', ()=>{
        expect(Object.keys(_alluniversalflatentitypropertiestocompareandstringifyconstant.ALL_UNIVERSAL_FLAT_ENTITY_PROPERTIES_TO_COMPARE_AND_STRINGIFY)).toMatchObject(Object.values(_metadata.ALL_METADATA_NAME));
        expect(_alluniversalflatentitypropertiestocompareandstringifyconstant.ALL_UNIVERSAL_FLAT_ENTITY_PROPERTIES_TO_COMPARE_AND_STRINGIFY).toMatchSnapshot();
    });
});

//# sourceMappingURL=all-universal-flat-entity-properties-to-compare-and-stringify.constant.spec.js.map