"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatWebhookValidatorService", {
    enumerable: true,
    get: function() {
        return FlatWebhookValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _webhookexception = require("../../../../../metadata-modules/webhook/webhook.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatWebhookValidatorService = class FlatWebhookValidatorService {
    validateTargetUrl(targetUrl) {
        try {
            const url = new URL(targetUrl);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch  {
            return false;
        }
    }
    validateFlatWebhookCreation({ flatEntityToValidate: flatWebhook }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatWebhook.universalIdentifier,
                targetUrl: flatWebhook.targetUrl
            },
            metadataName: 'webhook',
            type: 'create'
        });
        if (!(0, _guards.isNonEmptyString)(flatWebhook.targetUrl)) {
            validationResult.errors.push({
                code: _webhookexception.WebhookExceptionCode.INVALID_WEBHOOK_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "/HKzKW",
                    message: "Target URL is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "/HKzKW",
                    message: "Target URL is required"
                }
            });
        }
        if (!this.validateTargetUrl(flatWebhook.targetUrl)) {
            validationResult.errors.push({
                code: _webhookexception.WebhookExceptionCode.INVALID_TARGET_URL,
                message: _core.i18n._(/*i18n*/ {
                    id: "WreNd7",
                    message: "Invalid target URL provided"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "NR22yi",
                    message: "Please provide a valid HTTP or HTTPS URL"
                }
            });
        }
        return validationResult;
    }
    validateFlatWebhookDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatWebhookMaps: optimisticFlatWebhookMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                targetUrl: flatEntityToValidate.targetUrl
            },
            metadataName: 'webhook',
            type: 'delete'
        });
        const existingWebhook = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatWebhookMaps
        });
        if (!(0, _utils.isDefined)(existingWebhook)) {
            validationResult.errors.push({
                code: _webhookexception.WebhookExceptionCode.WEBHOOK_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "mnANRQ",
                    message: "Webhook not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "mnANRQ",
                    message: "Webhook not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatWebhookUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatWebhookMaps: optimisticFlatWebhookMaps } }) {
        const fromFlatWebhook = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatWebhookMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'webhook',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatWebhook)) {
            validationResult.errors.push({
                code: _webhookexception.WebhookExceptionCode.WEBHOOK_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "mnANRQ",
                    message: "Webhook not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "mnANRQ",
                    message: "Webhook not found"
                }
            });
            return validationResult;
        }
        const targetUrlUpdate = flatEntityUpdate.targetUrl;
        if ((0, _utils.isDefined)(targetUrlUpdate) && !this.validateTargetUrl(targetUrlUpdate)) {
            validationResult.errors.push({
                code: _webhookexception.WebhookExceptionCode.INVALID_TARGET_URL,
                message: _core.i18n._(/*i18n*/ {
                    id: "WreNd7",
                    message: "Invalid target URL provided"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "NR22yi",
                    message: "Please provide a valid HTTP or HTTPS URL"
                }
            });
        }
        return validationResult;
    }
};
FlatWebhookValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatWebhookValidatorService);

//# sourceMappingURL=flat-webhook-validator.service.js.map