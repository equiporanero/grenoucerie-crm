"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _applicationvariableentity = require("../application-variable.entity");
const _applicationvariableexception = require("../application-variable.exception");
const _applicationvariableservice = require("../application-variable.service");
const _secretapplicationvariablemaskconstant = require("../constants/secret-application-variable-mask.constant");
const _secretencryptionservice = require("../../../secret-encryption/secret-encryption.service");
const _workspacecacheservice = require("../../../../workspace-cache/services/workspace-cache.service");
describe('ApplicationVariableEntityService', ()=>{
    let service;
    let repository;
    let secretEncryptionService;
    let workspaceCacheService;
    const mockWorkspaceId = 'workspace-123';
    const mockApplicationId = 'app-456';
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _applicationvariableservice.ApplicationVariableEntityService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_applicationvariableentity.ApplicationVariableEntity),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        save: jest.fn(),
                        delete: jest.fn()
                    }
                },
                {
                    provide: _secretencryptionservice.SecretEncryptionService,
                    useValue: {
                        encryptVersioned: jest.fn((value, opts)=>`enc:v2:deadbeef:${value}|${opts?.workspaceId ?? 'instance'}`),
                        decryptVersioned: jest.fn((value, _opts)=>value.replace(/^enc:v2:[0-9a-f]+:/, '').replace(/\|.*$/, '')),
                        decryptAndMaskVersioned: jest.fn(({ value: _value, mask: _mask, workspaceId: _workspaceId })=>'********')
                    }
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: {
                        invalidateAndRecompute: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_applicationvariableservice.ApplicationVariableEntityService);
        repository = module.get((0, _typeorm.getRepositoryToken)(_applicationvariableentity.ApplicationVariableEntity));
        secretEncryptionService = module.get(_secretencryptionservice.SecretEncryptionService);
        workspaceCacheService = module.get(_workspacecacheservice.WorkspaceCacheService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('update', ()=>{
        it('should encrypt value with workspaceId-scoped envelope when variable is secret', async ()=>{
            const existingVariable = {
                id: '1',
                key: 'API_KEY',
                value: 'old-encrypted-value',
                isSecret: true,
                applicationId: mockApplicationId
            };
            repository.findOne.mockResolvedValue(existingVariable);
            repository.update.mockResolvedValue({
                affected: 1
            });
            await service.update({
                key: 'API_KEY',
                plainTextValue: 'new-secret-value',
                applicationId: mockApplicationId,
                workspaceId: mockWorkspaceId
            });
            expect(secretEncryptionService.encryptVersioned).toHaveBeenCalledWith('new-secret-value', {
                workspaceId: mockWorkspaceId
            });
            expect(repository.update).toHaveBeenCalledWith({
                key: 'API_KEY',
                applicationId: mockApplicationId
            }, {
                value: `enc:v2:deadbeef:new-secret-value|${mockWorkspaceId}`
            });
            expect(workspaceCacheService.invalidateAndRecompute).toHaveBeenCalledWith(mockWorkspaceId, [
                'applicationVariableMaps'
            ]);
        });
        it('should not encrypt value when variable is not secret', async ()=>{
            const existingVariable = {
                id: '1',
                key: 'PUBLIC_URL',
                value: 'https://old-url.com',
                isSecret: false,
                applicationId: mockApplicationId
            };
            repository.findOne.mockResolvedValue(existingVariable);
            repository.update.mockResolvedValue({
                affected: 1
            });
            await service.update({
                key: 'PUBLIC_URL',
                plainTextValue: 'https://new-url.com',
                applicationId: mockApplicationId,
                workspaceId: mockWorkspaceId
            });
            expect(secretEncryptionService.encryptVersioned).not.toHaveBeenCalled();
            expect(repository.update).toHaveBeenCalledWith({
                key: 'PUBLIC_URL',
                applicationId: mockApplicationId
            }, {
                value: 'https://new-url.com'
            });
        });
        it('should throw exception when variable not found', async ()=>{
            repository.findOne.mockResolvedValue(null);
            await expect(service.update({
                key: 'NON_EXISTENT',
                plainTextValue: 'some-value',
                applicationId: mockApplicationId,
                workspaceId: mockWorkspaceId
            })).rejects.toThrow(_applicationvariableexception.ApplicationVariableEntityException);
            await expect(service.update({
                key: 'NON_EXISTENT',
                plainTextValue: 'some-value',
                applicationId: mockApplicationId,
                workspaceId: mockWorkspaceId
            })).rejects.toMatchObject({
                code: _applicationvariableexception.ApplicationVariableEntityExceptionCode.APPLICATION_VARIABLE_NOT_FOUND
            });
        });
    });
    describe('getDisplayValue', ()=>{
        it('should return plain value for non-secret variables', ()=>{
            const variable = {
                id: '1',
                key: 'PUBLIC_URL',
                value: 'https://example.com',
                isSecret: false,
                applicationId: mockApplicationId,
                workspaceId: mockWorkspaceId
            };
            const result = service.getDisplayValue(variable);
            expect(result).toBe('https://example.com');
            expect(secretEncryptionService.decryptAndMaskVersioned).not.toHaveBeenCalled();
        });
        it('should call decryptAndMaskVersioned with the row workspaceId for secret variables', ()=>{
            const variable = {
                id: '1',
                key: 'SECRET_KEY',
                value: 'enc:v2:deadbeef:secret|workspace-123',
                isSecret: true,
                applicationId: mockApplicationId,
                workspaceId: mockWorkspaceId
            };
            service.getDisplayValue(variable);
            expect(secretEncryptionService.decryptAndMaskVersioned).toHaveBeenCalledWith({
                value: 'enc:v2:deadbeef:secret|workspace-123',
                mask: _secretapplicationvariablemaskconstant.SECRET_APPLICATION_VARIABLE_MASK,
                workspaceId: mockWorkspaceId
            });
        });
    });
});

//# sourceMappingURL=application-variable.service.spec.js.map