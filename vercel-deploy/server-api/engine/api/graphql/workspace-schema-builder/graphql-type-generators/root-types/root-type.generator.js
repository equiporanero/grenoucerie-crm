"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RootTypeGenerator", {
    enumerable: true,
    get: function() {
        return RootTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _workspaceresolverbuilderservice = require("../../../workspace-resolver-builder/workspace-resolver-builder.service");
const _objecttypedefinitionkindenum = require("../../enums/object-type-definition-kind.enum");
const _argstypegenerator = require("../args-type/args-type.generator");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _applytypeoptionsforoutputtypeutil = require("../../utils/apply-type-options-for-output-type.util");
const _computeobjectmetadataobjecttypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-object-type-key.util");
const _getresolverargsutil = require("../../utils/get-resolver-args.util");
const _getresolvernameutil = require("../../../../../utils/get-resolver-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RootTypeGenerator = class RootTypeGenerator {
    buildAndStore(context, workspaceResolverMethodNames, objectTypeName) {
        if (workspaceResolverMethodNames.length === 0) {
            this.logger.error(`No resolver methods were found for ${objectTypeName.toString()}`, {
                workspaceResolverMethodNames,
                objectTypeName
            });
            throw new Error(`No resolvers were found for ${objectTypeName.toString()}`);
        }
        const objectMetadataCollection = Object.values(context.flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined);
        this.gqlTypesStorage.addGqlType(objectTypeName, new _graphql.GraphQLObjectType({
            name: objectTypeName.toString(),
            fields: this.generateFields(objectMetadataCollection, workspaceResolverMethodNames)
        }));
    }
    generateFields(objectMetadataCollection, workspaceResolverMethodNames) {
        const fieldConfigMap = {};
        for (const objectMetadata of objectMetadataCollection){
            for (const methodName of workspaceResolverMethodNames){
                if (this.workspaceResolverBuilderService.shouldBuildResolver(objectMetadata, methodName)) {
                    const name = (0, _getresolvernameutil.getResolverName)(objectMetadata, methodName);
                    const args = (0, _getresolverargsutil.getResolverArgs)(methodName);
                    const key = (0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(objectMetadata.nameSingular, this.getObjectTypeDefinitionKindByMethodName(methodName));
                    const objectType = this.gqlTypesStorage.getGqlTypeByKey(key);
                    const argsType = this.argsTypeGenerator.generate({
                        args,
                        objectMetadataSingularName: objectMetadata.nameSingular
                    });
                    if (!(0, _utils.isDefined)(objectType) || !(0, _graphql.isObjectType)(objectType)) {
                        this.logger.error(`Could not find a GraphQL type for ${objectMetadata.id} for method ${methodName}`, {
                            objectMetadata,
                            methodName
                        });
                        throw new Error(`Could not find a GraphQL type for ${objectMetadata.id} for method ${methodName}`);
                    }
                    const isMethodReturningArrayObjectType = [
                        'updateMany',
                        'deleteMany',
                        'createMany',
                        'findDuplicates',
                        'restoreMany',
                        'destroyMany',
                        'groupBy'
                    ];
                    const outputType = (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(objectType, {
                        isArray: isMethodReturningArrayObjectType.includes(methodName)
                    });
                    fieldConfigMap[name] = {
                        type: outputType,
                        args: argsType,
                        resolve: undefined
                    };
                }
            }
        }
        return fieldConfigMap;
    }
    getObjectTypeDefinitionKindByMethodName(methodName) {
        switch(methodName){
            case 'findMany':
            case 'findDuplicates':
                return _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Connection;
            case 'groupBy':
                return _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.GroupByConnection;
            default:
                return _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain;
        }
    }
    constructor(gqlTypesStorage, argsTypeGenerator, workspaceResolverBuilderService){
        this.gqlTypesStorage = gqlTypesStorage;
        this.argsTypeGenerator = argsTypeGenerator;
        this.workspaceResolverBuilderService = workspaceResolverBuilderService;
        this.logger = new _common.Logger(RootTypeGenerator.name);
    }
};
RootTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _argstypegenerator.ArgsTypeGenerator === "undefined" ? Object : _argstypegenerator.ArgsTypeGenerator,
        typeof _workspaceresolverbuilderservice.WorkspaceResolverBuilderService === "undefined" ? Object : _workspaceresolverbuilderservice.WorkspaceResolverBuilderService
    ])
], RootTypeGenerator);

//# sourceMappingURL=root-type.generator.js.map