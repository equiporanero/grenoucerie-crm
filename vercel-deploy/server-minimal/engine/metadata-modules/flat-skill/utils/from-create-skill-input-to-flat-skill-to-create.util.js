"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateSkillInputToUniversalFlatSkillToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateSkillInputToUniversalFlatSkillToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const fromCreateSkillInputToUniversalFlatSkillToCreate = ({ createSkillInput, flatApplication })=>{
    const now = new Date().toISOString();
    const { name, label, icon, description } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(createSkillInput, [
        'name',
        'label',
        'icon',
        'description'
    ]);
    // Content is markdown - only trim, don't collapse whitespace (preserve newlines)
    const content = createSkillInput.content.trim();
    const id = createSkillInput.id ?? (0, _uuid.v4)();
    return {
        id,
        universalIdentifier: (0, _uuid.v4)(),
        name,
        label,
        icon: icon ?? null,
        description: description ?? null,
        content,
        isCustom: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-skill-input-to-flat-skill-to-create.util.js.map