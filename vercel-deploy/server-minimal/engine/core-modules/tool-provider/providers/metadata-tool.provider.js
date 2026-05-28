"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataToolProvider", {
    enumerable: true,
    get: function() {
        return MetadataToolProvider;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _ai = require("twenty-shared/ai");
const _executetoolfromtoolsetutil = require("../utils/execute-tool-from-tool-set.util");
const _toolsettodescriptorsutil = require("../utils/tool-set-to-descriptors.util");
const _fieldmetadatatoolsfactory = require("../../../metadata-modules/field-metadata/tools/field-metadata-tools.factory");
const _objectmetadatatoolsfactory = require("../../../metadata-modules/object-metadata/tools/object-metadata-tools.factory");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MetadataToolProvider = class MetadataToolProvider {
    async isAvailable(context) {
        return this.permissionsService.checkRolesPermissions(context.rolePermissionConfig, context.workspaceId, _constants.PermissionFlagType.DATA_MODEL);
    }
    async generateDescriptors(context, options) {
        const toolSet = this.buildToolSet(context);
        return (0, _toolsettodescriptorsutil.toolSetToDescriptors)(toolSet, _ai.ToolCategory.METADATA, {
            includeSchemas: options?.includeSchemas ?? true,
            icon: 'IconSettings'
        });
    }
    async executeStaticTool(toolName, args, context) {
        const toolSet = this.buildToolSet(context);
        return (0, _executetoolfromtoolsetutil.executeToolFromToolSet)(toolSet, toolName, args, _ai.ToolCategory.METADATA);
    }
    buildToolSet(context) {
        return {
            ...this.objectMetadataToolsFactory.generateTools(context.workspaceId),
            ...this.fieldMetadataToolsFactory.generateTools(context.workspaceId)
        };
    }
    constructor(objectMetadataToolsFactory, fieldMetadataToolsFactory, permissionsService){
        this.objectMetadataToolsFactory = objectMetadataToolsFactory;
        this.fieldMetadataToolsFactory = fieldMetadataToolsFactory;
        this.permissionsService = permissionsService;
        this.category = _ai.ToolCategory.METADATA;
    }
};
MetadataToolProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadatatoolsfactory.ObjectMetadataToolsFactory === "undefined" ? Object : _objectmetadatatoolsfactory.ObjectMetadataToolsFactory,
        typeof _fieldmetadatatoolsfactory.FieldMetadataToolsFactory === "undefined" ? Object : _fieldmetadatatoolsfactory.FieldMetadataToolsFactory,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], MetadataToolProvider);

//# sourceMappingURL=metadata-tool.provider.js.map