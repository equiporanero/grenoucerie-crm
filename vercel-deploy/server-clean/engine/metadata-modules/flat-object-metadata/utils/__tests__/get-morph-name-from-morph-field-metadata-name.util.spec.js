"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getmorphnamefrommorphfieldmetadatanameutil = require("../get-morph-name-from-morph-field-metadata-name.util");
describe('getMorphNameFromMorphFieldMetadataName', ()=>{
    const createMorphRelationFlatFieldMetadataMock = (name, relationType)=>({
            name,
            type: _types.FieldMetadataType.MORPH_RELATION,
            label: name,
            universalSettings: {
                relationType
            }
        });
    it('should extract base morph field name for MANY_TO_ONE (removes singular suffix)', ()=>{
        const morphRelationFlatFieldMetadata = createMorphRelationFlatFieldMetadataMock('contactDeal', _types.RelationType.MANY_TO_ONE);
        const result = (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
            morphRelationFlatFieldMetadata,
            nameSingular: 'Deal',
            namePlural: 'Deals'
        });
        expect(result).toBe('contact');
    });
    it('should also work extract base morph field name for MANY_TO_ONE if casing is not correct', ()=>{
        const morphRelationFlatFieldMetadata = createMorphRelationFlatFieldMetadataMock('contactDeal', _types.RelationType.MANY_TO_ONE);
        const result = (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
            morphRelationFlatFieldMetadata,
            nameSingular: 'deal',
            namePlural: 'deals'
        });
        expect(result).toBe('contact');
    });
    it('should extract base morph field name for ONE_TO_MANY (removes plural suffix)', ()=>{
        const morphRelationFlatFieldMetadata = createMorphRelationFlatFieldMetadataMock('contactDeals', _types.RelationType.ONE_TO_MANY);
        const result = (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
            morphRelationFlatFieldMetadata,
            nameSingular: 'Deal',
            namePlural: 'Deals'
        });
        expect(result).toBe('contact');
    });
    it('should return the original name when suffix does not match', ()=>{
        const morphRelationFlatFieldMetadata = createMorphRelationFlatFieldMetadataMock('randomName', _types.RelationType.MANY_TO_ONE);
        const result = (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
            morphRelationFlatFieldMetadata,
            nameSingular: 'account',
            namePlural: 'accounts'
        });
        expect(result).toBe('randomName');
    });
});

//# sourceMappingURL=get-morph-name-from-morph-field-metadata-name.util.spec.js.map