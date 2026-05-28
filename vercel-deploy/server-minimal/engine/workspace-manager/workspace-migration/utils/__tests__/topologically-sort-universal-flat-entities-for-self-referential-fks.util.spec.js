"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _uuid = require("uuid");
const _topologicallysortuniversalflatentitiesforselfreferentialfksutil = require("../topologically-sort-universal-flat-entities-for-self-referential-fks.util");
const APPLICATION_UNIVERSAL_IDENTIFIER = (0, _uuid.v4)();
const createEntity = (universalIdentifier, folderUniversalIdentifier = null)=>({
        universalIdentifier,
        applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
        folderUniversalIdentifier
    });
const buildMaps = (entities)=>({
        byUniversalIdentifier: Object.fromEntries(entities.map((entity)=>[
                entity.universalIdentifier,
                entity
            ]))
    });
describe('topologicallySortUniversalFlatEntitiesForSelfReferentialFks', ()=>{
    it('returns empty array for empty maps', ()=>{
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'navigationMenuItem',
            universalFlatEntityMaps: buildMaps([])
        });
        expect(result).toEqual([]);
    });
    it('returns original order for entities without self-referential FKs', ()=>{
        const idA = (0, _uuid.v4)();
        const idB = (0, _uuid.v4)();
        const maps = {
            byUniversalIdentifier: {
                [idA]: {
                    universalIdentifier: idA,
                    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
                },
                [idB]: {
                    universalIdentifier: idB,
                    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
                }
            }
        };
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'objectMetadata',
            universalFlatEntityMaps: maps
        });
        expect(result).toEqual([
            idA,
            idB
        ]);
    });
    it('returns original order when no entity references another in the batch', ()=>{
        const itemA = (0, _uuid.v4)();
        const itemB = (0, _uuid.v4)();
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'navigationMenuItem',
            universalFlatEntityMaps: buildMaps([
                createEntity(itemA),
                createEntity(itemB)
            ])
        });
        expect(result).toEqual([
            itemA,
            itemB
        ]);
    });
    it('sorts parent before child when child is listed first', ()=>{
        const parentId = (0, _uuid.v4)();
        const childId = (0, _uuid.v4)();
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'navigationMenuItem',
            universalFlatEntityMaps: buildMaps([
                createEntity(childId, parentId),
                createEntity(parentId)
            ])
        });
        expect(result).toEqual([
            parentId,
            childId
        ]);
    });
    it('keeps parent before child when already in correct order', ()=>{
        const parentId = (0, _uuid.v4)();
        const childId = (0, _uuid.v4)();
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'navigationMenuItem',
            universalFlatEntityMaps: buildMaps([
                createEntity(parentId),
                createEntity(childId, parentId)
            ])
        });
        expect(result).toEqual([
            parentId,
            childId
        ]);
    });
    it('sorts multi-level hierarchy: grandparent -> parent -> child', ()=>{
        const grandparentId = (0, _uuid.v4)();
        const parentId = (0, _uuid.v4)();
        const childId = (0, _uuid.v4)();
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'navigationMenuItem',
            universalFlatEntityMaps: buildMaps([
                createEntity(childId, parentId),
                createEntity(grandparentId),
                createEntity(parentId, grandparentId)
            ])
        });
        expect(result).toEqual([
            grandparentId,
            parentId,
            childId
        ]);
    });
    it('handles multiple roots with children', ()=>{
        const rootA = (0, _uuid.v4)();
        const rootB = (0, _uuid.v4)();
        const childA = (0, _uuid.v4)();
        const childB = (0, _uuid.v4)();
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'navigationMenuItem',
            universalFlatEntityMaps: buildMaps([
                createEntity(childB, rootB),
                createEntity(childA, rootA),
                createEntity(rootA),
                createEntity(rootB)
            ])
        });
        expect(result.indexOf(rootA)).toBeLessThan(result.indexOf(childA));
        expect(result.indexOf(rootB)).toBeLessThan(result.indexOf(childB));
        expect(result).toHaveLength(4);
    });
    it('ignores references to entities outside the batch', ()=>{
        const externalParentId = (0, _uuid.v4)();
        const itemA = (0, _uuid.v4)();
        const itemB = (0, _uuid.v4)();
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'navigationMenuItem',
            universalFlatEntityMaps: buildMaps([
                createEntity(itemA, externalParentId),
                createEntity(itemB)
            ])
        });
        expect(result).toEqual([
            itemA,
            itemB
        ]);
    });
    it('throws on cycles for entities without expected cycles', ()=>{
        const idA = (0, _uuid.v4)();
        const idB = (0, _uuid.v4)();
        expect(()=>(0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
                metadataName: 'navigationMenuItem',
                universalFlatEntityMaps: buildMaps([
                    createEntity(idA, idB),
                    createEntity(idB, idA)
                ])
            })).toThrow(/Cyclic self-referential foreign key detected/);
    });
    it('appends cyclic entities for fieldMetadata (expected bidirectional cycles)', ()=>{
        const idA = (0, _uuid.v4)();
        const idB = (0, _uuid.v4)();
        const maps = {
            byUniversalIdentifier: {
                [idA]: {
                    universalIdentifier: idA,
                    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
                    relationTargetFieldMetadataUniversalIdentifier: idB
                },
                [idB]: {
                    universalIdentifier: idB,
                    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
                    relationTargetFieldMetadataUniversalIdentifier: idA
                }
            }
        };
        const result = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: 'fieldMetadata',
            universalFlatEntityMaps: maps
        });
        expect(result).toHaveLength(2);
        expect(result).toContain(idA);
        expect(result).toContain(idB);
    });
});

//# sourceMappingURL=topologically-sort-universal-flat-entities-for-self-referential-fks.util.spec.js.map