"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InboundEmailParserService", {
    enumerable: true,
    get: function() {
        return InboundEmailParserService;
    }
});
const _common = require("@nestjs/common");
const _postalmime = /*#__PURE__*/ _interop_require_default(require("postal-mime"));
const _messagedirectionenum = require("../../../../common/enums/message-direction.enum");
const _extractparticipantsfromparsedemailutil = require("../../../utils/extract-participants-from-parsed-email.util");
const _extractthreadidfromparsedemailutil = require("../../../utils/extract-thread-id-from-parsed-email.util");
const _sanitizestringutil = require("../../../utils/sanitize-string.util");
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
let InboundEmailParserService = class InboundEmailParserService {
    async parse(rawMessage, s3Key) {
        const parsedEmail = await _postalmime.default.parse(rawMessage);
        const message = this.buildMessage(parsedEmail, s3Key);
        return {
            parsed: parsedEmail,
            message
        };
    }
    buildMessage(parsedEmail, s3Key) {
        return {
            externalId: `inbound-email:${s3Key}`,
            messageThreadExternalId: (0, _extractthreadidfromparsedemailutil.extractThreadIdFromParsedEmail)(parsedEmail),
            headerMessageId: parsedEmail.messageId?.trim() || `inbound-${s3Key}`,
            subject: (0, _sanitizestringutil.sanitizeString)(parsedEmail.subject || ''),
            text: (0, _sanitizestringutil.sanitizeString)(parsedEmail.text || ''),
            receivedAt: parsedEmail.date ? new Date(parsedEmail.date) : new Date(),
            direction: _messagedirectionenum.MessageDirection.INCOMING,
            attachments: [],
            participants: (0, _extractparticipantsfromparsedemailutil.extractParticipantsFromParsedEmail)(parsedEmail)
        };
    }
};
InboundEmailParserService = _ts_decorate([
    (0, _common.Injectable)()
], InboundEmailParserService);

//# sourceMappingURL=inbound-email-parser.service.js.map