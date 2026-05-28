"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationPackageFetcherService", {
    enumerable: true,
    get: function() {
        return ApplicationPackageFetcherService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _fs = require("fs");
const _os = require("os");
const _path = require("path");
const _axios = require("axios");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _applicationregistrationsourcetypeenum = require("../application-registration/enums/application-registration-source-type.enum");
const _applicationexception = require("../application.exception");
const _applicationentity = require("../application.entity");
const _assertvalidnpmpackagenameutil = require("./utils/assert-valid-npm-package-name.util");
const _extracttarballsecurelyutil = require("./utils/extract-tarball-securely.util");
const _readjsonfileutil = require("./utils/read-json-file.util");
const _tarballutils = require("./utils/tarball-utils");
const _filestorageservice = require("../../file-storage/file-storage.service");
const _fileentity = require("../../file/entities/file.entity");
const _removefilefolderfromfileentitypathutils = require("../../file/utils/remove-file-folder-from-file-entity-path.utils");
const _securehttpclientservice = require("../../secure-http-client/secure-http-client.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _streamtobuffer = require("../../../../utils/stream-to-buffer");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const APP_FETCHER_TMPDIR = (0, _path.join)((0, _os.tmpdir)(), 'twenty-app-fetcher');
const RESOLUTION_TIMEOUT_MS = 30_000;
let ApplicationPackageFetcherService = class ApplicationPackageFetcherService {
    async onModuleInit() {
        try {
            await _fs.promises.rm(APP_FETCHER_TMPDIR, {
                recursive: true,
                force: true
            });
        } catch  {
        // best-effort cleanup of stale temp files from previous runs
        }
    }
    async resolvePackage(appRegistration, options) {
        switch(appRegistration.sourceType){
            case _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.NPM:
                if (!appRegistration.sourcePackage) {
                    throw new _applicationexception.ApplicationException(`App registration ${appRegistration.id} has sourceType=npm but no sourcePackage`, _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED);
                }
                return this.resolveFromNpm(appRegistration.sourcePackage, options?.targetVersion);
            case _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.TARBALL:
                return this.resolveFromTarball(appRegistration);
            case _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.LOCAL:
            case _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.OAUTH_ONLY:
                return null;
        }
    }
    async cleanupExtractedDir(extractedDir) {
        try {
            await _fs.promises.rm(extractedDir, {
                recursive: true,
                force: true
            });
        } catch (error) {
            this.logger.warn(`Failed to clean up ${extractedDir}: ${error}`);
        }
    }
    async resolveFromNpm(packageName, targetVersion) {
        const workDir = (0, _path.join)(APP_FETCHER_TMPDIR, (0, _uuid.v4)());
        await _fs.promises.mkdir(workDir, {
            recursive: true
        });
        try {
            const registryUrl = this.twentyConfigService.get('APP_REGISTRY_URL');
            const authToken = this.twentyConfigService.get('APP_REGISTRY_TOKEN');
            (0, _assertvalidnpmpackagenameutil.assertValidNpmPackageName)(packageName);
            const versionSpec = targetVersion ?? 'latest';
            const tarballUrl = await this.fetchTarballUrl(registryUrl, packageName, versionSpec, authToken);
            const tarballBuffer = await this.downloadTarball(tarballUrl, registryUrl, authToken);
            const tarballPath = (0, _path.join)(workDir, 'package.tgz');
            await _fs.promises.writeFile(tarballPath, tarballBuffer);
            await (0, _extracttarballsecurelyutil.extractTarballSecurely)(tarballPath, workDir);
            await _fs.promises.rm(tarballPath);
            const contentDir = await (0, _tarballutils.resolvePackageContentDir)(workDir);
            const manifest = await (0, _readjsonfileutil.readJsonFileOrThrow)(contentDir, 'manifest.json');
            const packageJson = await (0, _readjsonfileutil.readJsonFileOrThrow)(contentDir, 'package.json');
            return {
                extractedDir: contentDir,
                cleanupDir: workDir,
                manifest,
                packageJson
            };
        } catch (error) {
            await this.cleanupExtractedDir(workDir);
            if (error instanceof _applicationexception.ApplicationException) {
                throw error;
            }
            throw new _applicationexception.ApplicationException(`Failed to resolve npm package ${packageName}: ${error}`, _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED);
        }
    }
    async resolveFromTarball(appRegistration) {
        if (!(0, _utils.isDefined)(appRegistration.tarballFileId)) {
            throw new _applicationexception.ApplicationException(`App registration ${appRegistration.id} has sourceType=tarball but no tarball file`, _applicationexception.ApplicationExceptionCode.TARBALL_EXTRACTION_FAILED);
        }
        const workDir = (0, _path.join)(APP_FETCHER_TMPDIR, (0, _uuid.v4)());
        await _fs.promises.mkdir(workDir, {
            recursive: true
        });
        try {
            const file = await this.fileRepository.findOneOrFail({
                where: {
                    id: appRegistration.tarballFileId
                }
            });
            const application = await this.applicationRepository.findOneOrFail({
                where: {
                    id: file.applicationId
                }
            });
            const tarballStream = await this.fileStorageService.readFile({
                workspaceId: file.workspaceId,
                applicationUniversalIdentifier: application.universalIdentifier,
                fileFolder: _types.FileFolder.AppTarball,
                resourcePath: (0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(file.path)
            });
            const tarballBuffer = await (0, _streamtobuffer.streamToBuffer)(tarballStream);
            const tarballPath = (0, _path.join)(workDir, 'app.tar.gz');
            await _fs.promises.writeFile(tarballPath, tarballBuffer);
            await (0, _extracttarballsecurelyutil.extractTarballSecurely)(tarballPath, workDir);
            await _fs.promises.rm(tarballPath);
            const contentDir = await (0, _tarballutils.resolvePackageContentDir)(workDir);
            const manifest = await (0, _readjsonfileutil.readJsonFileOrThrow)(contentDir, 'manifest.json');
            const packageJson = await (0, _readjsonfileutil.readJsonFileOrThrow)(contentDir, 'package.json');
            return {
                extractedDir: contentDir,
                cleanupDir: workDir,
                manifest,
                packageJson
            };
        } catch (error) {
            await this.cleanupExtractedDir(workDir);
            if (error instanceof _applicationexception.ApplicationException) {
                throw error;
            }
            throw new _applicationexception.ApplicationException(`Failed to resolve tarball for app ${appRegistration.universalIdentifier}: ${error}`, _applicationexception.ApplicationExceptionCode.TARBALL_EXTRACTION_FAILED);
        }
    }
    async fetchTarballUrl(registryUrl, packageName, versionSpec, authToken) {
        const encodedName = encodeURIComponent(packageName);
        const baseUrl = registryUrl.replace(/\/$/, '');
        const metadataUrl = `${baseUrl}/${encodedName}/${versionSpec}`;
        const headers = {
            Accept: 'application/json'
        };
        const httpClient = this.secureHttpClientService.getHttpClient({
            timeout: RESOLUTION_TIMEOUT_MS,
            ...(0, _utils.isDefined)(authToken) ? {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            } : {}
        });
        let response;
        try {
            response = await httpClient.get(metadataUrl, {
                headers
            });
        } catch (error) {
            throw new _applicationexception.ApplicationException(`Registry returned ${(0, _axios.isAxiosError)(error) ? error.response?.status : 'unknown error'} for ${packageName}@${versionSpec}`, _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED);
        }
        const tarballUrl = response.data?.dist?.tarball;
        if (!tarballUrl) {
            throw new _applicationexception.ApplicationException(`No tarball URL in registry metadata for ${packageName}@${versionSpec}`, _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED);
        }
        return tarballUrl;
    }
    async downloadTarball(tarballUrl, registryUrl, authToken) {
        const headers = {};
        const isSameHost = new URL(tarballUrl).host === new URL(registryUrl).host;
        if (authToken && isSameHost) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        const httpClient = this.secureHttpClientService.getHttpClient({
            timeout: RESOLUTION_TIMEOUT_MS
        });
        try {
            const response = await httpClient.get(tarballUrl, {
                headers,
                responseType: 'arraybuffer'
            });
            return Buffer.from(response.data);
        } catch (error) {
            throw new _applicationexception.ApplicationException(`Failed to download tarball: ${(0, _axios.isAxiosError)(error) ? error.response?.status : error}`, _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED);
        }
    }
    constructor(twentyConfigService, fileStorageService, secureHttpClientService, // Tarball lookup keyed by ApplicationRegistration id (catalog rows have null ownerWorkspaceId).
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    fileRepository, applicationRepository){
        this.twentyConfigService = twentyConfigService;
        this.fileStorageService = fileStorageService;
        this.secureHttpClientService = secureHttpClientService;
        this.fileRepository = fileRepository;
        this.applicationRepository = applicationRepository;
        this.logger = new _common.Logger(ApplicationPackageFetcherService.name);
    }
};
ApplicationPackageFetcherService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_fileentity.FileEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ApplicationPackageFetcherService);

//# sourceMappingURL=application-package-fetcher.service.js.map