"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get AdminAiModelConfig () {
        return AdminAiModelConfig;
    },
    get AdminAiModelsDTO () {
        return AdminAiModelsDTO;
    },
    get ApiConfig () {
        return ApiConfig;
    },
    get Billing () {
        return Billing;
    },
    get Captcha () {
        return Captcha;
    },
    get ClientAiModelConfig () {
        return ClientAiModelConfig;
    },
    get ClientConfig () {
        return ClientConfig;
    },
    get ClientConfigMaintenanceMode () {
        return ClientConfigMaintenanceMode;
    },
    get NativeModelCapabilities () {
        return NativeModelCapabilities;
    },
    get PublicFeatureFlag () {
        return PublicFeatureFlag;
    },
    get PublicFeatureFlagMetadata () {
        return PublicFeatureFlagMetadata;
    },
    get Sentry () {
        return Sentry;
    },
    get Support () {
        return Support;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _supportinterface = require("../twenty-config/interfaces/support.interface");
const _billingtrialperioddto = require("../billing/dtos/billing-trial-period.dto");
const _interfaces = require("../captcha/interfaces");
const _publicworkspacedatadto = require("../workspace/dtos/public-workspace-data.dto");
const _aimodelroleenum = require("../../metadata-modules/ai/ai-models/types/ai-model-role.enum");
const _modelfamilyenum = require("../../metadata-modules/ai/ai-models/types/model-family.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_types.FeatureFlagKey, {
    name: 'FeatureFlagKey'
});
(0, _graphql.registerEnumType)(_modelfamilyenum.ModelFamily, {
    name: 'ModelFamily'
});
(0, _graphql.registerEnumType)(_aimodelroleenum.AiModelRole, {
    name: 'AiModelRole'
});
let NativeModelCapabilities = class NativeModelCapabilities {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], NativeModelCapabilities.prototype, "webSearch", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], NativeModelCapabilities.prototype, "twitterSearch", void 0);
NativeModelCapabilities = _ts_decorate([
    (0, _graphql.ObjectType)()
], NativeModelCapabilities);
let ClientAiModelConfig = class ClientAiModelConfig {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", typeof ModelId === "undefined" ? Object : ModelId)
], ClientAiModelConfig.prototype, "modelId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ClientAiModelConfig.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_modelfamilyenum.ModelFamily, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _modelfamilyenum.ModelFamily === "undefined" ? Object : _modelfamilyenum.ModelFamily)
], ClientAiModelConfig.prototype, "modelFamily", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ClientAiModelConfig.prototype, "modelFamilyLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ClientAiModelConfig.prototype, "sdkPackage", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ClientAiModelConfig.prototype, "inputCostPerMillionTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ClientAiModelConfig.prototype, "outputCostPerMillionTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>NativeModelCapabilities, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof NativeModelCapabilities === "undefined" ? Object : NativeModelCapabilities)
], ClientAiModelConfig.prototype, "nativeCapabilities", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], ClientAiModelConfig.prototype, "isDeprecated", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], ClientAiModelConfig.prototype, "isRecommended", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ClientAiModelConfig.prototype, "providerName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ClientAiModelConfig.prototype, "providerLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ClientAiModelConfig.prototype, "contextWindowTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ClientAiModelConfig.prototype, "maxOutputTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ClientAiModelConfig.prototype, "dataResidency", void 0);
ClientAiModelConfig = _ts_decorate([
    (0, _graphql.ObjectType)()
], ClientAiModelConfig);
let AdminAiModelConfig = class AdminAiModelConfig {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminAiModelConfig.prototype, "modelId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminAiModelConfig.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_modelfamilyenum.ModelFamily, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _modelfamilyenum.ModelFamily === "undefined" ? Object : _modelfamilyenum.ModelFamily)
], AdminAiModelConfig.prototype, "modelFamily", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminAiModelConfig.prototype, "modelFamilyLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminAiModelConfig.prototype, "sdkPackage", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AdminAiModelConfig.prototype, "isAvailable", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AdminAiModelConfig.prototype, "isAdminEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], AdminAiModelConfig.prototype, "isDeprecated", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], AdminAiModelConfig.prototype, "isRecommended", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], AdminAiModelConfig.prototype, "contextWindowTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], AdminAiModelConfig.prototype, "maxOutputTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], AdminAiModelConfig.prototype, "inputCostPerMillionTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], AdminAiModelConfig.prototype, "outputCostPerMillionTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminAiModelConfig.prototype, "providerName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminAiModelConfig.prototype, "providerLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminAiModelConfig.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminAiModelConfig.prototype, "dataResidency", void 0);
AdminAiModelConfig = _ts_decorate([
    (0, _graphql.ObjectType)()
], AdminAiModelConfig);
let AdminAiModelsDTO = class AdminAiModelsDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            AdminAiModelConfig
        ]),
    _ts_metadata("design:type", Array)
], AdminAiModelsDTO.prototype, "models", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminAiModelsDTO.prototype, "defaultSmartModelId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminAiModelsDTO.prototype, "defaultFastModelId", void 0);
AdminAiModelsDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminAiModels')
], AdminAiModelsDTO);
let Billing = class Billing {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], Billing.prototype, "isBillingEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Billing.prototype, "billingUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingtrialperioddto.BillingTrialPeriodDTO
        ]),
    _ts_metadata("design:type", Array)
], Billing.prototype, "trialPeriods", void 0);
Billing = _ts_decorate([
    (0, _graphql.ObjectType)()
], Billing);
let Support = class Support {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_supportinterface.SupportDriver),
    _ts_metadata("design:type", typeof _supportinterface.SupportDriver === "undefined" ? Object : _supportinterface.SupportDriver)
], Support.prototype, "supportDriver", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Support.prototype, "supportFrontChatId", void 0);
Support = _ts_decorate([
    (0, _graphql.ObjectType)()
], Support);
let Sentry = class Sentry {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Sentry.prototype, "environment", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Sentry.prototype, "release", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Sentry.prototype, "dsn", void 0);
Sentry = _ts_decorate([
    (0, _graphql.ObjectType)()
], Sentry);
let Captcha = class Captcha {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_interfaces.CaptchaDriverType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Captcha.prototype, "provider", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Captcha.prototype, "siteKey", void 0);
Captcha = _ts_decorate([
    (0, _graphql.ObjectType)()
], Captcha);
let ApiConfig = class ApiConfig {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: false
    }),
    _ts_metadata("design:type", Number)
], ApiConfig.prototype, "mutationMaximumAffectedRecords", void 0);
ApiConfig = _ts_decorate([
    (0, _graphql.ObjectType)()
], ApiConfig);
let PublicFeatureFlagMetadata = class PublicFeatureFlagMetadata {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], PublicFeatureFlagMetadata.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], PublicFeatureFlagMetadata.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PublicFeatureFlagMetadata.prototype, "imagePath", void 0);
PublicFeatureFlagMetadata = _ts_decorate([
    (0, _graphql.ObjectType)()
], PublicFeatureFlagMetadata);
let PublicFeatureFlag = class PublicFeatureFlag {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_types.FeatureFlagKey),
    _ts_metadata("design:type", typeof _types.FeatureFlagKey === "undefined" ? Object : _types.FeatureFlagKey)
], PublicFeatureFlag.prototype, "key", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>PublicFeatureFlagMetadata),
    _ts_metadata("design:type", typeof PublicFeatureFlagMetadata === "undefined" ? Object : PublicFeatureFlagMetadata)
], PublicFeatureFlag.prototype, "metadata", void 0);
PublicFeatureFlag = _ts_decorate([
    (0, _graphql.ObjectType)()
], PublicFeatureFlag);
let ClientConfigMaintenanceMode = class ClientConfigMaintenanceMode {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ClientConfigMaintenanceMode.prototype, "startAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ClientConfigMaintenanceMode.prototype, "endAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ClientConfigMaintenanceMode.prototype, "link", void 0);
ClientConfigMaintenanceMode = _ts_decorate([
    (0, _graphql.ObjectType)()
], ClientConfigMaintenanceMode);
let ClientConfig = class ClientConfig {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ClientConfig.prototype, "appVersion", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_publicworkspacedatadto.AuthProvidersDTO, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof _publicworkspacedatadto.AuthProvidersDTO === "undefined" ? Object : _publicworkspacedatadto.AuthProvidersDTO)
], ClientConfig.prototype, "authProviders", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Billing, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof Billing === "undefined" ? Object : Billing)
], ClientConfig.prototype, "billing", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            ClientAiModelConfig
        ]),
    _ts_metadata("design:type", Array)
], ClientConfig.prototype, "aiModels", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "signInPrefilled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isMultiWorkspaceEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isEmailVerificationRequired", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ClientConfig.prototype, "defaultSubdomain", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ClientConfig.prototype, "frontDomain", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "analyticsEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Support),
    _ts_metadata("design:type", typeof Support === "undefined" ? Object : Support)
], ClientConfig.prototype, "support", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isAttachmentPreviewEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Sentry),
    _ts_metadata("design:type", typeof Sentry === "undefined" ? Object : Sentry)
], ClientConfig.prototype, "sentry", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Captcha),
    _ts_metadata("design:type", typeof Captcha === "undefined" ? Object : Captcha)
], ClientConfig.prototype, "captcha", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>ApiConfig),
    _ts_metadata("design:type", typeof ApiConfig === "undefined" ? Object : ApiConfig)
], ClientConfig.prototype, "api", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "canManageFeatureFlags", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            PublicFeatureFlag
        ]),
    _ts_metadata("design:type", Array)
], ClientConfig.prototype, "publicFeatureFlags", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isMicrosoftMessagingEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isMicrosoftCalendarEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isGoogleMessagingEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isGoogleCalendarEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isConfigVariablesInDbEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isImapSmtpCaldavEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isEmailGroupEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "allowRequestsToTwentyIcons", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ClientConfig.prototype, "calendarBookingPageId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isCloudflareIntegrationEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isClickHouseConfigured", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ClientConfig.prototype, "isWorkspaceSchemaDDLLocked", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>ClientConfigMaintenanceMode, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof ClientConfigMaintenanceMode === "undefined" ? Object : ClientConfigMaintenanceMode)
], ClientConfig.prototype, "maintenance", void 0);
ClientConfig = _ts_decorate([
    (0, _graphql.ObjectType)()
], ClientConfig);

//# sourceMappingURL=client-config.entity.js.map