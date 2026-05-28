"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _featureflagentity = require("../../feature-flag.entity");
const _featureflagexception = require("../../feature-flag.exception");
const _featureflagservice = require("../feature-flag.service");
const _featureflagvalidate = require("../../validates/feature-flag.validate");
const _ispublicfeatureflagvalidate = require("../../validates/is-public-feature-flag.validate");
const _getworkspacescopedrepositorytokenutil = require("../../../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
const _workspacecacheservice = require("../../../../workspace-cache/services/workspace-cache.service");
jest.mock('src/engine/core-modules/feature-flag/validates/is-public-feature-flag.validate');
jest.mock('src/engine/core-modules/feature-flag/validates/feature-flag.validate');
describe('FeatureFlagService', ()=>{
    let service;
    const mockFeatureFlagRepository = {
        findOneBy: jest.fn(),
        find: jest.fn(),
        upsert: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn()
    };
    const mockWorkspaceCacheService = {
        getOrRecompute: jest.fn(),
        invalidateAndRecompute: jest.fn()
    };
    const workspaceId = 'workspace-id';
    const featureFlag = _types.FeatureFlagKey.IS_JUNCTION_RELATIONS_ENABLED;
    beforeEach(async ()=>{
        jest.clearAllMocks();
        _ispublicfeatureflagvalidate.publicFeatureFlagValidator.assertIsPublicFeatureFlag.mockReset();
        _featureflagvalidate.featureFlagValidator.assertIsFeatureFlagKey.mockReset();
        const module = await _testing.Test.createTestingModule({
            providers: [
                _featureflagservice.FeatureFlagService,
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_featureflagentity.FeatureFlagEntity),
                    useValue: mockFeatureFlagRepository
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: mockWorkspaceCacheService
                }
            ]
        }).compile();
        service = module.get(_featureflagservice.FeatureFlagService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('isFeatureEnabled', ()=>{
        it('should return true when feature flag is enabled', async ()=>{
            // Prepare
            mockWorkspaceCacheService.getOrRecompute.mockResolvedValue({
                featureFlagsMap: {
                    [featureFlag]: true
                }
            });
            // Act
            const result = await service.isFeatureEnabled(featureFlag, workspaceId);
            // Assert
            expect(result).toBe(true);
            expect(mockWorkspaceCacheService.getOrRecompute).toHaveBeenCalledWith(workspaceId, [
                'featureFlagsMap'
            ]);
        });
        it('should return false when feature flag is not found', async ()=>{
            // Prepare
            mockWorkspaceCacheService.getOrRecompute.mockResolvedValue({
                featureFlagsMap: {}
            });
            // Act
            const result = await service.isFeatureEnabled(featureFlag, workspaceId);
            // Assert
            expect(result).toBe(false);
        });
        it('should return false when feature flag value is false', async ()=>{
            // Prepare
            mockFeatureFlagRepository.findOneBy.mockResolvedValue({
                key: featureFlag,
                value: false
            });
            // Act
            const result = await service.isFeatureEnabled(featureFlag, workspaceId);
            // Assert
            expect(result).toBe(false);
        });
    });
    describe('getWorkspaceFeatureFlags', ()=>{
        it('should return all feature flags for a workspace', async ()=>{
            // Prepare
            mockWorkspaceCacheService.getOrRecompute.mockResolvedValue({
                featureFlagsMap: {
                    [_types.FeatureFlagKey.IS_JUNCTION_RELATIONS_ENABLED]: false
                }
            });
            const mockFeatureFlags = [
                {
                    key: _types.FeatureFlagKey.IS_JUNCTION_RELATIONS_ENABLED,
                    value: false
                }
            ];
            // Act
            const result = await service.getWorkspaceFeatureFlags(workspaceId);
            // Assert
            expect(result).toEqual(mockFeatureFlags);
            expect(mockWorkspaceCacheService.getOrRecompute).toHaveBeenCalledWith(workspaceId, [
                'featureFlagsMap'
            ]);
        });
    });
    describe('getWorkspaceFeatureFlagsMap', ()=>{
        it('should return a map of feature flags for a workspace', async ()=>{
            // Prepare
            const mockFeatureFlags = [
                {
                    key: _types.FeatureFlagKey.IS_JUNCTION_RELATIONS_ENABLED,
                    value: false,
                    workspaceId
                }
            ];
            mockFeatureFlagRepository.find.mockResolvedValue(mockFeatureFlags);
            // Act
            const result = await service.getWorkspaceFeatureFlagsMap(workspaceId);
            // Assert
            expect(result).toEqual({
                [_types.FeatureFlagKey.IS_JUNCTION_RELATIONS_ENABLED]: false
            });
        });
    });
    describe('enableFeatureFlags', ()=>{
        it('should enable multiple feature flags for a workspace', async ()=>{
            // Prepare
            const keys = [
                _types.FeatureFlagKey.IS_JUNCTION_RELATIONS_ENABLED
            ];
            mockFeatureFlagRepository.upsert.mockResolvedValue({});
            mockWorkspaceCacheService.invalidateAndRecompute.mockResolvedValue(undefined);
            // Act
            await service.enableFeatureFlags(keys, workspaceId);
            // Assert
            expect(mockFeatureFlagRepository.upsert).toHaveBeenCalledWith(workspaceId, keys.map((key)=>({
                    key,
                    value: true
                })), {
                conflictPaths: [
                    'workspaceId',
                    'key'
                ],
                skipUpdateIfNoValuesChanged: true
            });
            expect(mockWorkspaceCacheService.invalidateAndRecompute).toHaveBeenCalledWith(workspaceId, [
                'featureFlagsMap'
            ]);
        });
    });
    describe('upsertWorkspaceFeatureFlag', ()=>{
        it('should upsert a feature flag for a workspace', async ()=>{
            // Prepare
            const value = true;
            const mockFeatureFlag = {
                key: featureFlag,
                value,
                workspaceId
            };
            mockFeatureFlagRepository.save.mockResolvedValue(mockFeatureFlag);
            mockWorkspaceCacheService.invalidateAndRecompute.mockResolvedValue(undefined);
            _featureflagvalidate.featureFlagValidator.assertIsFeatureFlagKey.mockImplementation(()=>true);
            // Act
            const result = await service.upsertWorkspaceFeatureFlag({
                workspaceId,
                featureFlag,
                value
            });
            // Assert
            expect(result).toEqual(mockFeatureFlag);
            expect(mockFeatureFlagRepository.save).toHaveBeenCalledWith(workspaceId, {
                key: _types.FeatureFlagKey[featureFlag],
                value
            });
            expect(mockWorkspaceCacheService.invalidateAndRecompute).toHaveBeenCalledWith(workspaceId, [
                'featureFlagsMap'
            ]);
        });
        it('should throw an exception when feature flag key is invalid', async ()=>{
            // Prepare
            const invalidFeatureFlag = 'INVALID_KEY';
            const value = true;
            _featureflagvalidate.featureFlagValidator.assertIsFeatureFlagKey.mockImplementation(()=>{
                throw new _featureflagexception.FeatureFlagException('Invalid feature flag key', _featureflagexception.FeatureFlagExceptionCode.INVALID_FEATURE_FLAG_KEY);
            });
            // Act & Assert
            await expect(service.upsertWorkspaceFeatureFlag({
                workspaceId,
                featureFlag: invalidFeatureFlag,
                value
            })).rejects.toThrow(new _featureflagexception.FeatureFlagException('Invalid feature flag key', _featureflagexception.FeatureFlagExceptionCode.INVALID_FEATURE_FLAG_KEY));
        });
        it('should throw an exception when non-public feature flag is used with shouldBePublic=true', async ()=>{
            // Prepare
            _ispublicfeatureflagvalidate.publicFeatureFlagValidator.assertIsPublicFeatureFlag.mockImplementation(()=>{
                throw new _featureflagexception.FeatureFlagException('Invalid feature flag key, flag is not public', _featureflagexception.FeatureFlagExceptionCode.INVALID_FEATURE_FLAG_KEY);
            });
            // Act & Assert
            await expect(service.upsertWorkspaceFeatureFlag({
                workspaceId,
                featureFlag,
                value: true,
                shouldBePublic: true
            })).rejects.toThrow(new _featureflagexception.FeatureFlagException('Invalid feature flag key, flag is not public', _featureflagexception.FeatureFlagExceptionCode.INVALID_FEATURE_FLAG_KEY));
        });
    });
});

//# sourceMappingURL=feature-flag.service.spec.js.map