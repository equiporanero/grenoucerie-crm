"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatStreamCatchupChunksDTO", {
    enumerable: true,
    get: function() {
        return ChatStreamCatchupChunksDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
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
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ChatStreamCatchupChunksDTO = class ChatStreamCatchupChunksDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _graphqltypejson.default
        ]),
    _ts_metadata("design:type", Array)
], ChatStreamCatchupChunksDTO.prototype, "chunks", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], ChatStreamCatchupChunksDTO.prototype, "maxSeq", void 0);
ChatStreamCatchupChunksDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ChatStreamCatchupChunks')
], ChatStreamCatchupChunksDTO);

//# sourceMappingURL=chat-stream-catchup-chunks.dto.js.map