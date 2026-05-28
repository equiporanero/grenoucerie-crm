"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _constants = require("twenty-shared/constants");
const _metadata = require("twenty-shared/metadata");
const _createemptyflatentitymapsconstant = require("../../../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _permissionflagexception = require("../../../../../../metadata-modules/permission-flag/permission-flag.exception");
const _twentystandardapplications = require("../../../../../twenty-standard-application/constants/twenty-standard-applications");
const _flatpermissionflagvalidatorservice = require("../flat-permission-flag-validator.service");
const buildFlatDefinition = (overrides = {})=>({
        id: '00000000-0000-0000-0000-000000000001',
        universalIdentifier: '00000000-0000-0000-0000-000000000001',
        key: 'TEST_FLAG',
        label: 'Test Flag',
        description: 'A flag for tests',
        icon: 'IconTest',
        permissionType: 'tool',
        workspaceId: 'workspace-id',
        applicationId: '00000000-0000-0000-0000-000000000aaa',
        applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000aaa',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides
    });
const buildEmptyMaps = ()=>(0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
const buildEmptyRolePermissionFlagMaps = ()=>(0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
const buildFlatRolePermissionFlag = (overrides = {})=>({
        id: '00000000-0000-0000-0000-000000000101',
        universalIdentifier: '00000000-0000-0000-0000-000000000101',
        permissionFlagId: '00000000-0000-0000-0000-000000000001',
        permissionFlagUniversalIdentifier: '00000000-0000-0000-0000-000000000001',
        roleUniversalIdentifier: '00000000-0000-0000-0000-000000000201',
        workspaceId: 'workspace-id',
        applicationId: '00000000-0000-0000-0000-000000000aaa',
        applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000aaa',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides
    });
const buildArgs = (flatEntityToValidate, optimisticMaps = buildEmptyMaps())=>({
        flatEntityToValidate,
        optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
            flatPermissionFlagMaps: optimisticMaps
        },
        buildOptions: {}
    });
describe('FlatPermissionFlagValidatorService', ()=>{
    let service;
    beforeEach(async ()=>{
        const moduleRef = await _testing.Test.createTestingModule({
            providers: [
                _flatpermissionflagvalidatorservice.FlatPermissionFlagValidatorService
            ]
        }).compile();
        service = moduleRef.get(_flatpermissionflagvalidatorservice.FlatPermissionFlagValidatorService);
    });
    describe('validateFlatPermissionFlagCreation', ()=>{
        it('passes for a valid definition', ()=>{
            const result = service.validateFlatPermissionFlagCreation(buildArgs(buildFlatDefinition()));
            expect(result.errors).toHaveLength(0);
        });
        it('rejects an empty key', ()=>{
            const result = service.validateFlatPermissionFlagCreation(buildArgs(buildFlatDefinition({
                key: ''
            })));
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.INVALID_PERMISSION_FLAG_KEY
            ]);
        });
        it('rejects an unknown permission type', ()=>{
            const result = service.validateFlatPermissionFlagCreation(buildArgs(buildFlatDefinition({
                permissionType: 'invalid'
            })));
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.INVALID_PERMISSION_FLAG_PERMISSION_TYPE
            ]);
        });
        it('rejects a duplicate key in the same workspace', ()=>{
            const existing = buildFlatDefinition({
                universalIdentifier: '00000000-0000-0000-0000-000000000999',
                key: 'EXISTING_KEY'
            });
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const result = service.validateFlatPermissionFlagCreation(buildArgs(buildFlatDefinition({
                key: 'EXISTING_KEY'
            }), optimisticMaps));
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_ALREADY_EXISTS
            ]);
        });
        it('rejects a duplicate universal identifier', ()=>{
            const existing = buildFlatDefinition();
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const result = service.validateFlatPermissionFlagCreation(buildArgs(buildFlatDefinition({
                id: '00000000-0000-0000-0000-000000000002',
                key: 'ANOTHER_TEST_FLAG'
            }), optimisticMaps));
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_ALREADY_EXISTS
            ]);
        });
    });
    describe('validateFlatPermissionFlagUpdate', ()=>{
        it('passes for a valid update', ()=>{
            const existing = buildFlatDefinition();
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const result = service.validateFlatPermissionFlagUpdate({
                universalIdentifier: existing.universalIdentifier,
                flatEntityUpdate: {
                    label: 'Updated Label'
                },
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: optimisticMaps
                },
                buildOptions: {}
            });
            expect(result.errors).toHaveLength(0);
        });
        it('rejects updating the immutable key field', ()=>{
            const existing = buildFlatDefinition({
                key: 'ORIGINAL_KEY'
            });
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const result = service.validateFlatPermissionFlagUpdate({
                universalIdentifier: existing.universalIdentifier,
                flatEntityUpdate: {
                    key: 'NEW_KEY'
                },
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: optimisticMaps
                },
                buildOptions: {}
            });
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_KEY_IMMUTABLE
            ]);
        });
        it('returns not-found if no existing definition matches the universalIdentifier', ()=>{
            const result = service.validateFlatPermissionFlagUpdate({
                universalIdentifier: '00000000-0000-0000-0000-deadbeefdead',
                flatEntityUpdate: {
                    label: 'New Label'
                },
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: buildEmptyMaps()
                },
                buildOptions: {}
            });
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_NOT_FOUND
            ]);
        });
        it('rejects updating a standard definition from a custom application', ()=>{
            const existing = buildFlatDefinition({
                applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier
            });
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const result = service.validateFlatPermissionFlagUpdate({
                universalIdentifier: existing.universalIdentifier,
                flatEntityUpdate: {
                    label: 'Updated Label'
                },
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: optimisticMaps
                },
                buildOptions: {
                    isSystemBuild: false,
                    applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000aaa'
                }
            });
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_IS_STANDARD
            ]);
        });
        it('rejects updating to an unknown permission type', ()=>{
            const existing = buildFlatDefinition();
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const result = service.validateFlatPermissionFlagUpdate({
                universalIdentifier: existing.universalIdentifier,
                flatEntityUpdate: {
                    permissionType: 'invalid'
                },
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: optimisticMaps
                },
                buildOptions: {}
            });
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.INVALID_PERMISSION_FLAG_PERMISSION_TYPE
            ]);
        });
    });
    describe('validateFlatPermissionFlagDeletion', ()=>{
        it('passes for a valid deletion', ()=>{
            const existing = buildFlatDefinition();
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const result = service.validateFlatPermissionFlagDeletion({
                flatEntityToValidate: existing,
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: optimisticMaps,
                    flatRolePermissionFlagMaps: buildEmptyRolePermissionFlagMaps()
                },
                buildOptions: {}
            });
            expect(result.errors).toHaveLength(0);
        });
        it('returns not-found if no existing definition matches the universalIdentifier', ()=>{
            const result = service.validateFlatPermissionFlagDeletion({
                flatEntityToValidate: buildFlatDefinition({
                    universalIdentifier: '00000000-0000-0000-0000-deadbeefdead'
                }),
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: buildEmptyMaps(),
                    flatRolePermissionFlagMaps: buildEmptyRolePermissionFlagMaps()
                },
                buildOptions: {}
            });
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_NOT_FOUND
            ]);
        });
        it('rejects deleting a standard definition from a custom application', ()=>{
            const existing = buildFlatDefinition({
                applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier
            });
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const result = service.validateFlatPermissionFlagDeletion({
                flatEntityToValidate: existing,
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: optimisticMaps,
                    flatRolePermissionFlagMaps: buildEmptyRolePermissionFlagMaps()
                },
                buildOptions: {
                    isSystemBuild: false,
                    applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000aaa'
                }
            });
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_IS_STANDARD
            ]);
        });
        it('rejects deleting a definition while roles still grant its key', ()=>{
            const existing = buildFlatDefinition({
                key: _constants.PermissionFlagType.WORKSPACE
            });
            const optimisticMaps = buildEmptyMaps();
            optimisticMaps.byUniversalIdentifier[existing.universalIdentifier] = existing;
            const rolePermissionFlagMaps = buildEmptyRolePermissionFlagMaps();
            const rolePermissionFlag = buildFlatRolePermissionFlag({
                permissionFlagId: existing.id,
                permissionFlagUniversalIdentifier: existing.universalIdentifier
            });
            rolePermissionFlagMaps.byUniversalIdentifier[rolePermissionFlag.universalIdentifier] = rolePermissionFlag;
            const result = service.validateFlatPermissionFlagDeletion({
                flatEntityToValidate: existing,
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                    flatPermissionFlagMaps: optimisticMaps,
                    flatRolePermissionFlagMaps: rolePermissionFlagMaps
                },
                buildOptions: {
                    isSystemBuild: false,
                    applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000aaa'
                }
            });
            expect(result.errors.map((error)=>error.code)).toEqual([
                _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_IN_USE
            ]);
        });
    });
    // ALL_METADATA_NAME is referenced as a sanity check the metadata name exists
    it('uses the registered ALL_METADATA_NAME entry', ()=>{
        expect(_metadata.ALL_METADATA_NAME.permissionFlag).toBe('permissionFlag');
    });
});

//# sourceMappingURL=flat-permission-flag-validator.service.spec.js.map