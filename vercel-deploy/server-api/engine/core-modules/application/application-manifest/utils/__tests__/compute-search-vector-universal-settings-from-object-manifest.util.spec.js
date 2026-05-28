"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _computesearchvectoruniversalsettingsfromobjectmanifestutil = require("../compute-search-vector-universal-settings-from-object-manifest.util");
const buildObjectManifest = (overrides)=>({
        universalIdentifier: 'obj-uuid-1',
        nameSingular: 'testObject',
        namePlural: 'testObjects',
        labelSingular: 'Test Object',
        labelPlural: 'Test Objects',
        ...overrides
    });
describe('computeSearchVectorUniversalSettingsFromObjectManifest', ()=>{
    it('should return asExpression and generatedType for a TEXT label identifier field', ()=>{
        const result = (0, _computesearchvectoruniversalsettingsfromobjectmanifestutil.computeSearchVectorUniversalSettingsFromObjectManifest)({
            objectManifest: buildObjectManifest({
                labelIdentifierFieldMetadataUniversalIdentifier: 'field-uuid-name',
                fields: [
                    {
                        universalIdentifier: 'field-uuid-name',
                        name: 'name',
                        label: 'Name',
                        type: _types.FieldMetadataType.TEXT
                    }
                ]
            })
        });
        expect(result?.generatedType).toBe('STORED');
        expect(result?.asExpression).toContain("to_tsvector('simple'");
        expect(result?.asExpression).toContain('"name"');
    });
    it('should return asExpression for a FULL_NAME label identifier field', ()=>{
        const result = (0, _computesearchvectoruniversalsettingsfromobjectmanifestutil.computeSearchVectorUniversalSettingsFromObjectManifest)({
            objectManifest: buildObjectManifest({
                labelIdentifierFieldMetadataUniversalIdentifier: 'field-uuid-name',
                fields: [
                    {
                        universalIdentifier: 'field-uuid-name',
                        name: 'name',
                        label: 'Name',
                        type: _types.FieldMetadataType.FULL_NAME
                    }
                ]
            })
        });
        expect(result?.generatedType).toBe('STORED');
        expect(result?.asExpression).toContain("to_tsvector('simple'");
        expect(result?.asExpression).toContain('"nameFirstName"');
        expect(result?.asExpression).toContain('"nameLastName"');
    });
    it('should return asExpression for an EMAILS label identifier field', ()=>{
        const result = (0, _computesearchvectoruniversalsettingsfromobjectmanifestutil.computeSearchVectorUniversalSettingsFromObjectManifest)({
            objectManifest: buildObjectManifest({
                labelIdentifierFieldMetadataUniversalIdentifier: 'field-uuid-email',
                fields: [
                    {
                        universalIdentifier: 'field-uuid-email',
                        name: 'email',
                        label: 'Email',
                        type: _types.FieldMetadataType.EMAILS
                    }
                ]
            })
        });
        expect(result?.generatedType).toBe('STORED');
        expect(result?.asExpression).toContain("to_tsvector('simple'");
        expect(result?.asExpression).toContain('"emailPrimaryEmail"');
    });
    it('should return asExpression for a UUID label identifier field', ()=>{
        const result = (0, _computesearchvectoruniversalsettingsfromobjectmanifestutil.computeSearchVectorUniversalSettingsFromObjectManifest)({
            objectManifest: buildObjectManifest({
                labelIdentifierFieldMetadataUniversalIdentifier: 'field-uuid-id',
                fields: [
                    {
                        universalIdentifier: 'field-uuid-id',
                        name: 'externalId',
                        label: 'External ID',
                        type: _types.FieldMetadataType.UUID
                    }
                ]
            })
        });
        expect(result?.generatedType).toBe('STORED');
        expect(result?.asExpression).toContain("to_tsvector('simple'");
        expect(result?.asExpression).toContain('"externalId"');
    });
    it('should return null when label identifier field is not found in fields', ()=>{
        const result = (0, _computesearchvectoruniversalsettingsfromobjectmanifestutil.computeSearchVectorUniversalSettingsFromObjectManifest)({
            objectManifest: buildObjectManifest({
                labelIdentifierFieldMetadataUniversalIdentifier: 'non-existent-field-uuid',
                fields: [
                    {
                        universalIdentifier: 'field-uuid-name',
                        name: 'name',
                        label: 'Name',
                        type: _types.FieldMetadataType.TEXT
                    }
                ]
            })
        });
        expect(result).toBeNull();
    });
    it('should return null when label identifier field has a non-searchable type', ()=>{
        const result = (0, _computesearchvectoruniversalsettingsfromobjectmanifestutil.computeSearchVectorUniversalSettingsFromObjectManifest)({
            objectManifest: buildObjectManifest({
                labelIdentifierFieldMetadataUniversalIdentifier: 'field-uuid-number',
                fields: [
                    {
                        universalIdentifier: 'field-uuid-number',
                        name: 'amount',
                        label: 'Amount',
                        type: _types.FieldMetadataType.NUMBER
                    }
                ]
            })
        });
        expect(result).toBeNull();
    });
    it('should return null when fields array is empty', ()=>{
        const result = (0, _computesearchvectoruniversalsettingsfromobjectmanifestutil.computeSearchVectorUniversalSettingsFromObjectManifest)({
            objectManifest: buildObjectManifest({
                labelIdentifierFieldMetadataUniversalIdentifier: 'field-uuid-name',
                fields: []
            })
        });
        expect(result).toBeNull();
    });
});

//# sourceMappingURL=compute-search-vector-universal-settings-from-object-manifest.util.spec.js.map