"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _pickmorphgroupsurvivorutil = require("../pick-morph-group-survivor.util");
const makeMorphField = (overrides)=>({
        type: _types.FieldMetadataType.MORPH_RELATION,
        isActive: true,
        isSystem: false,
        morphId: 'morph-1',
        ...overrides
    });
describe('pickMorphGroupSurvivor', ()=>{
    it('should return the only field when group has one element', ()=>{
        const field = makeMorphField({
            id: 'a'
        });
        expect((0, _pickmorphgroupsurvivorutil.pickMorphGroupSurvivor)([
            field
        ])).toBe(field);
    });
    it('should prefer active non-system over active system', ()=>{
        const standard = makeMorphField({
            id: 'b',
            isActive: true,
            isSystem: false
        });
        const system = makeMorphField({
            id: 'a',
            isActive: true,
            isSystem: true
        });
        expect((0, _pickmorphgroupsurvivorutil.pickMorphGroupSurvivor)([
            system,
            standard
        ])).toBe(standard);
    });
    it('should prefer active over inactive', ()=>{
        const active = makeMorphField({
            id: 'b',
            isActive: true,
            isSystem: true
        });
        const inactive = makeMorphField({
            id: 'a',
            isActive: false,
            isSystem: false
        });
        expect((0, _pickmorphgroupsurvivorutil.pickMorphGroupSurvivor)([
            inactive,
            active
        ])).toBe(active);
    });
    it('should break ties by smallest id', ()=>{
        const fieldA = makeMorphField({
            id: 'aaa',
            isActive: true,
            isSystem: false
        });
        const fieldB = makeMorphField({
            id: 'bbb',
            isActive: true,
            isSystem: false
        });
        expect((0, _pickmorphgroupsurvivorutil.pickMorphGroupSurvivor)([
            fieldB,
            fieldA
        ])).toBe(fieldA);
    });
    it('should prefer active+non-system (score 3) over inactive+non-system (score 1)', ()=>{
        const best = makeMorphField({
            id: 'z',
            isActive: true,
            isSystem: false
        });
        const worse = makeMorphField({
            id: 'a',
            isActive: false,
            isSystem: false
        });
        expect((0, _pickmorphgroupsurvivorutil.pickMorphGroupSurvivor)([
            worse,
            best
        ])).toBe(best);
    });
});

//# sourceMappingURL=pick-morph-group-survivor.util.spec.js.map