"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SignUpDTO", {
    enumerable: true,
    get: function() {
        return SignUpDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _workspacesubdomainiddto = require("../../workspace/dtos/workspace-subdomain-id.dto");
const _authtokendto = require("./auth-token.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SignUpDTO = class SignUpDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_authtokendto.AuthToken),
    _ts_metadata("design:type", typeof _authtokendto.AuthToken === "undefined" ? Object : _authtokendto.AuthToken)
], SignUpDTO.prototype, "loginToken", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacesubdomainiddto.WorkspaceUrlsAndIdDTO),
    _ts_metadata("design:type", typeof _workspacesubdomainiddto.WorkspaceUrlsAndIdDTO === "undefined" ? Object : _workspacesubdomainiddto.WorkspaceUrlsAndIdDTO)
], SignUpDTO.prototype, "workspace", void 0);
SignUpDTO = _ts_decorate([
    (0, _graphql.ObjectType)('SignUp')
], SignUpDTO);

//# sourceMappingURL=sign-up.dto.js.map