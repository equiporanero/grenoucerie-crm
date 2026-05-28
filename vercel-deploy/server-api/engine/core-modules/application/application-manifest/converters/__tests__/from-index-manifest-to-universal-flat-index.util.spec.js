"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _fromindexmanifesttouniversalflatindexutil = require("../from-index-manifest-to-universal-flat-index.util");
const _indexTypetypes = require("../../../../../metadata-modules/index-metadata/types/indexType.types");
describe('fromIndexManifestToUniversalFlatIndex', ()=>{
    const now = '2026-01-01T00:00:00.000Z';
    const applicationUniversalIdentifier = 'app-uuid-1';
    const flatObjectMetadata = {
        universalIdentifier: 'obj-uuid-1',
        nameSingular: 'company',
        isCustom: false
    };
    const scalarField = {
        universalIdentifier: 'field-uuid-scalar',
        name: 'industry',
        type: _types.FieldMetadataType.TEXT
    };
    const compositeField = {
        universalIdentifier: 'field-uuid-address',
        name: 'address',
        type: _types.FieldMetadataType.ADDRESS
    };
    const baseManifest = {
        universalIdentifier: 'idx-uuid-1',
        objectUniversalIdentifier: 'obj-uuid-1',
        indexType: 'BTREE'
    };
    it('builds a flat index from a scalar field', ()=>{
        const result = (0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
            indexManifest: {
                ...baseManifest,
                fields: [
                    {
                        universalIdentifier: 'field-entry-1',
                        fieldUniversalIdentifier: scalarField.universalIdentifier
                    }
                ]
            },
            flatObjectMetadata,
            objectFlatFieldMetadatas: [
                scalarField
            ],
            applicationUniversalIdentifier,
            now
        });
        expect(result.universalIdentifier).toBe('idx-uuid-1');
        expect(result.applicationUniversalIdentifier).toBe(applicationUniversalIdentifier);
        expect(result.indexType).toBe(_indexTypetypes.IndexType.BTREE);
        expect(result.isUnique).toBe(false);
        expect(result.indexWhereClause).toBeNull();
        expect(result.isCustom).toBe(false);
        expect(result.universalFlatIndexFieldMetadatas).toHaveLength(1);
        expect(result.universalFlatIndexFieldMetadatas[0]).toMatchObject({
            order: 0,
            subFieldName: null,
            fieldMetadataUniversalIdentifier: scalarField.universalIdentifier,
            indexMetadataUniversalIdentifier: 'idx-uuid-1'
        });
        expect(result.name).toMatch(/^IDX_/);
    });
    it('builds a flat index from a composite field with subFieldName', ()=>{
        const result = (0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
            indexManifest: {
                ...baseManifest,
                fields: [
                    {
                        universalIdentifier: 'field-entry-1',
                        fieldUniversalIdentifier: compositeField.universalIdentifier,
                        subFieldName: 'addressCity'
                    }
                ]
            },
            flatObjectMetadata,
            objectFlatFieldMetadatas: [
                compositeField
            ],
            applicationUniversalIdentifier,
            now
        });
        expect(result.universalFlatIndexFieldMetadatas[0].subFieldName).toBe('addressCity');
    });
    it('forwards isUnique from the manifest', ()=>{
        const result = (0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
            indexManifest: {
                ...baseManifest,
                isUnique: true,
                fields: [
                    {
                        universalIdentifier: 'field-entry-1',
                        fieldUniversalIdentifier: scalarField.universalIdentifier
                    }
                ]
            },
            flatObjectMetadata,
            objectFlatFieldMetadatas: [
                scalarField
            ],
            applicationUniversalIdentifier,
            now
        });
        expect(result.isUnique).toBe(true);
    });
    it('throws when a composite field is referenced without a subFieldName', ()=>{
        expect(()=>(0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
                indexManifest: {
                    ...baseManifest,
                    fields: [
                        {
                            universalIdentifier: 'field-entry-1',
                            fieldUniversalIdentifier: compositeField.universalIdentifier
                        }
                    ]
                },
                flatObjectMetadata,
                objectFlatFieldMetadatas: [
                    compositeField
                ],
                applicationUniversalIdentifier,
                now
            })).toThrow(/requires a subFieldName/);
    });
    it('throws when a scalar field is given a subFieldName', ()=>{
        expect(()=>(0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
                indexManifest: {
                    ...baseManifest,
                    fields: [
                        {
                            universalIdentifier: 'field-entry-1',
                            fieldUniversalIdentifier: scalarField.universalIdentifier,
                            subFieldName: 'something'
                        }
                    ]
                },
                flatObjectMetadata,
                objectFlatFieldMetadatas: [
                    scalarField
                ],
                applicationUniversalIdentifier,
                now
            })).toThrow(/is not composite/);
    });
    it('throws when a composite sub-field is unknown', ()=>{
        expect(()=>(0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
                indexManifest: {
                    ...baseManifest,
                    fields: [
                        {
                            universalIdentifier: 'field-entry-1',
                            fieldUniversalIdentifier: compositeField.universalIdentifier,
                            subFieldName: 'unknownSubField'
                        }
                    ]
                },
                flatObjectMetadata,
                objectFlatFieldMetadatas: [
                    compositeField
                ],
                applicationUniversalIdentifier,
                now
            })).toThrow(/not found on composite field/);
    });
    it('throws when a referenced field does not exist on the object', ()=>{
        expect(()=>(0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
                indexManifest: {
                    ...baseManifest,
                    fields: [
                        {
                            universalIdentifier: 'field-entry-1',
                            fieldUniversalIdentifier: 'missing-field-uuid'
                        }
                    ]
                },
                flatObjectMetadata,
                objectFlatFieldMetadatas: [
                    scalarField
                ],
                applicationUniversalIdentifier,
                now
            })).toThrow(/references unknown field/);
    });
    it('throws when the same (field, subFieldName) pair appears twice', ()=>{
        expect(()=>(0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
                indexManifest: {
                    ...baseManifest,
                    fields: [
                        {
                            universalIdentifier: 'field-entry-1',
                            fieldUniversalIdentifier: scalarField.universalIdentifier
                        },
                        {
                            universalIdentifier: 'field-entry-2',
                            fieldUniversalIdentifier: scalarField.universalIdentifier
                        }
                    ]
                },
                flatObjectMetadata,
                objectFlatFieldMetadatas: [
                    scalarField
                ],
                applicationUniversalIdentifier,
                now
            })).toThrow(/same column twice/);
    });
    it('throws when GIN is requested on a scalar (non-GIN-compatible) field', ()=>{
        expect(()=>(0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
                indexManifest: {
                    ...baseManifest,
                    indexType: 'GIN',
                    fields: [
                        {
                            universalIdentifier: 'field-entry-1',
                            fieldUniversalIdentifier: scalarField.universalIdentifier
                        }
                    ]
                },
                flatObjectMetadata,
                objectFlatFieldMetadatas: [
                    scalarField
                ],
                applicationUniversalIdentifier,
                now
            })).toThrow(/GIN index does not support/);
    });
    it('accepts GIN on a TS_VECTOR field', ()=>{
        const tsVectorField = {
            universalIdentifier: 'field-uuid-tsvector',
            name: 'searchVector',
            type: _types.FieldMetadataType.TS_VECTOR
        };
        const result = (0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
            indexManifest: {
                ...baseManifest,
                indexType: 'GIN',
                fields: [
                    {
                        universalIdentifier: 'field-entry-1',
                        fieldUniversalIdentifier: tsVectorField.universalIdentifier
                    }
                ]
            },
            flatObjectMetadata,
            objectFlatFieldMetadatas: [
                tsVectorField
            ],
            applicationUniversalIdentifier,
            now
        });
        expect(result.indexType).toBe(_indexTypetypes.IndexType.GIN);
    });
    it('throws when fields is empty', ()=>{
        expect(()=>(0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
                indexManifest: {
                    ...baseManifest,
                    fields: []
                },
                flatObjectMetadata,
                objectFlatFieldMetadatas: [],
                applicationUniversalIdentifier,
                now
            })).toThrow(/at least one field/);
    });
});

//# sourceMappingURL=from-index-manifest-to-universal-flat-index.util.spec.js.map