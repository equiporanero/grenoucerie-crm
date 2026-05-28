"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowStepPosition", {
    enumerable: true,
    get: function() {
        return WorkflowStepPosition;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowStepPosition = class WorkflowStepPosition {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], WorkflowStepPosition.prototype, "x", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], WorkflowStepPosition.prototype, "y", void 0);
WorkflowStepPosition = _ts_decorate([
    (0, _graphql.ObjectType)('WorkflowStepPosition')
], WorkflowStepPosition);

//# sourceMappingURL=workflow-step-position.dto.js.map