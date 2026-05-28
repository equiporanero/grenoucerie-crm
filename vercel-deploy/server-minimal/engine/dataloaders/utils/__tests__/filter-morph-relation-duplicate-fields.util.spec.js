"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _filtermorphrelationduplicatefieldsutil = require("../filter-morph-relation-duplicate-fields.util");
const makeMorphField = (overrides)=>({
        type: _types.FieldMetadataType.MORPH_RELATION,
        isActive: true,
        isSystem: false,
        ...overrides
    });
const makeTextField = (id)=>({
        id,
        type: _types.FieldMetadataType.TEXT
    });
describe('filterMorphRelationDuplicateFields', ()=>{
    it('should return all fields when there are no morph fields', ()=>{
        const fields = [
            makeTextField('t1'),
            makeTextField('t2')
        ];
        expect((0, _filtermorphrelationduplicatefieldsutil.filterMorphRelationDuplicateFields)(fields)).toEqual(fields);
    });
    it('should return all fields when morph fields have distinct morphIds', ()=>{
        const morph1 = makeMorphField({
            id: 'a',
            morphId: 'morph-1'
        });
        const morph2 = makeMorphField({
            id: 'b',
            morphId: 'morph-2'
        });
        const text = makeTextField('t1');
        const result = (0, _filtermorphrelationduplicatefieldsutil.filterMorphRelationDuplicateFields)([
            morph1,
            text,
            morph2
        ]);
        expect(result).toHaveLength(3);
        expect(result).toContain(text);
        expect(result).toContain(morph1);
        expect(result).toContain(morph2);
    });
    it('should deduplicate morph fields sharing the same morphId', ()=>{
        const standard = makeMorphField({
            id: 'b',
            morphId: 'morph-1',
            isSystem: false
        });
        const system = makeMorphField({
            id: 'a',
            morphId: 'morph-1',
            isSystem: true
        });
        const text = makeTextField('t1');
        const result = (0, _filtermorphrelationduplicatefieldsutil.filterMorphRelationDuplicateFields)([
            system,
            text,
            standard
        ]);
        expect(result).toHaveLength(2);
        expect(result).toContain(text);
        expect(result).toContain(standard);
        expect(result).not.toContain(system);
    });
    it('should handle multiple morph groups independently', ()=>{
        const group1Best = makeMorphField({
            id: 'a',
            morphId: 'morph-1',
            isSystem: false
        });
        const group1Dup = makeMorphField({
            id: 'b',
            morphId: 'morph-1',
            isSystem: true
        });
        const group2Best = makeMorphField({
            id: 'c',
            morphId: 'morph-2',
            isSystem: false
        });
        const group2Dup = makeMorphField({
            id: 'd',
            morphId: 'morph-2',
            isSystem: true
        });
        const result = (0, _filtermorphrelationduplicatefieldsutil.filterMorphRelationDuplicateFields)([
            group1Dup,
            group2Dup,
            group1Best,
            group2Best
        ]);
        expect(result).toHaveLength(2);
        expect(result).toContain(group1Best);
        expect(result).toContain(group2Best);
    });
    it('should return empty array for empty input', ()=>{
        expect((0, _filtermorphrelationduplicatefieldsutil.filterMorphRelationDuplicateFields)([])).toEqual([]);
    });
});

//# sourceMappingURL=filter-morph-relation-duplicate-fields.util.spec.js.map