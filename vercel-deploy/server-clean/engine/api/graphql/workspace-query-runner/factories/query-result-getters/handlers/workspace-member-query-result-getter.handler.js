"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMemberQueryResultGetterHandler", {
    enumerable: true,
    get: function() {
        return WorkspaceMemberQueryResultGetterHandler;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _extractfileidfromurlutil = require("../../../../../../core-modules/file/files-field/utils/extract-file-id-from-url.util");
let WorkspaceMemberQueryResultGetterHandler = class WorkspaceMemberQueryResultGetterHandler {
    async handle(workspaceMember, workspaceId) {
        if (!workspaceMember.id || !workspaceMember?.avatarUrl) {
            return workspaceMember;
        }
        const fileId = (0, _extractfileidfromurlutil.extractFileIdFromUrl)(workspaceMember.avatarUrl, _types.FileFolder.CorePicture);
        if (!(0, _utils.isDefined)(fileId)) {
            return {
                ...workspaceMember,
                avatarUrl: ''
            };
        }
        const signedUrl = await this.fileUrlService.signFileByIdUrl({
            fileId,
            workspaceId,
            fileFolder: _types.FileFolder.CorePicture
        });
        return {
            ...workspaceMember,
            avatarUrl: signedUrl
        };
    }
    constructor(fileUrlService){
        this.fileUrlService = fileUrlService;
    }
};

//# sourceMappingURL=workspace-member-query-result-getter.handler.js.map