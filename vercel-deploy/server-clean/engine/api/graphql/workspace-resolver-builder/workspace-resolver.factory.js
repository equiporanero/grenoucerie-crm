"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceResolverFactory", {
    enumerable: true,
    get: function() {
        return WorkspaceResolverFactory;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _deletemanyresolverfactory = require("./factories/delete-many-resolver.factory");
const _destroymanyresolverfactory = require("./factories/destroy-many-resolver.factory");
const _destroyoneresolverfactory = require("./factories/destroy-one-resolver.factory");
const _groupbyresolverfactory = require("./factories/group-by-resolver.factory");
const _mergemanyresolverfactory = require("./factories/merge-many-resolver.factory");
const _restoremanyresolverfactory = require("./factories/restore-many-resolver.factory");
const _restoreoneresolverfactory = require("./factories/restore-one-resolver.factory");
const _updatemanyresolverfactory = require("./factories/update-many-resolver.factory");
const _workspaceresolverbuilderservice = require("./workspace-resolver-builder.service");
const _getresolvernameutil = require("../../../utils/get-resolver-name.util");
const _createmanyresolverfactory = require("./factories/create-many-resolver.factory");
const _createoneresolverfactory = require("./factories/create-one-resolver.factory");
const _deleteoneresolverfactory = require("./factories/delete-one-resolver.factory");
const _findduplicatesresolverfactory = require("./factories/find-duplicates-resolver.factory");
const _findmanyresolverfactory = require("./factories/find-many-resolver.factory");
const _findoneresolverfactory = require("./factories/find-one-resolver.factory");
const _updateoneresolverfactory = require("./factories/update-one-resolver.factory");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceResolverFactory = class WorkspaceResolverFactory {
    async create(flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular, workspaceResolverBuilderMethods) {
        const factories = new Map([
            [
                'createMany',
                this.createManyResolverFactory
            ],
            [
                'createOne',
                this.createOneResolverFactory
            ],
            [
                'deleteMany',
                this.deleteManyResolverFactory
            ],
            [
                'deleteOne',
                this.deleteOneResolverFactory
            ],
            [
                'destroyMany',
                this.destroyManyResolverFactory
            ],
            [
                'destroyOne',
                this.destroyOneResolverFactory
            ],
            [
                'findDuplicates',
                this.findDuplicatesResolverFactory
            ],
            [
                'findMany',
                this.findManyResolverFactory
            ],
            [
                'findOne',
                this.findOneResolverFactory
            ],
            [
                'mergeMany',
                this.mergeManyResolverFactory
            ],
            [
                'restoreMany',
                this.restoreManyResolverFactory
            ],
            [
                'restoreOne',
                this.restoreOneResolverFactory
            ],
            [
                'updateMany',
                this.updateManyResolverFactory
            ],
            [
                'updateOne',
                this.updateOneResolverFactory
            ],
            [
                'groupBy',
                this.groupByResolverFactory
            ]
        ]);
        const resolvers = {
            Query: {},
            Mutation: {}
        };
        for (const flatObjectMetadata of Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined)){
            // Generate query resolvers
            for (const methodName of workspaceResolverBuilderMethods.queries){
                const resolverName = (0, _getresolvernameutil.getResolverName)(flatObjectMetadata, methodName);
                const resolverFactory = factories.get(methodName);
                if (!resolverFactory) {
                    this.logger.error(`Unknown query resolver type: ${methodName}`, {
                        flatObjectMetadata,
                        methodName,
                        resolverName
                    });
                    throw new Error(`Unknown query resolver type: ${methodName}`);
                }
                if (this.workspaceResolverBuilderService.shouldBuildResolver(flatObjectMetadata, methodName)) {
                    // @ts-expect-error legacy noImplicitAny
                    resolvers.Query[resolverName] = resolverFactory.create({
                        flatObjectMetadata,
                        flatObjectMetadataMaps,
                        flatFieldMetadataMaps,
                        objectIdByNameSingular
                    });
                }
            }
            // Generate mutation resolvers
            for (const methodName of workspaceResolverBuilderMethods.mutations){
                const resolverName = (0, _getresolvernameutil.getResolverName)(flatObjectMetadata, methodName);
                const resolverFactory = factories.get(methodName);
                if (!resolverFactory) {
                    this.logger.error(`Unknown mutation resolver type: ${methodName}`, {
                        flatObjectMetadata,
                        methodName,
                        resolverName
                    });
                    throw new Error(`Unknown mutation resolver type: ${methodName}`);
                }
                if (this.workspaceResolverBuilderService.shouldBuildResolver(flatObjectMetadata, methodName)) {
                    // @ts-expect-error legacy noImplicitAny
                    resolvers.Mutation[resolverName] = resolverFactory.create({
                        flatObjectMetadata,
                        flatObjectMetadataMaps,
                        flatFieldMetadataMaps,
                        objectIdByNameSingular
                    });
                }
            }
        }
        return resolvers;
    }
    constructor(findManyResolverFactory, findOneResolverFactory, findDuplicatesResolverFactory, createManyResolverFactory, createOneResolverFactory, updateOneResolverFactory, deleteOneResolverFactory, destroyOneResolverFactory, updateManyResolverFactory, deleteManyResolverFactory, restoreOneResolverFactory, restoreManyResolverFactory, destroyManyResolverFactory, mergeManyResolverFactory, groupByResolverFactory, workspaceResolverBuilderService){
        this.findManyResolverFactory = findManyResolverFactory;
        this.findOneResolverFactory = findOneResolverFactory;
        this.findDuplicatesResolverFactory = findDuplicatesResolverFactory;
        this.createManyResolverFactory = createManyResolverFactory;
        this.createOneResolverFactory = createOneResolverFactory;
        this.updateOneResolverFactory = updateOneResolverFactory;
        this.deleteOneResolverFactory = deleteOneResolverFactory;
        this.destroyOneResolverFactory = destroyOneResolverFactory;
        this.updateManyResolverFactory = updateManyResolverFactory;
        this.deleteManyResolverFactory = deleteManyResolverFactory;
        this.restoreOneResolverFactory = restoreOneResolverFactory;
        this.restoreManyResolverFactory = restoreManyResolverFactory;
        this.destroyManyResolverFactory = destroyManyResolverFactory;
        this.mergeManyResolverFactory = mergeManyResolverFactory;
        this.groupByResolverFactory = groupByResolverFactory;
        this.workspaceResolverBuilderService = workspaceResolverBuilderService;
        this.logger = new _common.Logger(WorkspaceResolverFactory.name);
    }
};
WorkspaceResolverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _findmanyresolverfactory.FindManyResolverFactory === "undefined" ? Object : _findmanyresolverfactory.FindManyResolverFactory,
        typeof _findoneresolverfactory.FindOneResolverFactory === "undefined" ? Object : _findoneresolverfactory.FindOneResolverFactory,
        typeof _findduplicatesresolverfactory.FindDuplicatesResolverFactory === "undefined" ? Object : _findduplicatesresolverfactory.FindDuplicatesResolverFactory,
        typeof _createmanyresolverfactory.CreateManyResolverFactory === "undefined" ? Object : _createmanyresolverfactory.CreateManyResolverFactory,
        typeof _createoneresolverfactory.CreateOneResolverFactory === "undefined" ? Object : _createoneresolverfactory.CreateOneResolverFactory,
        typeof _updateoneresolverfactory.UpdateOneResolverFactory === "undefined" ? Object : _updateoneresolverfactory.UpdateOneResolverFactory,
        typeof _deleteoneresolverfactory.DeleteOneResolverFactory === "undefined" ? Object : _deleteoneresolverfactory.DeleteOneResolverFactory,
        typeof _destroyoneresolverfactory.DestroyOneResolverFactory === "undefined" ? Object : _destroyoneresolverfactory.DestroyOneResolverFactory,
        typeof _updatemanyresolverfactory.UpdateManyResolverFactory === "undefined" ? Object : _updatemanyresolverfactory.UpdateManyResolverFactory,
        typeof _deletemanyresolverfactory.DeleteManyResolverFactory === "undefined" ? Object : _deletemanyresolverfactory.DeleteManyResolverFactory,
        typeof _restoreoneresolverfactory.RestoreOneResolverFactory === "undefined" ? Object : _restoreoneresolverfactory.RestoreOneResolverFactory,
        typeof _restoremanyresolverfactory.RestoreManyResolverFactory === "undefined" ? Object : _restoremanyresolverfactory.RestoreManyResolverFactory,
        typeof _destroymanyresolverfactory.DestroyManyResolverFactory === "undefined" ? Object : _destroymanyresolverfactory.DestroyManyResolverFactory,
        typeof _mergemanyresolverfactory.MergeManyResolverFactory === "undefined" ? Object : _mergemanyresolverfactory.MergeManyResolverFactory,
        typeof _groupbyresolverfactory.GroupByResolverFactory === "undefined" ? Object : _groupbyresolverfactory.GroupByResolverFactory,
        typeof _workspaceresolverbuilderservice.WorkspaceResolverBuilderService === "undefined" ? Object : _workspaceresolverbuilderservice.WorkspaceResolverBuilderService
    ])
], WorkspaceResolverFactory);

//# sourceMappingURL=workspace-resolver.factory.js.map