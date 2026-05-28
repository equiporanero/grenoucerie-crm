"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PrefillLogicFunctionService", {
    enumerable: true,
    get: function() {
        return PrefillLogicFunctionService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _logicfunctionfromsourceservice = require("../../../metadata-modules/logic-function/services/logic-function-from-source.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PrefillLogicFunctionService = class PrefillLogicFunctionService {
    async ensureSeeded({ workspaceId, definitions }) {
        const { flatLogicFunctionMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatLogicFunctionMaps'
            ]
        });
        for (const definition of definitions){
            const existingLogicFunction = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: definition.id,
                flatEntityMaps: flatLogicFunctionMaps
            });
            if ((0, _utils.isDefined)(existingLogicFunction)) {
                continue;
            }
            await this.logicFunctionFromSourceService.createOneFromSource({
                workspaceId,
                input: {
                    id: definition.id,
                    name: definition.name,
                    description: definition.description,
                    source: {
                        sourceHandlerCode: definition.sourceHandlerCode,
                        handlerName: 'main'
                    }
                }
            });
        }
    }
    constructor(logicFunctionFromSourceService, flatEntityMapsCacheService){
        this.logicFunctionFromSourceService = logicFunctionFromSourceService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
    }
};
PrefillLogicFunctionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionfromsourceservice.LogicFunctionFromSourceService === "undefined" ? Object : _logicfunctionfromsourceservice.LogicFunctionFromSourceService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], PrefillLogicFunctionService);

//# sourceMappingURL=prefill-logic-function.service.js.map