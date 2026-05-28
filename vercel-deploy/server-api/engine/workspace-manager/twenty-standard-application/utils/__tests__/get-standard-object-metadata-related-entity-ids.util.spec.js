"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getstandardobjectmetadatarelatedentityidsutil = require("../get-standard-object-metadata-related-entity-ids.util");
let uuidCounter = 0;
jest.mock('uuid', ()=>({
        v4: jest.fn(()=>`00000000-0000-0000-0000-${String(++uuidCounter).padStart(12, '0')}`)
    }));
describe('getStandardObjectMetadataRelatedEntityIds', ()=>{
    beforeEach(()=>{
        uuidCounter = 0;
    });
    afterAll(()=>{
        jest.restoreAllMocks();
    });
    it('should return standard object metadata related entity ids', ()=>{
        const result = (0, _getstandardobjectmetadatarelatedentityidsutil.getStandardObjectMetadataRelatedEntityIds)();
        expect(result).toMatchSnapshot();
    });
});

//# sourceMappingURL=get-standard-object-metadata-related-entity-ids.util.spec.js.map