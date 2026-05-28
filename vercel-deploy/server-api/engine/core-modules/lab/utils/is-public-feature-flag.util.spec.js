"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ispublicfeatureflagutil = require("./is-public-feature-flag.util");
jest.mock('twenty-shared/types', ()=>({
        ...jest.requireActual('twenty-shared/types'),
        FeatureFlagKey: {
            mockKey1: 'MOCK_KEY_1',
            mockKey2: 'MOCK_KEY_2'
        }
    }));
jest.mock('src/engine/core-modules/feature-flag/constants/public-feature-flag.const', ()=>({
        PUBLIC_FEATURE_FLAGS: [
            {
                key: 'MOCK_KEY_1',
                metadata: {
                    label: 'Mock Label 1',
                    description: 'Mock Description 1',
                    imagePath: 'mock/path/1'
                }
            }
        ]
    }));
describe('isPublicFeatureFlag', ()=>{
    it('should return true for public flags', ()=>{
        const publicFlag = 'MOCK_KEY_1';
        expect((0, _ispublicfeatureflagutil.isPublicFeatureFlag)(publicFlag)).toBe(true);
    });
    it('should return false for non-public flags', ()=>{
        const nonPublicFlag = 'MOCK_KEY_2';
        expect((0, _ispublicfeatureflagutil.isPublicFeatureFlag)(nonPublicFlag)).toBe(false);
    });
    it('should return false for undefined/null', ()=>{
        expect((0, _ispublicfeatureflagutil.isPublicFeatureFlag)(undefined)).toBe(false);
        expect((0, _ispublicfeatureflagutil.isPublicFeatureFlag)(null)).toBe(false);
    });
});

//# sourceMappingURL=is-public-feature-flag.util.spec.js.map