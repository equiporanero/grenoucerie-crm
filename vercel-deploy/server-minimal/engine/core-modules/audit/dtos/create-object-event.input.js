"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateObjectEventInput", {
    enumerable: true,
    get: function() {
        return CreateObjectEventInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _eventstype = require("../types/events.type");
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
let CreateObjectEventInput = class CreateObjectEventInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", typeof _eventstype.TrackEventName === "undefined" ? Object : _eventstype.TrackEventName)
], CreateObjectEventInput.prototype, "event", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], CreateObjectEventInput.prototype, "recordId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], CreateObjectEventInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], CreateObjectEventInput.prototype, "properties", void 0);
CreateObjectEventInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], CreateObjectEventInput);

//# sourceMappingURL=create-object-event.input.js.map