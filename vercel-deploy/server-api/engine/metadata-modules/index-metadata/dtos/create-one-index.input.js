"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateOneIndexInput", {
    enumerable: true,
    get: function() {
        return CreateOneIndexInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _createindexinput = require("./create-index.input");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateOneIndexInput = class CreateOneIndexInput {
};
_ts_decorate([
    (0, _classtransformer.Type)(()=>_createindexinput.CreateIndexInput),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>_createindexinput.CreateIndexInput, {
        description: 'The custom index to create'
    }),
    _ts_metadata("design:type", typeof _createindexinput.CreateIndexInput === "undefined" ? Object : _createindexinput.CreateIndexInput)
], CreateOneIndexInput.prototype, "index", void 0);
CreateOneIndexInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateOneIndexInput);

//# sourceMappingURL=create-one-index.input.js.map