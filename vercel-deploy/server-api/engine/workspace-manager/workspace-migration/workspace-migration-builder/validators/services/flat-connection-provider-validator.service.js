"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatConnectionProviderValidatorService", {
    enumerable: true,
    get: function() {
        return FlatConnectionProviderValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _connectionproviderexceptioncodeenum = require("../../../../../core-modules/application/connection-provider/connection-provider-exception-code.enum");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatConnectionProviderValidatorService = class FlatConnectionProviderValidatorService {
    validateFlatConnectionProviderCreation({ flatEntityToValidate: flatConnectionProvider, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatConnectionProviderMaps: optimisticFlatConnectionProviderMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatConnectionProvider.universalIdentifier,
                name: flatConnectionProvider.name
            },
            metadataName: 'connectionProvider',
            type: 'create'
        });
        if (!(0, _guards.isNonEmptyString)(flatConnectionProvider.name)) {
            validationResult.errors.push({
                code: _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_CONNECTION_PROVIDER_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "WsuFPo",
                    message: "Connection provider name is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "WsuFPo",
                    message: "Connection provider name is required"
                }
            });
        }
        if (!(0, _guards.isNonEmptyString)(flatConnectionProvider.displayName)) {
            validationResult.errors.push({
                code: _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_CONNECTION_PROVIDER_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "zYcf9G",
                    message: "Connection provider displayName is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "xQ2DfP",
                    message: "Connection provider display name is required"
                }
            });
        }
        if (flatConnectionProvider.type === 'oauth') {
            const oauthConfig = flatConnectionProvider.oauthConfig;
            if (!(0, _utils.isDefined)(oauthConfig)) {
                validationResult.errors.push({
                    code: _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_CONNECTION_PROVIDER_INPUT,
                    message: _core.i18n._(/*i18n*/ {
                        id: "YQTVfF",
                        message: "Connection provider with type 'oauth' is missing oauthConfig"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "zey8hv",
                        message: "OAuth connection provider is missing its oauth config block"
                    }
                });
            } else {
                const requiredOAuthFields = [
                    {
                        key: 'authorizationEndpoint',
                        label: 'authorizationEndpoint'
                    },
                    {
                        key: 'tokenEndpoint',
                        label: 'tokenEndpoint'
                    },
                    {
                        key: 'clientIdVariable',
                        label: 'clientIdVariable'
                    },
                    {
                        key: 'clientSecretVariable',
                        label: 'clientSecretVariable'
                    }
                ];
                for (const { key, label } of requiredOAuthFields){
                    if (!(0, _guards.isNonEmptyString)(oauthConfig[key])) {
                        validationResult.errors.push({
                            code: _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_CONNECTION_PROVIDER_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "z2V1Q6",
                                message: "Connection provider oauthConfig.{label} is required",
                                values: {
                                    label: label
                                }
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "MKdH/S",
                                message: "OAuth {label} is required",
                                values: {
                                    label: label
                                }
                            }
                        });
                    }
                }
            }
        }
        const existingByName = Object.values(optimisticFlatConnectionProviderMaps.byUniversalIdentifier).find((existing)=>(0, _utils.isDefined)(existing) && existing.name === flatConnectionProvider.name && existing.applicationUniversalIdentifier === flatConnectionProvider.applicationUniversalIdentifier && existing.universalIdentifier !== flatConnectionProvider.universalIdentifier);
        if ((0, _utils.isDefined)(existingByName)) {
            validationResult.errors.push({
                code: _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.CONNECTION_PROVIDER_NAME_ALREADY_EXISTS,
                message: _core.i18n._(/*i18n*/ {
                    id: "vOKvb8",
                    message: "Connection provider with name {0} already exists for this application",
                    values: {
                        0: flatConnectionProvider.name
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "JYntnV",
                    message: "A connection provider with this name already exists for this application"
                }
            });
        }
        return validationResult;
    }
    validateFlatConnectionProviderDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatConnectionProviderMaps: optimisticFlatConnectionProviderMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                name: flatEntityToValidate.name
            },
            metadataName: 'connectionProvider',
            type: 'delete'
        });
        const existingConnectionProvider = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatConnectionProviderMaps
        });
        if (!(0, _utils.isDefined)(existingConnectionProvider)) {
            validationResult.errors.push({
                code: _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.CONNECTION_PROVIDER_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "mTAp1w",
                    message: "Connection provider not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "mTAp1w",
                    message: "Connection provider not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    validateFlatConnectionProviderUpdate({ universalIdentifier, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatConnectionProviderMaps: optimisticFlatConnectionProviderMaps } }) {
        const fromFlatConnectionProvider = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatConnectionProviderMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'connectionProvider',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatConnectionProvider)) {
            validationResult.errors.push({
                code: _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.CONNECTION_PROVIDER_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "mTAp1w",
                    message: "Connection provider not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "mTAp1w",
                    message: "Connection provider not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
};
FlatConnectionProviderValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatConnectionProviderValidatorService);

//# sourceMappingURL=flat-connection-provider-validator.service.js.map