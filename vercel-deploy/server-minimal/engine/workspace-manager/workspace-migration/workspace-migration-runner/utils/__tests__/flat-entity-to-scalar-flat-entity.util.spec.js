"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _flatentitytoscalarflatentityutil = require("../flat-entity-to-scalar-flat-entity.util");
describe('flatEntityToScalarFlatEntity', ()=>{
    it('should return only scalar and structural properties, excluding universal extras', ()=>{
        const flatEntity = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            id: 'field-metadata-id',
            workspaceId: 'workspace-id',
            applicationId: 'application-id',
            universalIdentifier: 'universal-identifier',
            applicationUniversalIdentifier: 'app-universal-id',
            objectMetadataId: 'object-metadata-id',
            objectMetadataUniversalIdentifier: 'object-universal-id',
            type: _types.FieldMetadataType.TEXT,
            defaultValue: "'default-value'",
            description: 'test description',
            icon: 'IconTest',
            isActive: true,
            isLabelSyncedWithName: false,
            isUnique: false,
            label: 'Test Label',
            name: 'testField',
            options: null,
            standardOverrides: null,
            settings: null,
            universalSettings: null,
            isCustom: true,
            isSystem: false,
            isUIReadOnly: false,
            isNullable: true,
            relationTargetFieldMetadataId: 'relation-target-field-id',
            relationTargetFieldMetadataUniversalIdentifier: 'relation-target-field-universal-id',
            relationTargetObjectMetadataId: 'relation-target-object-id',
            relationTargetObjectMetadataUniversalIdentifier: 'relation-target-object-universal-id',
            morphId: null,
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
        });
        const result = (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
            metadataName: 'fieldMetadata',
            flatEntity
        });
        expect(result).toMatchInlineSnapshot(`
{
  "applicationId": "application-id",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "defaultValue": "'default-value'",
  "description": "test description",
  "icon": "IconTest",
  "id": "field-metadata-id",
  "isActive": true,
  "isCustom": true,
  "isLabelSyncedWithName": false,
  "isNullable": true,
  "isSystem": false,
  "isUIReadOnly": false,
  "isUnique": false,
  "label": "Test Label",
  "morphId": null,
  "name": "testField",
  "objectMetadataId": "object-metadata-id",
  "options": null,
  "relationTargetFieldMetadataId": "relation-target-field-id",
  "relationTargetObjectMetadataId": "relation-target-object-id",
  "settings": null,
  "standardOverrides": null,
  "type": "TEXT",
  "universalIdentifier": "universal-identifier",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "workspaceId": "workspace-id",
}
`);
    });
    it('should preserve secret application variable value instead of masking it', ()=>{
        const encryptedValue = 'dGVzdC1lbmNyeXB0ZWQtdmFsdWUtd2l0aC1pdi1wcmVmaXg=';
        const flatEntity = {
            id: 'app-var-id',
            workspaceId: 'workspace-id',
            applicationId: 'application-id',
            universalIdentifier: 'app-var-universal-id',
            applicationUniversalIdentifier: 'app-universal-id',
            key: 'API_SECRET',
            value: encryptedValue,
            description: 'An API secret key',
            isSecret: true,
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
        };
        const result = (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
            metadataName: 'applicationVariable',
            flatEntity
        });
        expect(result.value).toBe(encryptedValue);
    });
    it('should preserve non-secret application variable value', ()=>{
        const plainValue = 'https://example.com';
        const flatEntity = {
            id: 'app-var-id',
            workspaceId: 'workspace-id',
            applicationId: 'application-id',
            universalIdentifier: 'app-var-universal-id',
            applicationUniversalIdentifier: 'app-universal-id',
            key: 'PUBLIC_URL',
            value: plainValue,
            description: 'A public URL',
            isSecret: false,
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
        };
        const result = (0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
            metadataName: 'applicationVariable',
            flatEntity
        });
        expect(result.value).toBe(plainValue);
    });
});

//# sourceMappingURL=flat-entity-to-scalar-flat-entity.util.spec.js.map