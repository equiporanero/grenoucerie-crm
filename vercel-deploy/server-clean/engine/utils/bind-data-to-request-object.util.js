"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "bindDataToRequestObject", {
    enumerable: true,
    get: function() {
        return bindDataToRequestObject;
    }
});
const _translations = require("twenty-shared/translations");
const bindDataToRequestObject = (data, request, metadataVersion)=>{
    request.user = data.user;
    request.apiKey = data.apiKey;
    request.application = data.application;
    request.userWorkspace = data.userWorkspace;
    request.workspace = data.workspace;
    request.workspaceId = data.workspace?.id;
    request.workspaceMetadataVersion = metadataVersion;
    request.workspaceMemberId = data.workspaceMemberId;
    request.workspaceMember = data.workspaceMember;
    request.userWorkspaceId = data.userWorkspaceId;
    request.authProvider = data.authProvider;
    request.impersonationContext = data.impersonationContext;
    request.locale = data.userWorkspace?.locale ?? request.headers['x-locale'] ?? _translations.SOURCE_LOCALE;
};

//# sourceMappingURL=bind-data-to-request-object.util.js.map