"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceResolverBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceResolverBuilderService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _findduplicatesresolverfactory = require("./factories/find-duplicates-resolver.factory");
const _mergemanyresolverfactory = require("./factories/merge-many-resolver.factory");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceResolverBuilderService = class WorkspaceResolverBuilderService {
    shouldBuildResolver(objectMetadata, methodName) {
        switch(methodName){
            case _findduplicatesresolverfactory.FindDuplicatesResolverFactory.methodName:
                return (0, _utils.isDefined)(objectMetadata.duplicateCriteria);
            case _mergemanyresolverfactory.MergeManyResolverFactory.methodName:
                return (0, _utils.isDefined)(objectMetadata.duplicateCriteria);
            default:
                return true;
        }
    }
    constructor(){}
};
WorkspaceResolverBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], WorkspaceResolverBuilderService);

//# sourceMappingURL=workspace-resolver-builder.service.js.map