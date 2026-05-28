"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _stripsecretfromapplicationvariables = require("../strip-secret-from-application-variables");
const makeFlatVariable = (overrides)=>({
        id: '1',
        key: 'KEY',
        value: 'value',
        description: '',
        isSecret: false,
        applicationId: 'app-1',
        workspaceId: '00000000-0000-0000-0000-000000000000',
        universalIdentifier: '00000000-0000-0000-0000-000000000000',
        applicationUniversalIdentifier: '00000000-0000-0000-0000-000000000000',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        ...overrides
    });
describe('stripSecretFromApplicationVariables', ()=>{
    it('should return empty object for empty array', ()=>{
        expect((0, _stripsecretfromapplicationvariables.stripSecretFromApplicationVariables)([])).toEqual({});
    });
    it('should include non-secret variables', ()=>{
        const variables = [
            makeFlatVariable({
                key: 'PUBLIC_URL',
                value: 'https://example.com'
            }),
            makeFlatVariable({
                id: '2',
                key: 'DEBUG',
                value: 'true'
            })
        ];
        expect((0, _stripsecretfromapplicationvariables.stripSecretFromApplicationVariables)(variables)).toEqual({
            PUBLIC_URL: 'https://example.com',
            DEBUG: 'true'
        });
    });
    it('should exclude secret variables', ()=>{
        const variables = [
            makeFlatVariable({
                key: 'PUBLIC_URL',
                value: 'https://example.com'
            }),
            makeFlatVariable({
                id: '2',
                key: 'API_SECRET',
                value: 'encrypted_secret',
                isSecret: true
            }),
            makeFlatVariable({
                id: '3',
                key: 'DEBUG',
                value: 'true'
            })
        ];
        const result = (0, _stripsecretfromapplicationvariables.stripSecretFromApplicationVariables)(variables);
        expect(result).toEqual({
            PUBLIC_URL: 'https://example.com',
            DEBUG: 'true'
        });
        expect(result).not.toHaveProperty('API_SECRET');
    });
    it('should handle null and undefined values', ()=>{
        const variables = [
            makeFlatVariable({
                key: 'NULL_VALUE',
                value: null
            }),
            makeFlatVariable({
                id: '2',
                key: 'UNDEFINED_VALUE',
                value: undefined
            })
        ];
        expect((0, _stripsecretfromapplicationvariables.stripSecretFromApplicationVariables)(variables)).toEqual({
            NULL_VALUE: '',
            UNDEFINED_VALUE: ''
        });
    });
    it('should convert non-string values to strings', ()=>{
        const variables = [
            makeFlatVariable({
                key: 'NUMBER_VALUE',
                value: 123
            })
        ];
        expect((0, _stripsecretfromapplicationvariables.stripSecretFromApplicationVariables)(variables)).toEqual({
            NUMBER_VALUE: '123'
        });
    });
    it('should return empty object when all variables are secret', ()=>{
        const variables = [
            makeFlatVariable({
                key: 'SECRET_1',
                value: 'val1',
                isSecret: true
            }),
            makeFlatVariable({
                id: '2',
                key: 'SECRET_2',
                value: 'val2',
                isSecret: true
            })
        ];
        expect((0, _stripsecretfromapplicationvariables.stripSecretFromApplicationVariables)(variables)).toEqual({});
    });
});

//# sourceMappingURL=strip-secret-from-application-variables.spec.js.map