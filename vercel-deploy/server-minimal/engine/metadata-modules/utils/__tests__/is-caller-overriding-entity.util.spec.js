"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _iscalleroverridingentityutil = require("../is-caller-overriding-entity.util");
const CUSTOM_APP_ID = 'custom-app-universal-id';
const STANDARD_APP_ID = 'standard-app-universal-id';
const OTHER_APP_ID = 'other-app-universal-id';
describe('isCallerOverridingEntity', ()=>{
    it('should return true when custom app updates a standard-app entity', ()=>{
        expect((0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
            callerApplicationUniversalIdentifier: CUSTOM_APP_ID,
            entityApplicationUniversalIdentifier: STANDARD_APP_ID,
            workspaceCustomApplicationUniversalIdentifier: CUSTOM_APP_ID
        })).toBe(true);
    });
    it('should return false when custom app updates its own entity', ()=>{
        expect((0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
            callerApplicationUniversalIdentifier: CUSTOM_APP_ID,
            entityApplicationUniversalIdentifier: CUSTOM_APP_ID,
            workspaceCustomApplicationUniversalIdentifier: CUSTOM_APP_ID
        })).toBe(false);
    });
    it('should return false when a non-custom app updates another app entity', ()=>{
        expect((0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
            callerApplicationUniversalIdentifier: OTHER_APP_ID,
            entityApplicationUniversalIdentifier: STANDARD_APP_ID,
            workspaceCustomApplicationUniversalIdentifier: CUSTOM_APP_ID
        })).toBe(false);
    });
});

//# sourceMappingURL=is-caller-overriding-entity.util.spec.js.map