"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DestroyViewFilterGroupInput", {
    enumerable: true,
    get: function() {
        return DestroyViewFilterGroupInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DestroyViewFilterGroupInput = class DestroyViewFilterGroupInput {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the view filter group to destroy.'
    }),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], DestroyViewFilterGroupInput.prototype, "id", void 0);
DestroyViewFilterGroupInput = _ts_decorate([
    (0, _graphql.InputType)()
], DestroyViewFilterGroupInput);

//# sourceMappingURL=destroy-view-filter-group.input.js.map