"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _uuid = require("uuid");
const _getstandardpagelayoutmetadatarelatedentityidsutil = require("../get-standard-page-layout-metadata-related-entity-ids.util");
jest.mock('uuid', ()=>({
        v4: jest.fn()
    }));
describe('getStandardPageLayoutMetadataRelatedEntityIds', ()=>{
    let uuidCounter = 0;
    beforeEach(()=>{
        uuidCounter = 0;
        _uuid.v4.mockImplementation(()=>`00000000-0000-0000-0000-${String(++uuidCounter).padStart(12, '0')}`);
    });
    afterAll(()=>{
        jest.restoreAllMocks();
    });
    it('should return standard page layout metadata related entity ids', ()=>{
        const result = (0, _getstandardpagelayoutmetadatarelatedentityidsutil.getStandardPageLayoutMetadataRelatedEntityIds)();
        expect(result).toMatchSnapshot();
    });
});

//# sourceMappingURL=get-standard-page-layout-metadata-related-entity-ids.util.spec.js.map