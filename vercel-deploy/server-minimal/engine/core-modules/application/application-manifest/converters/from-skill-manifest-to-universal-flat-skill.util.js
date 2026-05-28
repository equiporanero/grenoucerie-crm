"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromSkillManifestToUniversalFlatSkill", {
    enumerable: true,
    get: function() {
        return fromSkillManifestToUniversalFlatSkill;
    }
});
const fromSkillManifestToUniversalFlatSkill = ({ skillManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: skillManifest.universalIdentifier,
        applicationUniversalIdentifier,
        name: skillManifest.name,
        label: skillManifest.label,
        icon: skillManifest.icon ?? null,
        description: skillManifest.description ?? null,
        content: skillManifest.content,
        isCustom: false,
        isActive: true,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-skill-manifest-to-universal-flat-skill.util.js.map