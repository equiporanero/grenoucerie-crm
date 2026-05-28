"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminChatThreadMessagesDTO", {
    enumerable: true,
    get: function() {
        return AdminChatThreadMessagesDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _adminchatmessagedto = require("./admin-chat-message.dto");
const _adminworkspacechatthreaddto = require("./admin-workspace-chat-thread.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminChatThreadMessagesDTO = class AdminChatThreadMessagesDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_adminworkspacechatthreaddto.AdminWorkspaceChatThreadDTO),
    _ts_metadata("design:type", typeof _adminworkspacechatthreaddto.AdminWorkspaceChatThreadDTO === "undefined" ? Object : _adminworkspacechatthreaddto.AdminWorkspaceChatThreadDTO)
], AdminChatThreadMessagesDTO.prototype, "thread", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _adminchatmessagedto.AdminChatMessageDTO
        ]),
    _ts_metadata("design:type", Array)
], AdminChatThreadMessagesDTO.prototype, "messages", void 0);
AdminChatThreadMessagesDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminChatThreadMessages')
], AdminChatThreadMessagesDTO);

//# sourceMappingURL=admin-chat-thread-messages.dto.js.map