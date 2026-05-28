"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _metadata = require("twenty-shared/metadata");
const _testing = require("twenty-shared/testing");
const _getmetadatarelatedmetadatanamesutil = require("../get-metadata-related-metadata-names.util");
const testCases = Object.keys(_metadata.ALL_METADATA_NAME).map((metadataName)=>({
        title: `should return related metadata names for ${metadataName}`,
        context: {
            input: metadataName
        }
    }));
describe('getMetadataRelatedMetadataNames', ()=>{
    test.each((0, _testing.eachTestingContextFilter)(testCases))('$title', ({ context: { input } })=>{
        const result = (0, _getmetadatarelatedmetadatanamesutil.getMetadataRelatedMetadataNames)(input);
        expect(result).toMatchSnapshot();
    });
});

//# sourceMappingURL=get-metadata-related-metadata-names.util.spec.js.map