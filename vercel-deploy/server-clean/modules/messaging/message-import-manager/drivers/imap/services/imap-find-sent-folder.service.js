"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapFindSentFolderService", {
    enumerable: true,
    get: function() {
        return ImapFindSentFolderService;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _getsentfoldercandidatesbyregexutil = require("../utils/get-sent-folder-candidates-by-regex.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImapFindSentFolderService = class ImapFindSentFolderService {
    async findSentFolder(client) {
        try {
            const list = await client.list();
            this.logger.debug(`Available folders: ${list.map((item)=>item.path).join(', ')}`);
            const specialUseSentFolder = await this.findSentFolderBySpecialUse(client, list);
            if (specialUseSentFolder) {
                return specialUseSentFolder;
            }
            const candidateSentFolder = await this.findSentFolderByRegexCandidates(client, list);
            if (candidateSentFolder) {
                return candidateSentFolder;
            }
            this.logger.warn('No sent folder found. Only inbox messages will be imported.');
            return null;
        } catch (error) {
            this.logger.warn(`Error listing folders: ${error.message}`);
            return null;
        }
    }
    async findSentFolderBySpecialUse(client, list) {
        for (const folder of list){
            if (folder.specialUse && folder.specialUse.includes('\\Sent')) {
                this.logger.debug(`Found sent folder via special-use flag: ${folder.path}`);
                const messageCount = await this.getFolderMessageCount(client, folder.path);
                if (messageCount > 0) {
                    return {
                        name: folder.name,
                        path: folder.path
                    };
                }
                this.logger.warn(`Special-use sent folder "${folder.path}" is empty, checking other candidates`);
                break;
            }
        }
        return null;
    }
    async findSentFolderByRegexCandidates(client, list) {
        const regexCandidateFolders = (0, _getsentfoldercandidatesbyregexutil.getImapSentFolderCandidatesByRegex)(list);
        for (const folder of regexCandidateFolders){
            const messageCount = await this.getFolderMessageCount(client, folder.path);
            if (messageCount > 0) {
                this.logger.debug(`Selected sent folder via pattern match: ${folder.path}`);
                return {
                    name: folder.name,
                    path: folder.path
                };
            }
        }
        if (regexCandidateFolders.length > 0) {
            this.logger.debug(`Using first regex candidate sent folder: ${regexCandidateFolders[0].path} (no messages found in any regex candidate)`);
            const folder = regexCandidateFolders[0];
            return {
                name: folder.name,
                path: folder.path
            };
        }
        return null;
    }
    async getFolderMessageCount(client, folderPath) {
        try {
            const status = await client.status(folderPath, {
                messages: true
            });
            const messageCount = status?.messages;
            this.logger.debug(`Folder "${folderPath}" has ${messageCount} messages`);
            return (0, _classvalidator.isNumber)(messageCount) ? messageCount : 0;
        } catch (error) {
            this.logger.warn(`Error checking folder "${folderPath}": ${error.message}`);
            return 0;
        }
    }
    constructor(){
        this.logger = new _common.Logger(ImapFindSentFolderService.name);
    }
};
ImapFindSentFolderService = _ts_decorate([
    (0, _common.Injectable)()
], ImapFindSentFolderService);

//# sourceMappingURL=imap-find-sent-folder.service.js.map