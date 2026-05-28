"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatSkillToSkillDto", {
    enumerable: true,
    get: function() {
        return fromFlatSkillToSkillDto;
    }
});
const fromFlatSkillToSkillDto = (flatSkill)=>({
        id: flatSkill.id,
        name: flatSkill.name,
        label: flatSkill.label,
        icon: flatSkill.icon ?? undefined,
        description: flatSkill.description ?? undefined,
        content: flatSkill.content,
        isCustom: flatSkill.isCustom,
        isActive: flatSkill.isActive,
        workspaceId: flatSkill.workspaceId,
        applicationId: flatSkill.applicationId ?? undefined,
        createdAt: new Date(flatSkill.createdAt),
        updatedAt: new Date(flatSkill.updatedAt)
    });

//# sourceMappingURL=from-flat-skill-to-skill-dto.util.js.map