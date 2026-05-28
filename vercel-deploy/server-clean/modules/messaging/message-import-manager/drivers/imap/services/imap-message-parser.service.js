"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapMessageParserService", {
    enumerable: true,
    get: function() {
        return ImapMessageParserService;
    }
});
const _common = require("@nestjs/common");
const _postalmime = /*#__PURE__*/ _interop_require_default(require("postal-mime"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImapMessageParserService = class ImapMessageParserService {
    async parseMessagesFromFolder(messageUids, folderPath, client) {
        if (!messageUids.length) {
            return {
                messages: [],
                uidValidity: null
            };
        }
        const lock = await client.getMailboxLock(folderPath);
        try {
            const uidValidity = client.mailbox && typeof client.mailbox !== 'boolean' ? client.mailbox.uidValidity : null;
            const uidSet = messageUids.join(',');
            const startTime = Date.now();
            const messages = await client.fetchAll(uidSet, {
                uid: true,
                source: true
            }, {
                uid: true
            });
            const fetchedUids = new Set();
            const results = [];
            for (const message of messages){
                fetchedUids.add(message.uid);
                results.push(await this.parseMessage(message));
            }
            for (const uid of messageUids){
                if (!fetchedUids.has(uid)) {
                    results.push({
                        uid,
                        parsed: null
                    });
                }
            }
            this.logger.log(`Fetched and parsed ${results.length} messages from ${folderPath} in ${Date.now() - startTime}ms`);
            return {
                messages: results,
                uidValidity
            };
        } catch (error) {
            this.logger.error(`Failed to parse messages from folder ${folderPath}: ${error.message}`);
            return {
                messages: this.createErrorResults(messageUids, error),
                uidValidity: null
            };
        } finally{
            lock.release();
        }
    }
    async parseMessage(message) {
        const { uid, source } = message;
        if (!source) {
            this.logger.debug(`No source content for message UID ${uid}`);
            return {
                uid,
                parsed: null
            };
        }
        try {
            const parsed = await _postalmime.default.parse(source);
            return {
                uid,
                parsed
            };
        } catch (error) {
            this.logger.error(`Failed to parse message UID ${uid}: ${error.message}`);
            return {
                uid,
                parsed: null,
                error: error
            };
        }
    }
    createErrorResults(messageUids, error) {
        return messageUids.map((uid)=>({
                uid,
                parsed: null,
                error
            }));
    }
    constructor(){
        this.logger = new _common.Logger(ImapMessageParserService.name);
    }
};
ImapMessageParserService = _ts_decorate([
    (0, _common.Injectable)()
], ImapMessageParserService);

//# sourceMappingURL=imap-message-parser.service.js.map