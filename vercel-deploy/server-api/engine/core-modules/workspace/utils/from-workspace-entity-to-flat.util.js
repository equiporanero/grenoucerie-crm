"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromWorkspaceEntityToFlat", {
    enumerable: true,
    get: function() {
        return fromWorkspaceEntityToFlat;
    }
});
const fromWorkspaceEntityToFlat = (entity)=>({
        id: entity.id,
        displayName: entity.displayName,
        logo: entity.logo,
        logoFileId: entity.logoFileId,
        inviteHash: entity.inviteHash,
        allowImpersonation: entity.allowImpersonation,
        isPublicInviteLinkEnabled: entity.isPublicInviteLinkEnabled,
        trashRetentionDays: entity.trashRetentionDays,
        eventLogRetentionDays: entity.eventLogRetentionDays,
        activationStatus: entity.activationStatus,
        metadataVersion: entity.metadataVersion,
        databaseSchema: entity.databaseSchema,
        subdomain: entity.subdomain,
        customDomain: entity.customDomain,
        isGoogleAuthEnabled: entity.isGoogleAuthEnabled,
        isGoogleAuthBypassEnabled: entity.isGoogleAuthBypassEnabled,
        isTwoFactorAuthenticationEnforced: entity.isTwoFactorAuthenticationEnforced,
        isPasswordAuthEnabled: entity.isPasswordAuthEnabled,
        isPasswordAuthBypassEnabled: entity.isPasswordAuthBypassEnabled,
        isMicrosoftAuthEnabled: entity.isMicrosoftAuthEnabled,
        isMicrosoftAuthBypassEnabled: entity.isMicrosoftAuthBypassEnabled,
        isCustomDomainEnabled: entity.isCustomDomainEnabled,
        editableProfileFields: entity.editableProfileFields,
        defaultRoleId: entity.defaultRoleId,
        fastModel: entity.fastModel,
        smartModel: entity.smartModel,
        aiAdditionalInstructions: entity.aiAdditionalInstructions,
        enabledAiModelIds: entity.enabledAiModelIds,
        useRecommendedModels: entity.useRecommendedModels,
        isInternalMessagesImportEnabled: entity.isInternalMessagesImportEnabled,
        workspaceCustomApplicationId: entity.workspaceCustomApplicationId,
        routerModel: entity.routerModel,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
        deletedAt: entity.deletedAt?.toISOString(),
        suspendedAt: entity.suspendedAt?.toISOString() ?? null
    });

//# sourceMappingURL=from-workspace-entity-to-flat.util.js.map