"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _fromfieldmanifesttouniversalflatfieldmetadatautil = require("../from-field-manifest-to-universal-flat-field-metadata.util");
const APP_UID = '11111111-1111-1111-1111-111111111111';
const OBJECT_UID = '22222222-2222-2222-2222-222222222222';
const FIELD_UID = '33333333-3333-3333-3333-333333333333';
const NOW = '2026-05-15T10:00:00.000Z';
const buildFieldManifest = (overrides)=>({
        universalIdentifier: FIELD_UID,
        type: _types.FieldMetadataType.TEXT,
        name: 'demo',
        label: 'Demo',
        objectUniversalIdentifier: OBJECT_UID,
        ...overrides
    });
describe('fromFieldManifestToUniversalFlatFieldMetadata', ()=>{
    describe('composite defaultValue normalization', ()=>{
        it('normalizes empty-name actor defaults to the canonical four-key shape', ()=>{
            const result = (0, _fromfieldmanifesttouniversalflatfieldmetadatautil.fromFieldManifestToUniversalFlatFieldMetadata)({
                fieldManifest: buildFieldManifest({
                    type: _types.FieldMetadataType.ACTOR,
                    name: 'createdBy',
                    label: 'Created by',
                    defaultValue: {
                        name: "''",
                        source: "'MANUAL'"
                    }
                }),
                applicationUniversalIdentifier: APP_UID,
                now: NOW
            });
            expect(result.defaultValue).toEqual({
                context: null,
                name: null,
                source: "'MANUAL'",
                workspaceMemberId: null
            });
        });
        it('is idempotent: re-running the converter on its own output yields the same defaultValue', ()=>{
            const first = (0, _fromfieldmanifesttouniversalflatfieldmetadatautil.fromFieldManifestToUniversalFlatFieldMetadata)({
                fieldManifest: buildFieldManifest({
                    type: _types.FieldMetadataType.ACTOR,
                    name: 'createdBy',
                    label: 'Created by',
                    defaultValue: {
                        name: "''",
                        source: "'MANUAL'"
                    }
                }),
                applicationUniversalIdentifier: APP_UID,
                now: NOW
            });
            const second = (0, _fromfieldmanifesttouniversalflatfieldmetadatautil.fromFieldManifestToUniversalFlatFieldMetadata)({
                fieldManifest: buildFieldManifest({
                    type: _types.FieldMetadataType.ACTOR,
                    name: 'createdBy',
                    label: 'Created by',
                    defaultValue: first.defaultValue
                }),
                applicationUniversalIdentifier: APP_UID,
                now: NOW
            });
            expect(second.defaultValue).toEqual(first.defaultValue);
        });
        it('falls back to the generated default and normalizes it when defaultValue is omitted', ()=>{
            const result = (0, _fromfieldmanifesttouniversalflatfieldmetadatautil.fromFieldManifestToUniversalFlatFieldMetadata)({
                fieldManifest: buildFieldManifest({
                    type: _types.FieldMetadataType.ACTOR,
                    name: 'updatedBy',
                    label: 'Updated by'
                }),
                applicationUniversalIdentifier: APP_UID,
                now: NOW
            });
            expect(result.defaultValue).toEqual({
                context: null,
                name: "'System'",
                source: "'MANUAL'",
                workspaceMemberId: null
            });
        });
        it('leaves non-composite defaults untouched', ()=>{
            const result = (0, _fromfieldmanifesttouniversalflatfieldmetadatautil.fromFieldManifestToUniversalFlatFieldMetadata)({
                fieldManifest: buildFieldManifest({
                    type: _types.FieldMetadataType.TEXT,
                    name: 'title',
                    label: 'Title',
                    defaultValue: "'todo'"
                }),
                applicationUniversalIdentifier: APP_UID,
                now: NOW
            });
            expect(result.defaultValue).toBe("'todo'");
        });
    });
});

//# sourceMappingURL=from-field-manifest-to-universal-flat-field-metadata.util.spec.js.map