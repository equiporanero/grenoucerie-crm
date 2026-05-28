"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScalarsExplorerService", {
    enumerable: true,
    get: function() {
        return ScalarsExplorerService;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _scalars = require("../workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ScalarsExplorerService = class ScalarsExplorerService {
    getScalarImplementation(scalarName) {
        return this.scalarImplementations[scalarName];
    }
    getUsedScalarNames(schema) {
        const typeMap = schema.getTypeMap();
        const usedScalarNames = [];
        for(const typeName in typeMap){
            const type = typeMap[typeName];
            if ((0, _graphql.isScalarType)(type) && !typeName.startsWith('__')) {
                usedScalarNames.push(type.name);
            }
        }
        return usedScalarNames;
    }
    getScalarResolvers(usedScalarNames) {
        const scalarResolvers = {};
        for (const scalarName of usedScalarNames){
            const scalarImplementation = this.getScalarImplementation(scalarName);
            if (scalarImplementation) {
                scalarResolvers[scalarName] = scalarImplementation;
            }
        }
        return scalarResolvers;
    }
    constructor(){
        this.scalarImplementations = _scalars.scalars.reduce((acc, scalar)=>{
            // @ts-expect-error legacy noImplicitAny
            acc[scalar.name] = scalar;
            return acc;
        }, {});
    }
};
ScalarsExplorerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], ScalarsExplorerService);

//# sourceMappingURL=scalars-explorer.service.js.map