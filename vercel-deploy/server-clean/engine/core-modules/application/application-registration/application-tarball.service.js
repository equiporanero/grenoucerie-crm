"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationTarballService", {
    enumerable: true,
    get: function() {
        return ApplicationTarballService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _fs = require("fs");
const _os = require("os");
const _path = require("path");
const _semver = /*#__PURE__*/ _interop_require_default(require("semver"));
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _applicationregistrationentity = require("./application-registration.entity");
const _applicationregistrationexception = require("./application-registration.exception");
const _applicationregistrationsourcetypeenum = require("./enums/application-registration-source-type.enum");
const _extracttarballsecurelyutil = require("../application-package/utils/extract-tarball-securely.util");
const _readjsonfileutil = require("../application-package/utils/read-json-file.util");
const _tarballutils = require("../application-package/utils/tarball-utils");
const _applicationversionvalidationservice = require("../application-package/application-version-validation.service");
const _applicationservice = require("../application.service");
const _filestorageservice = require("../../file-storage/file-storage.service");
const _applicationregistrationvariableservice = require("../application-registration-variable/application-registration-variable.service");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ApplicationTarballService = class ApplicationTarballService {
    async uploadTarball(params) {
        const tempDir = (0, _path.join)((0, _os.tmpdir)(), 'twenty-tarball-upload', (0, _uuid.v4)());
        await _fs.promises.mkdir(tempDir, {
            recursive: true
        });
        try {
            const tarballPath = (0, _path.join)(tempDir, 'app.tar.gz');
            await _fs.promises.writeFile(tarballPath, params.tarballBuffer);
            const extractDir = (0, _path.join)(tempDir, 'extracted');
            await _fs.promises.mkdir(extractDir, {
                recursive: true
            });
            await (0, _extracttarballsecurelyutil.extractTarballSecurely)(tarballPath, extractDir);
            const contentDir = await (0, _tarballutils.resolvePackageContentDir)(extractDir);
            const manifest = await (0, _readjsonfileutil.readJsonFile)(contentDir, 'manifest.json');
            const packageJson = await (0, _readjsonfileutil.readJsonFile)(contentDir, 'package.json');
            if (manifest === null) {
                throw new _applicationregistrationexception.ApplicationRegistrationException('manifest.json not found or invalid in tarball', _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_INPUT);
            }
            const requiredServerVersion = packageJson?.engines?.twenty;
            const versionValidation = await this.applicationVersionValidationService.validateServerCompatibility(requiredServerVersion);
            if (!versionValidation.compatible) {
                throw new _applicationregistrationexception.ApplicationRegistrationException(versionValidation.message, ApplicationTarballService.VERSION_REASON_TO_EXCEPTION_CODE[versionValidation.reason]);
            }
            const universalIdentifier = params.universalIdentifier ?? manifest.application?.universalIdentifier;
            if (!(0, _utils.isDefined)(universalIdentifier)) {
                throw new _applicationregistrationexception.ApplicationRegistrationException('universalIdentifier is required (in body or manifest)', _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_INPUT);
            }
            let appRegistration = await this.appRegistrationRepository.findOne({
                where: {
                    universalIdentifier,
                    ownerWorkspaceId: params.ownerWorkspaceId
                }
            });
            if ((0, _utils.isDefined)(appRegistration)) {
                if (appRegistration.sourceType !== _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.LOCAL && appRegistration.sourceType !== _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.TARBALL) {
                    throw new _applicationregistrationexception.ApplicationRegistrationException(`This app is registered as ${appRegistration.sourceType}. Cannot upload tarball.`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.SOURCE_CHANNEL_MISMATCH);
                }
                if (appRegistration.sourceType === _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.TARBALL && (0, _utils.isDefined)(appRegistration.latestAvailableVersion) && (0, _utils.isDefined)(packageJson?.version)) {
                    const incomingVersion = packageJson.version;
                    const currentVersion = appRegistration.latestAvailableVersion;
                    if (!(0, _utils.isDefined)(_semver.default.valid(incomingVersion))) {
                        throw new _applicationregistrationexception.ApplicationRegistrationException(`Invalid version "${incomingVersion}" in package.json. Must be a valid semver version.`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_INPUT);
                    }
                    if ((0, _utils.isDefined)(_semver.default.valid(currentVersion)) && _semver.default.lte(incomingVersion, currentVersion)) {
                        throw new _applicationregistrationexception.ApplicationRegistrationException(`Cannot deploy ${universalIdentifier}@${incomingVersion}: version must be higher than the currently deployed version ${currentVersion}. Please bump the version in package.json.`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.VERSION_ALREADY_EXISTS);
                    }
                }
            } else {
                appRegistration = this.appRegistrationRepository.create({
                    universalIdentifier,
                    name: manifest.application?.displayName ?? 'Unknown App',
                    sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.TARBALL,
                    manifest,
                    latestAvailableVersion: packageJson?.version ?? null,
                    isListed: false,
                    isFeatured: false,
                    oAuthClientId: (0, _uuid.v4)(),
                    oAuthRedirectUris: [],
                    oAuthScopes: [],
                    ownerWorkspaceId: params.ownerWorkspaceId
                });
                appRegistration = await this.appRegistrationRepository.save(appRegistration);
            }
            const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
                workspaceId: params.ownerWorkspaceId
            });
            const savedFile = await this.fileStorageService.writeFile({
                sourceFile: params.tarballBuffer,
                resourcePath: `${appRegistration.id}/app.tar.gz`,
                fileFolder: _types.FileFolder.AppTarball,
                applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
                workspaceId: params.ownerWorkspaceId,
                fileId: appRegistration.tarballFileId ?? (0, _uuid.v4)(),
                settings: {
                    isTemporaryFile: false,
                    toDelete: false
                }
            });
            await this.appRegistrationRepository.update(appRegistration.id, {
                sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.TARBALL,
                tarballFileId: savedFile.id,
                name: manifest.application?.displayName ?? 'Unknown App',
                manifest,
                latestAvailableVersion: packageJson?.version ?? null,
                isListed: false,
                isFeatured: false,
                ownerWorkspaceId: params.ownerWorkspaceId
            });
            if (manifest.application?.serverVariables) {
                await this.applicationRegistrationVariableService.syncVariableSchemas(appRegistration.id, manifest.application.serverVariables);
            }
            this.logger.log(`Tarball uploaded for app ${universalIdentifier} (registration ${appRegistration.id})`);
            return this.appRegistrationRepository.findOneOrFail({
                where: {
                    id: appRegistration.id
                }
            });
        } finally{
            await _fs.promises.rm(tempDir, {
                recursive: true,
                force: true
            });
        }
    }
    constructor(appRegistrationRepository, fileStorageService, applicationService, applicationRegistrationVariableService, applicationVersionValidationService){
        this.appRegistrationRepository = appRegistrationRepository;
        this.fileStorageService = fileStorageService;
        this.applicationService = applicationService;
        this.applicationRegistrationVariableService = applicationRegistrationVariableService;
        this.applicationVersionValidationService = applicationVersionValidationService;
        this.logger = new _common.Logger(ApplicationTarballService.name);
    }
};
ApplicationTarballService.VERSION_REASON_TO_EXCEPTION_CODE = {
    INVALID_REQUIRED_VERSION: _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_APP_ENGINE_REQUIREMENT,
    INVALID_SERVER_VERSION: _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_SERVER_VERSION,
    INCOMPATIBLE: _applicationregistrationexception.ApplicationRegistrationExceptionCode.SERVER_VERSION_INCOMPATIBLE
};
ApplicationTarballService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationregistrationentity.ApplicationRegistrationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _applicationregistrationvariableservice.ApplicationRegistrationVariableService === "undefined" ? Object : _applicationregistrationvariableservice.ApplicationRegistrationVariableService,
        typeof _applicationversionvalidationservice.ApplicationVersionValidationService === "undefined" ? Object : _applicationversionvalidationservice.ApplicationVersionValidationService
    ])
], ApplicationTarballService);

//# sourceMappingURL=application-tarball.service.js.map