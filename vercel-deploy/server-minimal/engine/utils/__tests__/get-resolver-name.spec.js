"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getresolvernameutil = require("../get-resolver-name.util");
describe('getResolverName', ()=>{
    const metadata = {
        nameSingular: 'entity',
        namePlural: 'entities'
    };
    it.each([
        [
            'findMany',
            'entities'
        ],
        [
            'findOne',
            'entity'
        ],
        [
            'createMany',
            'createEntities'
        ],
        [
            'createOne',
            'createEntity'
        ],
        [
            'updateOne',
            'updateEntity'
        ],
        [
            'deleteOne',
            'deleteEntity'
        ],
        [
            'restoreMany',
            'restoreEntities'
        ],
        [
            'destroyMany',
            'destroyEntities'
        ]
    ])('should return correct name for %s resolver', (type, expectedResult)=>{
        expect((0, _getresolvernameutil.getResolverName)(metadata, type)).toBe(expectedResult);
    });
    it('should throw an error for an unknown resolver type', ()=>{
        const unknownType = 'unknownType';
        expect(()=>(0, _getresolvernameutil.getResolverName)(metadata, unknownType)).toThrow(`Unknown resolver type: ${unknownType}`);
    });
});

//# sourceMappingURL=get-resolver-name.spec.js.map