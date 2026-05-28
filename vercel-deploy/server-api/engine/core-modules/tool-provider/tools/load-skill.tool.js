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
    get LOAD_SKILL_TOOL_NAME () {
        return LOAD_SKILL_TOOL_NAME;
    },
    get createLoadSkillTool () {
        return createLoadSkillTool;
    },
    get loadSkillInputSchema () {
        return loadSkillInputSchema;
    }
});
const _zod = require("zod");
const LOAD_SKILL_TOOL_NAME = 'load_skills';
const loadSkillInputSchema = _zod.z.object({
    skillNames: _zod.z.array(_zod.z.string()).describe('Names of the skills to load (e.g., ["workflow-building", "data-manipulation"])')
});
const createLoadSkillTool = (loadSkills, listAvailableSkillNames)=>({
        description: 'Load specialized skills for complex tasks. Returns detailed step-by-step instructions for building workflows, dashboards, manipulating data, or managing metadata. Call this before attempting complex operations.',
        inputSchema: loadSkillInputSchema,
        execute: async (parameters)=>{
            const { skillNames } = parameters;
            const skills = await loadSkills(skillNames);
            if (skills.length === 0) {
                const availableNames = await listAvailableSkillNames();
                const availableMessage = availableNames.length > 0 ? `Available skills: ${availableNames.join(', ')}.` : 'No skills are currently available in this workspace.';
                return {
                    skills: [],
                    message: `No skills found with names: ${skillNames.join(', ')}. ${availableMessage}`
                };
            }
            return {
                skills: skills.map((skill)=>({
                        name: skill.name,
                        label: skill.label,
                        content: skill.content
                    })),
                message: `Loaded ${skills.map((skill)=>skill.label).join(', ')}`
            };
        }
    });

//# sourceMappingURL=load-skill.tool.js.map