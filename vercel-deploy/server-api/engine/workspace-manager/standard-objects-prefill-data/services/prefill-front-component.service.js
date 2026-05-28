"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PrefillFrontComponentService", {
    enumerable: true,
    get: function() {
        return PrefillFrontComponentService;
    }
});
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _filestorageservice = require("../../../core-modules/file-storage/file-storage.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _frontcomponentservice = require("../../../metadata-modules/front-component/front-component.service");
const _getfrontcomponentseedprojectfilesutil = require("../../../metadata-modules/front-component/utils/get-front-component-seed-project-files.util");
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
let PrefillFrontComponentService = class PrefillFrontComponentService {
    async ensureSeeded({ workspaceId, definitions }) {
        const { flatFrontComponentMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFrontComponentMaps'
            ]
        });
        const { workspaceCustomFlatApplication: ownerFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        for (const definition of definitions){
            const existingFrontComponent = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: definition.id,
                flatEntityMaps: flatFrontComponentMaps
            });
            if ((0, _utils.isDefined)(existingFrontComponent)) {
                continue;
            }
            const seedFiles = await (0, _getfrontcomponentseedprojectfilesutil.getFrontComponentSeedProjectFiles)(definition.seedProjectSubdir);
            const sourceFile = seedFiles.find((file)=>file.name.endsWith('index.tsx'));
            const builtFile = seedFiles.find((file)=>file.name.endsWith('index.mjs'));
            if (!(0, _utils.isDefined)(sourceFile) || !(0, _utils.isDefined)(builtFile)) {
                throw new Error(`Seed project for front component "${definition.name}" must have an index.tsx and an index.mjs file`);
            }
            const sourceComponentPath = `${definition.id}/index.tsx`;
            const builtComponentPath = `${definition.id}/index.mjs`;
            await this.fileStorageService.writeFile({
                workspaceId,
                applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier,
                fileFolder: _types.FileFolder.Source,
                resourcePath: sourceComponentPath,
                sourceFile: sourceFile.content,
                settings: {
                    isTemporaryFile: false,
                    toDelete: false
                }
            });
            await this.fileStorageService.writeFile({
                workspaceId,
                applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier,
                fileFolder: _types.FileFolder.BuiltFrontComponent,
                resourcePath: builtComponentPath,
                sourceFile: builtFile.content,
                settings: {
                    isTemporaryFile: false,
                    toDelete: false
                }
            });
            const checksum = _crypto.default.createHash('md5').update(builtFile.content).digest('hex');
            await this.frontComponentService.createOne({
                workspaceId,
                ownerFlatApplication,
                input: {
                    id: definition.id,
                    universalIdentifier: definition.universalIdentifier,
                    name: definition.name,
                    description: definition.description,
                    componentName: definition.componentName,
                    sourceComponentPath,
                    builtComponentPath,
                    builtComponentChecksum: checksum,
                    isHeadless: definition.isHeadless
                }
            });
        }
    }
    constructor(frontComponentService, flatEntityMapsCacheService, fileStorageService, applicationService){
        this.frontComponentService = frontComponentService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.fileStorageService = fileStorageService;
        this.applicationService = applicationService;
    }
};
PrefillFrontComponentService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _frontcomponentservice.FrontComponentService === "undefined" ? Object : _frontcomponentservice.FrontComponentService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], PrefillFrontComponentService);

//# sourceMappingURL=prefill-front-component.service.js.map