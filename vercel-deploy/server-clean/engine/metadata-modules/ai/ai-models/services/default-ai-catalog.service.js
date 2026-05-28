"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DefaultAiCatalogService", {
    enumerable: true,
    get: function() {
        return DefaultAiCatalogService;
    }
});
const _common = require("@nestjs/common");
const _filestoragedriverfactory = require("../../../../core-modules/file-storage/file-storage-driver.factory");
const _twentyconfigservice = require("../../../../core-modules/twenty-config/twenty-config.service");
const _aiprovidersjson = /*#__PURE__*/ _interop_require_default(require("../ai-providers.json"));
const _aiprovidersconfigschema = require("../types/ai-providers-config.schema");
const _normalizeaiprovidersutil = require("../utils/normalize-ai-providers.util");
const _streamtobuffer = require("../../../../../utils/stream-to-buffer");
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
let DefaultAiCatalogService = class DefaultAiCatalogService {
    async onModuleInit() {
        const catalogPath = this.twentyConfigService.get('AI_CATALOG_STORAGE_PATH');
        if (!catalogPath) {
            this.logger.log('Using built-in AI catalog (AI_CATALOG_STORAGE_PATH not set)');
            return;
        }
        try {
            const raw = await this.fetchCatalog(catalogPath);
            this.catalog = (0, _normalizeaiprovidersutil.normalizeAiProviders)(raw);
            this.logger.log(`Loaded AI catalog from storage: ${catalogPath}`);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.logger.warn(`Failed to load AI catalog from storage: ${message}`);
            this.catalog = {};
        }
    }
    getDefaultAiCatalog() {
        return structuredClone(this.catalog);
    }
    async fetchCatalog(filePath) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        const stream = await driver.readFile({
            filePath
        });
        const body = (await (0, _streamtobuffer.streamToBuffer)(stream)).toString('utf-8');
        return _aiprovidersconfigschema.aiProvidersConfigSchema.parse(JSON.parse(body));
    }
    constructor(twentyConfigService, fileStorageDriverFactory){
        this.twentyConfigService = twentyConfigService;
        this.fileStorageDriverFactory = fileStorageDriverFactory;
        this.logger = new _common.Logger(DefaultAiCatalogService.name);
        this.catalog = (0, _normalizeaiprovidersutil.normalizeAiProviders)(_aiprovidersjson.default);
    }
};
DefaultAiCatalogService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _filestoragedriverfactory.FileStorageDriverFactory === "undefined" ? Object : _filestoragedriverfactory.FileStorageDriverFactory
    ])
], DefaultAiCatalogService);

//# sourceMappingURL=default-ai-catalog.service.js.map