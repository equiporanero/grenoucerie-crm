"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataRepositoryModule", {
    enumerable: true,
    get: function() {
        return ObjectMetadataRepositoryModule;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _metadatatorepositorymapping = require("./metadata-to-repository.mapping");
const _globalworkspaceormmanager = require("../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _twentyormmodule = require("../twenty-orm/twenty-orm.module");
const _workspacedatasourcemodule = require("../workspace-datasource/workspace-datasource.module");
const _convertclasstoobjectmetadatanameutil = require("../workspace-manager/utils/convert-class-to-object-metadata-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ObjectMetadataRepositoryModule = class ObjectMetadataRepositoryModule {
    // @ts-expect-error legacy noImplicitAny
    static forFeature(objectMetadatas) {
        // @ts-expect-error legacy noImplicitAny
        const providers = objectMetadatas.map((objectMetadata)=>{
            // @ts-expect-error legacy noImplicitAny
            const repositoryClass = _metadatatorepositorymapping.metadataToRepositoryMapping[objectMetadata.name];
            if (!repositoryClass) {
                throw new Error(`No repository found for ${objectMetadata.name}`);
            }
            return {
                provide: `${(0, _utils.capitalize)((0, _convertclasstoobjectmetadatanameutil.convertClassNameToObjectMetadataName)(objectMetadata.name))}Repository`,
                useFactory: (globalWorkspaceOrmManager)=>{
                    return new repositoryClass(globalWorkspaceOrmManager);
                },
                inject: [
                    _globalworkspaceormmanager.GlobalWorkspaceOrmManager
                ]
            };
        });
        return {
            module: ObjectMetadataRepositoryModule,
            imports: [
                _workspacedatasourcemodule.WorkspaceDataSourceModule,
                _twentyormmodule.TwentyORMModule
            ],
            providers: [
                ...providers
            ],
            exports: providers
        };
    }
};
ObjectMetadataRepositoryModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({})
], ObjectMetadataRepositoryModule);

//# sourceMappingURL=object-metadata-repository.module.js.map