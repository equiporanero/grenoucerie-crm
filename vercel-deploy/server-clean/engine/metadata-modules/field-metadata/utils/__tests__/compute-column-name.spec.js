"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _computecolumnnameutil = require("../compute-column-name.util");
describe('computeCompositeColumnName', ()=>{
    it('should compute composite column name for rich text v2 field', ()=>{
        const fieldMetadata = {
            name: 'bodyV2',
            type: _types.FieldMetadataType.RICH_TEXT
        };
        const property = {
            name: 'markdown',
            type: _types.FieldMetadataType.TEXT,
            hidden: false,
            isRequired: false
        };
        expect((0, _computecolumnnameutil.computeCompositeColumnName)(fieldMetadata, property)).toEqual('bodyV2Markdown');
    });
});

//# sourceMappingURL=compute-column-name.spec.js.map