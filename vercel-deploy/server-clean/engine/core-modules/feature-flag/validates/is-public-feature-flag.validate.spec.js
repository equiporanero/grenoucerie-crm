"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _authexception = require("../../auth/auth.exception");
const _ispublicfeatureflagvalidate = require("./is-public-feature-flag.validate");
jest.mock('twenty-shared/types', ()=>({
        ...jest.requireActual('twenty-shared/types'),
        FeatureFlagKey: {
            mockKey1: 'MOCK_KEY_1',
            mockKey2: 'MOCK_KEY_2'
        }
    }));
const mockPublicFeatureFlag = {
    key: 'MOCK_KEY_1',
    metadata: {
        label: 'Mock Label 1',
        description: 'Mock Description 1',
        imagePath: 'mock/path/1'
    }
};
jest.mock('src/engine/core-modules/lab/utils/is-public-feature-flag.util', ()=>({
        isPublicFeatureFlag: (key)=>{
            if (!key) return false;
            return key === mockPublicFeatureFlag.key;
        }
    }));
// Note: We're using a single public flag for testing as it's sufficient to verify
// the validator's behavior. The validator's role is to check if a flag exists in
// the PUBLIC_FEATURE_FLAGS array, so testing with one flag adequately covers this
// functionality. Adding more flags wouldn't increase the test coverage meaningfully.
describe('publicFeatureFlagValidator', ()=>{
    describe('assertIsPublicFeatureFlag', ()=>{
        const mockException = new _authexception.AuthException('Not a public feature flag', _authexception.AuthExceptionCode.INVALID_INPUT);
        it('should not throw for public feature flags', ()=>{
            const publicFlag = mockPublicFeatureFlag.key;
            expect(()=>{
                _ispublicfeatureflagvalidate.publicFeatureFlagValidator.assertIsPublicFeatureFlag(publicFlag, mockException);
            }).not.toThrow();
        });
        it('should throw the provided exception for non-public feature flags', ()=>{
            const nonPublicFlag = 'MOCK_KEY_2';
            expect(()=>{
                _ispublicfeatureflagvalidate.publicFeatureFlagValidator.assertIsPublicFeatureFlag(nonPublicFlag, mockException);
            }).toThrow(mockException);
        });
        it('should throw the provided exception for undefined key', ()=>{
            expect(()=>{
                _ispublicfeatureflagvalidate.publicFeatureFlagValidator.assertIsPublicFeatureFlag(undefined, mockException);
            }).toThrow(mockException);
        });
        it('should throw the provided exception for null key', ()=>{
            expect(()=>{
                _ispublicfeatureflagvalidate.publicFeatureFlagValidator.assertIsPublicFeatureFlag(null, mockException);
            }).toThrow(mockException);
        });
        it('should maintain type assertion after validation', ()=>{
            const publicFlag = mockPublicFeatureFlag;
            const testTypeAssertion = (flag)=>{
                _ispublicfeatureflagvalidate.publicFeatureFlagValidator.assertIsPublicFeatureFlag(flag, mockException);
                return true;
            };
            expect(testTypeAssertion(publicFlag.key)).toBe(true);
        });
    });
});

//# sourceMappingURL=is-public-feature-flag.validate.spec.js.map