"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly", {
    enumerable: true,
    get: function() {
        return assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly;
    }
});
const _metadata = require("twenty-shared/metadata");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const WORKSPACE_MEMBER_UPDATE_DISALLOWED_FIELD_NAMES = new Set([
    'id',
    'userId'
]);
const WORKSPACE_MEMBER_NON_CUSTOM_UPDATE_FIELD_ALLOWLIST = new Set(Object.keys(_metadata.STANDARD_OBJECTS.workspaceMember.fields).filter((fieldName)=>!WORKSPACE_MEMBER_UPDATE_DISALLOWED_FIELD_NAMES.has(fieldName)));
const assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly = ({ update })=>{
    const updateKeys = Object.keys(update);
    if (updateKeys.length === 0) {
        throw new _graphqlerrorsutil.UserInputError('Update payload cannot be empty', {
            userFriendlyMessage: /*i18n*/ {
                id: "ffpvxH",
                message: "Add at least one field to update."
            }
        });
    }
    for (const payloadKey of updateKeys){
        if (!WORKSPACE_MEMBER_NON_CUSTOM_UPDATE_FIELD_ALLOWLIST.has(payloadKey)) {
            throw new _graphqlerrorsutil.UserInputError(`Cannot update custom workspaceMember field via this endpoint: ${payloadKey}`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "SsRDX3",
                    message: '"{payloadKey}" is not a valid workspace member field.',
                    values: {
                        payloadKey: payloadKey
                    }
                }
            });
        }
    }
};

//# sourceMappingURL=assert-workspace-member-update-non-custom-fields.util.js.map