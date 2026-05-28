"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphqlerrorsutil = require("../../../graphql/utils/graphql-errors.util");
const _assertworkspacememberupdatenoncustomfieldsutil = require("../assert-workspace-member-update-non-custom-fields.util");
describe('assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly', ()=>{
    it('should throw when the update payload is empty', ()=>{
        expect(()=>(0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
                update: {}
            })).toThrow(_graphqlerrorsutil.UserInputError);
        expect(()=>(0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
                update: {}
            })).toThrow('Update payload cannot be empty');
    });
    it('should not throw when all top-level keys are standard workspaceMember fields', ()=>{
        expect(()=>(0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
                update: {
                    timeZone: 'Europe/Paris',
                    locale: 'en'
                }
            })).not.toThrow();
    });
    it.each([
        'userId',
        'id'
    ])('should throw when the update includes %s', (fieldName)=>{
        expect(()=>(0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
                update: {
                    [fieldName]: 'value'
                }
            })).toThrow(_graphqlerrorsutil.UserInputError);
        expect(()=>(0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
                update: {
                    [fieldName]: 'value'
                }
            })).toThrow(`Cannot update custom workspaceMember field via this endpoint: ${fieldName}`);
    });
    it('should throw when a top-level key is not in the standard field allowlist', ()=>{
        const unknownKey = 'notAWorkspaceMemberField';
        expect(()=>(0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
                update: {
                    [unknownKey]: 'value'
                }
            })).toThrow(_graphqlerrorsutil.UserInputError);
        expect(()=>(0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
                update: {
                    [unknownKey]: 'value'
                }
            })).toThrow(`Cannot update custom workspaceMember field via this endpoint: ${unknownKey}`);
    });
    it('should reject the payload when a disallowed key is mixed with allowed keys', ()=>{
        const unknownKey = 'typoTimeZone';
        expect(()=>(0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
                update: {
                    timeZone: 'Europe/Paris',
                    [unknownKey]: 'x'
                }
            })).toThrow(`Cannot update custom workspaceMember field via this endpoint: ${unknownKey}`);
    });
});

//# sourceMappingURL=assert-workspace-member-update-non-custom-fields.util.spec.js.map