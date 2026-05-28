"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _uuid = require("uuid");
const _computeflatviewfieldstocreateutil = require("../compute-flat-view-fields-to-create.util");
const makeFieldMetadata = (overrides)=>{
    const universalIdentifier = overrides.universalIdentifier ?? (0, _uuid.v4)();
    return {
        universalIdentifier,
        objectMetadataUniversalIdentifier: 'object-uid',
        applicationUniversalIdentifier: 'app-uid',
        name: overrides.name,
        label: overrides.label ?? overrides.name,
        type: overrides.type,
        isCustom: overrides.isCustom ?? false,
        isActive: true,
        isSystem: false,
        isUIReadOnly: false,
        isNullable: true,
        isUnique: false,
        isLabelSyncedWithName: false,
        defaultValue: null,
        description: null,
        icon: null,
        options: null,
        settings: null,
        standardOverrides: null,
        relationTargetObjectMetadataUniversalIdentifier: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        deletedAt: null
    };
};
const flatApplication = {
    universalIdentifier: 'app-uid',
    id: 'app-id'
};
const viewUniversalIdentifier = 'view-uid';
describe('computeFlatViewFieldsToCreate', ()=>{
    it('should exclude TS_VECTOR fields', ()=>{
        const fields = [
            makeFieldMetadata({
                name: 'name',
                type: _types.FieldMetadataType.TEXT
            }),
            makeFieldMetadata({
                name: 'searchVector',
                type: _types.FieldMetadataType.TS_VECTOR
            })
        ];
        const result = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
            objectFlatFieldMetadatas: fields,
            viewUniversalIdentifier,
            flatApplication,
            labelIdentifierFieldMetadataUniversalIdentifier: null
        });
        expect(result).toHaveLength(1);
        expect(result[0].fieldMetadataUniversalIdentifier).toBe(fields[0].universalIdentifier);
    });
    it('should exclude POSITION fields', ()=>{
        const fields = [
            makeFieldMetadata({
                name: 'name',
                type: _types.FieldMetadataType.TEXT
            }),
            makeFieldMetadata({
                name: 'position',
                type: _types.FieldMetadataType.POSITION
            })
        ];
        const result = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
            objectFlatFieldMetadatas: fields,
            viewUniversalIdentifier,
            flatApplication,
            labelIdentifierFieldMetadataUniversalIdentifier: null
        });
        expect(result).toHaveLength(1);
        expect(result[0].fieldMetadataUniversalIdentifier).toBe(fields[0].universalIdentifier);
    });
    it('should exclude RELATION and MORPH_RELATION fields', ()=>{
        const fields = [
            makeFieldMetadata({
                name: 'name',
                type: _types.FieldMetadataType.TEXT
            }),
            makeFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION
            }),
            makeFieldMetadata({
                name: 'target',
                type: _types.FieldMetadataType.MORPH_RELATION
            })
        ];
        const result = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
            objectFlatFieldMetadatas: fields,
            viewUniversalIdentifier,
            flatApplication,
            labelIdentifierFieldMetadataUniversalIdentifier: null
        });
        expect(result).toHaveLength(1);
        expect(result[0].fieldMetadataUniversalIdentifier).toBe(fields[0].universalIdentifier);
    });
    it('should exclude deletedAt field', ()=>{
        const fields = [
            makeFieldMetadata({
                name: 'name',
                type: _types.FieldMetadataType.TEXT
            }),
            makeFieldMetadata({
                name: 'deletedAt',
                type: _types.FieldMetadataType.DATE_TIME
            })
        ];
        const result = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
            objectFlatFieldMetadatas: fields,
            viewUniversalIdentifier,
            flatApplication,
            labelIdentifierFieldMetadataUniversalIdentifier: null
        });
        expect(result).toHaveLength(1);
        expect(result[0].fieldMetadataUniversalIdentifier).toBe(fields[0].universalIdentifier);
    });
    it('should place label identifier field first', ()=>{
        const labelField = makeFieldMetadata({
            name: 'name',
            type: _types.FieldMetadataType.TEXT
        });
        const otherField = makeFieldMetadata({
            name: 'createdAt',
            type: _types.FieldMetadataType.DATE_TIME
        });
        const fields = [
            otherField,
            labelField
        ];
        const result = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
            objectFlatFieldMetadatas: fields,
            viewUniversalIdentifier,
            flatApplication,
            labelIdentifierFieldMetadataUniversalIdentifier: labelField.universalIdentifier
        });
        expect(result).toHaveLength(2);
        expect(result[0].fieldMetadataUniversalIdentifier).toBe(labelField.universalIdentifier);
        expect(result[0].position).toBe(0);
        expect(result[1].fieldMetadataUniversalIdentifier).toBe(otherField.universalIdentifier);
        expect(result[1].position).toBe(1);
    });
    it('should exclude label identifier when excludeLabelIdentifier is true', ()=>{
        const labelField = makeFieldMetadata({
            name: 'name',
            type: _types.FieldMetadataType.TEXT
        });
        const otherField = makeFieldMetadata({
            name: 'createdAt',
            type: _types.FieldMetadataType.DATE_TIME
        });
        const result = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
            objectFlatFieldMetadatas: [
                labelField,
                otherField
            ],
            viewUniversalIdentifier,
            flatApplication,
            labelIdentifierFieldMetadataUniversalIdentifier: labelField.universalIdentifier,
            excludeLabelIdentifier: true
        });
        expect(result).toHaveLength(1);
        expect(result[0].fieldMetadataUniversalIdentifier).toBe(otherField.universalIdentifier);
    });
});

//# sourceMappingURL=compute-flat-view-fields-to-create.util.spec.js.map