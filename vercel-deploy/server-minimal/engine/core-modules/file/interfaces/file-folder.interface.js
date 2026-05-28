"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fileFolderConfigs", {
    enumerable: true,
    get: function() {
        return fileFolderConfigs;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
(0, _graphql.registerEnumType)(_types.FileFolder, {
    name: 'FileFolder'
});
const fileFolderConfigs = {
    [_types.FileFolder.ProfilePicture]: {
        ignoreExpirationToken: true
    },
    [_types.FileFolder.WorkspaceLogo]: {
        ignoreExpirationToken: true
    },
    [_types.FileFolder.Attachment]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.PersonPicture]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.CorePicture]: {
        ignoreExpirationToken: true
    },
    [_types.FileFolder.File]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.AgentChat]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.BuiltLogicFunction]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.BuiltFrontComponent]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.PublicAsset]: {
        ignoreExpirationToken: true
    },
    [_types.FileFolder.Source]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.FilesField]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.Dependencies]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.Workflow]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.EmailAttachment]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.AppTarball]: {
        ignoreExpirationToken: false
    },
    [_types.FileFolder.GeneratedSdkClient]: {
        ignoreExpirationToken: false
    }
};

//# sourceMappingURL=file-folder.interface.js.map