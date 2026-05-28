"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapFindDraftsFolderService", {
    enumerable: true,
    get: function() {
        return ImapFindDraftsFolderService;
    }
});
const _common = require("@nestjs/common");
const _standardfolder = require("../../types/standard-folder");
const _getstandardfolderbyregex = require("../../utils/get-standard-folder-by-regex");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImapFindDraftsFolderService = class ImapFindDraftsFolderService {
    async findOrCreateDraftsFolder(client) {
        try {
            const list = await client.list();
            const specialUseDraftsFolder = this.findDraftsFolderBySpecialUse(list);
            if (specialUseDraftsFolder) {
                return specialUseDraftsFolder;
            }
            const regexDraftsFolder = this.findDraftsFolderByRegex(list);
            if (regexDraftsFolder) {
                return regexDraftsFolder;
            }
            return await this.createDraftsFolder(client);
        } catch (error) {
            this.logger.error(`Error finding drafts folder: ${error instanceof Error ? error.message : error}`);
            return null;
        }
    }
    findDraftsFolderBySpecialUse(list) {
        for (const folder of list){
            if (folder.specialUse && folder.specialUse.includes('\\Drafts')) {
                this.logger.debug(`Found drafts folder via special-use flag: ${folder.path}`);
                return {
                    name: folder.name,
                    path: folder.path
                };
            }
        }
        return null;
    }
    findDraftsFolderByRegex(list) {
        for (const folder of list){
            if ((0, _getstandardfolderbyregex.getStandardFolderByRegex)(folder.name) === _standardfolder.StandardFolder.DRAFTS) {
                this.logger.debug(`Found drafts folder via pattern match: ${folder.path}`);
                return {
                    name: folder.name,
                    path: folder.path
                };
            }
        }
        return null;
    }
    async createDraftsFolder(client) {
        try {
            await client.mailboxCreate('Drafts');
            this.logger.debug('Created drafts folder: Drafts');
            return {
                name: 'Drafts',
                path: 'Drafts'
            };
        } catch (error) {
            this.logger.error(`Failed to create drafts folder: ${error instanceof Error ? error.message : error}`);
            return null;
        }
    }
    constructor(){
        this.logger = new _common.Logger(ImapFindDraftsFolderService.name);
    }
};
ImapFindDraftsFolderService = _ts_decorate([
    (0, _common.Injectable)()
], ImapFindDraftsFolderService);

//# sourceMappingURL=imap-find-drafts-folder.service.js.map