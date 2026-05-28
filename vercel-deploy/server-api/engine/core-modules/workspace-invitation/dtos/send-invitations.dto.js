"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SendInvitationsDTO", {
    enumerable: true,
    get: function() {
        return SendInvitationsDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _workspaceinvitationdto = require("./workspace-invitation.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SendInvitationsDTO = class SendInvitationsDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        description: 'Boolean that confirms query was dispatched'
    }),
    _ts_metadata("design:type", Boolean)
], SendInvitationsDTO.prototype, "success", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    _ts_metadata("design:type", typeof Array === "undefined" ? Object : Array)
], SendInvitationsDTO.prototype, "errors", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _workspaceinvitationdto.WorkspaceInvitation
        ]),
    _ts_metadata("design:type", typeof Array === "undefined" ? Object : Array)
], SendInvitationsDTO.prototype, "result", void 0);
SendInvitationsDTO = _ts_decorate([
    (0, _graphql.ObjectType)('SendInvitations')
], SendInvitationsDTO);

//# sourceMappingURL=send-invitations.dto.js.map