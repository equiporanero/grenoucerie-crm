"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _buildenvvar = require("../build-env-var");
describe('buildEnvVar', ()=>{
    const workspaceA = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const workspaceB = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
    const mockSecretEncryptionService = {
        encryptVersioned: jest.fn((value, opts)=>`enc:v2:deadbeef:${value}|${opts?.workspaceId ?? 'instance'}`),
        decryptVersioned: jest.fn((value, _opts)=>value.replace(/^enc:v2:[0-9a-f]+:/, '').replace(/\|.*$/, ''))
    };
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    it('should return empty object for empty array', ()=>{
        const result = (0, _buildenvvar.buildEnvVar)([], mockSecretEncryptionService);
        expect(result).toEqual({});
    });
    it('should decrypt secret variables with the row workspaceId bound to HKDF', ()=>{
        const flatVariables = [
            {
                id: '1',
                key: 'PUBLIC_URL',
                value: 'https://example.com',
                description: 'Public URL',
                isSecret: false,
                applicationId: 'app-1',
                workspaceId: workspaceA,
                universalIdentifier: '00000000-0000-0000-0000-000000000000',
                applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
            {
                id: '2',
                key: 'API_SECRET',
                value: `enc:v2:deadbeef:secret-123|${workspaceA}`,
                description: 'API secret',
                isSecret: true,
                applicationId: 'app-1',
                workspaceId: workspaceA,
                universalIdentifier: '00000000-0000-0000-0000-000000000000',
                applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
            {
                id: '3',
                key: 'DEBUG',
                value: 'true',
                description: 'Debug flag',
                isSecret: false,
                applicationId: 'app-1',
                workspaceId: workspaceA,
                universalIdentifier: '00000000-0000-0000-0000-000000000000',
                applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            }
        ];
        const result = (0, _buildenvvar.buildEnvVar)(flatVariables, mockSecretEncryptionService);
        expect(result).toEqual({
            PUBLIC_URL: 'https://example.com',
            API_SECRET: 'secret-123',
            DEBUG: 'true'
        });
        expect(mockSecretEncryptionService.decryptVersioned).toHaveBeenCalledTimes(1);
        expect(mockSecretEncryptionService.decryptVersioned).toHaveBeenCalledWith(`enc:v2:deadbeef:secret-123|${workspaceA}`, {
            workspaceId: workspaceA
        });
    });
    it('routes each secret variable to its own workspace HKDF context', ()=>{
        const flatVariables = [
            {
                id: '1',
                key: 'A_SECRET',
                value: `enc:v2:deadbeef:value-a|${workspaceA}`,
                description: '',
                isSecret: true,
                applicationId: 'app-1',
                workspaceId: workspaceA,
                universalIdentifier: '00000000-0000-0000-0000-000000000000',
                applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
            {
                id: '2',
                key: 'B_SECRET',
                value: `enc:v2:deadbeef:value-b|${workspaceB}`,
                description: '',
                isSecret: true,
                applicationId: 'app-1',
                workspaceId: workspaceB,
                universalIdentifier: '00000000-0000-0000-0000-000000000000',
                applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            }
        ];
        (0, _buildenvvar.buildEnvVar)(flatVariables, mockSecretEncryptionService);
        expect(mockSecretEncryptionService.decryptVersioned).toHaveBeenCalledWith(`enc:v2:deadbeef:value-a|${workspaceA}`, {
            workspaceId: workspaceA
        });
        expect(mockSecretEncryptionService.decryptVersioned).toHaveBeenCalledWith(`enc:v2:deadbeef:value-b|${workspaceB}`, {
            workspaceId: workspaceB
        });
    });
    it('should handle null or undefined values', ()=>{
        const flatVariables = [
            {
                id: '1',
                key: 'NULL_VALUE',
                value: null,
                description: '',
                isSecret: false,
                applicationId: 'app-1',
                workspaceId: workspaceA,
                universalIdentifier: '00000000-0000-0000-0000-000000000000',
                applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
            {
                id: '2',
                key: 'UNDEFINED_VALUE',
                value: undefined,
                description: '',
                isSecret: false,
                applicationId: 'app-1',
                workspaceId: workspaceA,
                universalIdentifier: '00000000-0000-0000-0000-000000000000',
                applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            }
        ];
        const result = (0, _buildenvvar.buildEnvVar)(flatVariables, mockSecretEncryptionService);
        expect(result).toEqual({
            NULL_VALUE: '',
            UNDEFINED_VALUE: ''
        });
    });
    it('should convert non-string values to strings', ()=>{
        const flatVariables = [
            {
                id: '1',
                key: 'NUMBER_VALUE',
                value: 123,
                description: '',
                isSecret: false,
                applicationId: 'app-1',
                workspaceId: workspaceA,
                universalIdentifier: '00000000-0000-0000-0000-000000000000',
                applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            }
        ];
        const result = (0, _buildenvvar.buildEnvVar)(flatVariables, mockSecretEncryptionService);
        expect(result).toEqual({
            NUMBER_VALUE: '123'
        });
    });
});

//# sourceMappingURL=build-env-var.spec.js.map