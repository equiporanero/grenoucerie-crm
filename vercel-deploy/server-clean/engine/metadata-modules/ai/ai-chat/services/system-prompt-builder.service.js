"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SystemPromptBuilderService", {
    enumerable: true,
    get: function() {
        return SystemPromptBuilderService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _commonpreloadtoolsconst = require("../../../../core-modules/tool-provider/constants/common-preload-tools.const");
const _ai = require("twenty-shared/ai");
const _toolregistryservice = require("../../../../core-modules/tool-provider/services/tool-registry.service");
const _tools = require("../../../../core-modules/tool-provider/tools");
const _agentactorcontextservice = require("../../ai-agent-execution/services/agent-actor-context.service");
const _chatsystempromptsconst = require("../constants/chat-system-prompts.const");
const _skillservice = require("../../../skill/skill.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
// ~4 characters per token for mixed English/code content
const estimateTokenCount = (text)=>Math.ceil(text.length / 4);
let SystemPromptBuilderService = class SystemPromptBuilderService {
    async buildPreview(workspaceId, userWorkspaceId, workspaceInstructions) {
        const { roleId, userId, userContext } = await this.agentActorContextService.buildUserAndAgentActorContext(userWorkspaceId, workspaceId);
        const toolCatalog = await this.toolRegistry.buildToolIndex(workspaceId, roleId, {
            userId,
            userWorkspaceId
        });
        const skillCatalog = await this.skillService.findAllFlatSkills(workspaceId);
        const sections = [];
        const baseContent = _chatsystempromptsconst.CHAT_SYSTEM_PROMPTS.BASE;
        sections.push({
            title: 'Base Instructions',
            content: baseContent,
            estimatedTokenCount: estimateTokenCount(baseContent)
        });
        const responseFormatContent = _chatsystempromptsconst.CHAT_SYSTEM_PROMPTS.RESPONSE_FORMAT;
        sections.push({
            title: 'Response Format',
            content: responseFormatContent,
            estimatedTokenCount: estimateTokenCount(responseFormatContent)
        });
        if (workspaceInstructions) {
            const workspaceSection = this.buildWorkspaceInstructionsSection(workspaceInstructions);
            sections.push({
                title: 'Workspace Instructions',
                content: workspaceSection,
                estimatedTokenCount: estimateTokenCount(workspaceSection)
            });
        }
        if (userContext) {
            const userSection = this.buildUserContextSection(userContext);
            sections.push({
                title: 'User Context',
                content: userSection,
                estimatedTokenCount: estimateTokenCount(userSection)
            });
        }
        const toolSection = this.buildToolCatalogSection(toolCatalog, _commonpreloadtoolsconst.COMMON_PRELOAD_TOOLS);
        sections.push({
            title: 'Tool Catalog',
            content: toolSection,
            estimatedTokenCount: estimateTokenCount(toolSection)
        });
        const skillSection = this.buildSkillCatalogSection(skillCatalog);
        if (skillSection) {
            sections.push({
                title: 'Skill Catalog',
                content: skillSection,
                estimatedTokenCount: estimateTokenCount(skillSection)
            });
        }
        const totalTokens = sections.reduce((sum, section)=>sum + section.estimatedTokenCount, 0);
        return {
            sections,
            estimatedTokenCount: totalTokens
        };
    }
    buildFullPrompt(toolCatalog, skillCatalog, preloadedTools, storedFiles, workspaceInstructions, userContext) {
        const parts = [
            _chatsystempromptsconst.CHAT_SYSTEM_PROMPTS.BASE,
            _chatsystempromptsconst.CHAT_SYSTEM_PROMPTS.BROWSING_CONTEXT_INSTRUCTION,
            _chatsystempromptsconst.CHAT_SYSTEM_PROMPTS.RESPONSE_FORMAT
        ];
        if (workspaceInstructions) {
            parts.push(this.buildWorkspaceInstructionsSection(workspaceInstructions));
        }
        if (userContext) {
            parts.push(this.buildUserContextSection(userContext));
        }
        parts.push(this.buildToolCatalogSection(toolCatalog, preloadedTools));
        parts.push(this.buildSkillCatalogSection(skillCatalog));
        if (storedFiles && storedFiles.length > 0) {
            parts.push(this.buildUploadedFilesSection(storedFiles));
        }
        return parts.join('\n');
    }
    buildWorkspaceInstructionsSection(instructions) {
        return `
## Workspace Instructions

The following are custom instructions provided by the workspace administrator:

${instructions}`;
    }
    buildUserContextSection(userContext) {
        const parts = [
            `User: ${userContext.firstName} ${userContext.lastName}`.trim(),
            `Locale: ${userContext.locale}`
        ];
        if (userContext.timezone) {
            parts.push(`Timezone: ${userContext.timezone}`);
        }
        return `
## User Context

${parts.join('\n')}`;
    }
    buildUploadedFilesSection(storedFiles) {
        const fileList = storedFiles.map((f)=>`- ${f.filename}`).join('\n');
        const filesJson = JSON.stringify(storedFiles.map((f)=>({
                filename: f.filename,
                fileId: f.fileId
            })));
        return `
## Uploaded Files

The user has uploaded the following files:
${fileList}

**IMPORTANT**: Use the \`code_interpreter\` tool to analyze these files.
When calling code_interpreter, include the files parameter with these values (use fileId to reference uploaded files):
\`\`\`json
${filesJson}
\`\`\`

In your Python code, access files at \`/home/user/{filename}\`.`;
    }
    buildSkillCatalogSection(skillCatalog) {
        if (skillCatalog.length === 0) {
            return '';
        }
        const skillsList = skillCatalog.map((skill)=>`- \`${skill.name}\`: ${skill.description ?? skill.label}`).join('\n');
        return `
## Available Skills

Skills provide detailed expertise for specialized tasks. Load a skill before attempting complex operations.
To load a skill, call \`${_tools.LOAD_SKILL_TOOL_NAME}\` with the skill name(s).

${skillsList}`;
    }
    buildToolCatalogSection(toolCatalog, preloadedTools) {
        const preloadedSet = new Set(preloadedTools);
        const toolsByCategory = new Map();
        for (const tool of toolCatalog){
            const category = tool.category;
            const existing = toolsByCategory.get(category) ?? [];
            existing.push(tool);
            toolsByCategory.set(category, existing);
        }
        const sections = [];
        const preloadedList = preloadedTools.length > 0 ? preloadedTools.map((toolName)=>`- \`${toolName}\` ✓`).join('\n') : '(none)';
        sections.push(`
## Available Tools

You have access to ${toolCatalog.length} tools. Some are pre-loaded and ready to use immediately.
To use any other tool, first call \`${_tools.LEARN_TOOLS_TOOL_NAME}\` to learn its schema, then call \`${_tools.EXECUTE_TOOL_TOOL_NAME}\` to run it.

### Pre-loaded Tools (ready to use now)
${preloadedList}

### Tool Catalog by Category`);
        const categoryOrder = Object.values(_ai.ToolCategory);
        for (const category of categoryOrder){
            const tools = toolsByCategory.get(category);
            if (!tools || tools.length === 0) {
                continue;
            }
            const categoryLabel = this.getCategoryLabel(category);
            sections.push(`
#### ${categoryLabel} (${tools.length} tools)
${tools.map((tool)=>{
                const status = preloadedSet.has(tool.name) ? ' ✓' : '';
                return `- \`${tool.name}\`${status}`;
            }).join('\n')}`);
        }
        sections.push(`
### How to Use Tools
1. **Pre-loaded tools** (marked with ✓): Use directly
2. **Other tools**: First call \`${_tools.LEARN_TOOLS_TOOL_NAME}({toolNames: ["tool_name"]})\` to learn the schema, then call \`${_tools.EXECUTE_TOOL_TOOL_NAME}({toolName: "tool_name", arguments: {...}})\` to run it`);
        return sections.join('\n');
    }
    getCategoryLabel(category) {
        switch(category){
            case _ai.ToolCategory.DATABASE_CRUD:
                return 'Database Tools (CRUD operations)';
            case _ai.ToolCategory.ACTION:
                return 'Action Tools (HTTP, Email, etc.)';
            case _ai.ToolCategory.WORKFLOW:
                return 'Workflow Tools (create/manage workflows)';
            case _ai.ToolCategory.METADATA:
                return 'Metadata Tools (schema management)';
            case _ai.ToolCategory.VIEW:
                return 'View Tools (manage views, fields, filters, and sorts)';
            case _ai.ToolCategory.DASHBOARD:
                return 'Dashboard Tools (create/manage dashboards)';
            case _ai.ToolCategory.LOGIC_FUNCTION:
                return 'Logic Functions (custom tools)';
            case _ai.ToolCategory.NAVIGATION_MENU_ITEM:
                return 'Navigation Menu Item Tools (sidebar entries, folders, and user favorites)';
            case _ai.ToolCategory.WEBHOOK:
                return 'Webhook Tools (outgoing webhooks)';
            default:
                return (0, _utils.assertUnreachable)(category);
        }
    }
    constructor(toolRegistry, skillService, agentActorContextService){
        this.toolRegistry = toolRegistry;
        this.skillService = skillService;
        this.agentActorContextService = agentActorContextService;
    }
};
SystemPromptBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _toolregistryservice.ToolRegistryService === "undefined" ? Object : _toolregistryservice.ToolRegistryService,
        typeof _skillservice.SkillService === "undefined" ? Object : _skillservice.SkillService,
        typeof _agentactorcontextservice.AgentActorContextService === "undefined" ? Object : _agentactorcontextservice.AgentActorContextService
    ])
], SystemPromptBuilderService);

//# sourceMappingURL=system-prompt-builder.service.js.map