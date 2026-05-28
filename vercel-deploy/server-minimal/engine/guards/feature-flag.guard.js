"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get FEATURE_FLAG_KEY () {
        return FEATURE_FLAG_KEY;
    },
    get FeatureFlagGuard () {
        return FeatureFlagGuard;
    },
    get RequireFeatureFlag () {
        return RequireFeatureFlag;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _graphql = require("@nestjs/graphql");
const _featureflagservice = require("../core-modules/feature-flag/services/feature-flag.service");
const _typedreflect = require("../../utils/typed-reflect");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const FEATURE_FLAG_KEY = 'feature-flag-metadata-args';
function RequireFeatureFlag(featureFlag) {
    return (target, _propertyKey, descriptor)=>{
        _typedreflect.TypedReflect.defineMetadata(FEATURE_FLAG_KEY, featureFlag, descriptor?.value || target);
        return descriptor;
    };
}
let FeatureFlagGuard = class FeatureFlagGuard {
    async canActivate(context) {
        const ctx = _graphql.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const workspaceId = request.workspace?.id;
        if (!workspaceId) {
            return false;
        }
        const featureFlag = this.reflector.get(FEATURE_FLAG_KEY, context.getHandler());
        if (!featureFlag) {
            return true;
        }
        const isEnabled = await this.featureFlagService.isFeatureEnabled(featureFlag, workspaceId);
        if (!isEnabled) {
            throw new _common.ForbiddenException(`Feature flag "${featureFlag}" is not enabled for this workspace`);
        }
        return true;
    }
    constructor(reflector, featureFlagService){
        this.reflector = reflector;
        this.featureFlagService = featureFlagService;
    }
};
FeatureFlagGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.Reflector === "undefined" ? Object : _core.Reflector,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService
    ])
], FeatureFlagGuard);

//# sourceMappingURL=feature-flag.guard.js.map