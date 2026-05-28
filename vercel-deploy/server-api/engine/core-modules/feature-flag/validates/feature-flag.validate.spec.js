"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _featureflagvalidate = require("./feature-flag.validate");
const _customexception = require("../../../../utils/custom-exception");
describe('featureFlagValidator', ()=>{
    describe('assertIsFeatureFlagKey', ()=>{
        it('should not throw error if featureFlagKey is valid', ()=>{
            expect(()=>_featureflagvalidate.featureFlagValidator.assertIsFeatureFlagKey('IS_JUNCTION_RELATIONS_ENABLED', new _customexception.UnknownException('Error', 'Error', {
                    userFriendlyMessage: /*i18n*/ {
                        id: "SlfejT",
                        message: "Error"
                    }
                }))).not.toThrow();
        });
        it('should throw error if featureFlagKey is invalid', ()=>{
            const invalidKey = 'InvalidKey';
            const exception = new _customexception.UnknownException('Error', 'Error', {
                userFriendlyMessage: /*i18n*/ {
                    id: "SlfejT",
                    message: "Error"
                }
            });
            expect(()=>_featureflagvalidate.featureFlagValidator.assertIsFeatureFlagKey(invalidKey, exception)).toThrow(exception);
        });
    });
});

//# sourceMappingURL=feature-flag.validate.spec.js.map