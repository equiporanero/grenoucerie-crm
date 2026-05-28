"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _indexTypetypes = require("../../types/indexType.types");
const _generateflatindexutil = require("../generate-flat-index.util");
// Pin the deterministic index names produced by the shared engine for
// canonical input shapes. Any future engine refactor that perturbs a hash
// trips here locally instead of after a workspace migration starts failing
// on a customer install.
describe('generateFlatIndexMetadataWithNameOrThrow', ()=>{
    const now = '2026-05-25T00:00:00.000Z';
    const companyObject = {
        universalIdentifier: 'obj-company',
        nameSingular: 'company',
        isCustom: false
    };
    const scalarUniqueField = {
        universalIdentifier: 'field-domain',
        name: 'domainName',
        type: _types.FieldMetadataType.TEXT,
        isUnique: true
    };
    const scalarNonUniqueField = {
        universalIdentifier: 'field-employees',
        name: 'employees',
        type: _types.FieldMetadataType.NUMBER,
        isUnique: false
    };
    const tsVectorField = {
        universalIdentifier: 'field-search',
        name: 'searchVector',
        type: _types.FieldMetadataType.TS_VECTOR,
        isUnique: false
    };
    const manyToOneRelationField = {
        universalIdentifier: 'field-account-owner',
        name: 'accountOwner',
        type: _types.FieldMetadataType.RELATION,
        isUnique: false,
        universalSettings: {
            relationType: _types.RelationType.MANY_TO_ONE
        }
    };
    const buildIndex = (overrides)=>({
            createdAt: now,
            updatedAt: now,
            universalIdentifier: overrides.universalIdentifier,
            applicationUniversalIdentifier: 'app-standard',
            objectMetadataUniversalIdentifier: companyObject.universalIdentifier,
            indexType: overrides.indexType,
            indexWhereClause: overrides.indexWhereClause ?? null,
            isCustom: false,
            isUnique: overrides.isUnique,
            universalFlatIndexFieldMetadatas: overrides.fieldIds.map((id, order)=>({
                    createdAt: now,
                    updatedAt: now,
                    order,
                    subFieldName: null,
                    fieldMetadataUniversalIdentifier: id,
                    indexMetadataUniversalIdentifier: overrides.universalIdentifier
                }))
        });
    it('pins names for representative standard-index shapes', ()=>{
        const fields = [
            scalarUniqueField,
            scalarNonUniqueField,
            tsVectorField,
            manyToOneRelationField
        ];
        const scalarUnique = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
            flatObjectMetadata: companyObject,
            objectFlatFieldMetadatas: fields,
            flatIndex: buildIndex({
                universalIdentifier: 'idx-scalar-unique',
                isUnique: true,
                indexType: _indexTypetypes.IndexType.BTREE,
                fieldIds: [
                    scalarUniqueField.universalIdentifier
                ]
            })
        });
        const scalarNonUnique = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
            flatObjectMetadata: companyObject,
            objectFlatFieldMetadatas: fields,
            flatIndex: buildIndex({
                universalIdentifier: 'idx-scalar-non-unique',
                isUnique: false,
                indexType: _indexTypetypes.IndexType.BTREE,
                fieldIds: [
                    scalarNonUniqueField.universalIdentifier
                ]
            })
        });
        const searchVectorGin = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
            flatObjectMetadata: companyObject,
            objectFlatFieldMetadatas: fields,
            flatIndex: buildIndex({
                universalIdentifier: 'idx-search-vector',
                isUnique: false,
                indexType: _indexTypetypes.IndexType.GIN,
                fieldIds: [
                    tsVectorField.universalIdentifier
                ]
            })
        });
        const manyToOneJoin = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
            flatObjectMetadata: companyObject,
            objectFlatFieldMetadatas: fields,
            flatIndex: buildIndex({
                universalIdentifier: 'idx-account-owner',
                isUnique: false,
                indexType: _indexTypetypes.IndexType.BTREE,
                fieldIds: [
                    manyToOneRelationField.universalIdentifier
                ]
            })
        });
        const partialUnique = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
            flatObjectMetadata: companyObject,
            objectFlatFieldMetadatas: fields,
            flatIndex: buildIndex({
                universalIdentifier: 'idx-scalar-unique-partial',
                isUnique: true,
                indexType: _indexTypetypes.IndexType.BTREE,
                fieldIds: [
                    scalarUniqueField.universalIdentifier
                ],
                indexWhereClause: '"deletedAt" IS NULL'
            })
        });
        expect({
            scalarUnique: scalarUnique.name,
            scalarNonUnique: scalarNonUnique.name,
            searchVectorGin: searchVectorGin.name,
            manyToOneJoin: manyToOneJoin.name,
            partialUnique: partialUnique.name
        }).toMatchSnapshot();
    });
});

//# sourceMappingURL=generate-flat-index.util.spec.js.map