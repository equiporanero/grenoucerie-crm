"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewFilterGroupInput", {
    enumerable: true,
    get: function() {
        return UpdateViewFilterGroupInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _createviewfiltergroupinput = require("./create-view-filter-group.input");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UpdateViewFilterGroupInput = class UpdateViewFilterGroupInput extends (0, _graphql.PartialType)(_createviewfiltergroupinput.CreateViewFilterGroupInput) {
};
UpdateViewFilterGroupInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewFilterGroupInput);

//# sourceMappingURL=update-view-filter-group.input.js.map