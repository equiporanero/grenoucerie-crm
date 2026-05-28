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
    get workspaceResolverBuilderFactories () {
        return workspaceResolverBuilderFactories;
    },
    get workspaceResolverBuilderMethodNames () {
        return workspaceResolverBuilderMethodNames;
    }
});
const _destroymanyresolverfactory = require("./destroy-many-resolver.factory");
const _destroyoneresolverfactory = require("./destroy-one-resolver.factory");
const _groupbyresolverfactory = require("./group-by-resolver.factory");
const _restoremanyresolverfactory = require("./restore-many-resolver.factory");
const _restoreoneresolverfactory = require("./restore-one-resolver.factory");
const _updatemanyresolverfactory = require("./update-many-resolver.factory");
const _createmanyresolverfactory = require("./create-many-resolver.factory");
const _createoneresolverfactory = require("./create-one-resolver.factory");
const _deletemanyresolverfactory = require("./delete-many-resolver.factory");
const _deleteoneresolverfactory = require("./delete-one-resolver.factory");
const _findduplicatesresolverfactory = require("./find-duplicates-resolver.factory");
const _findmanyresolverfactory = require("./find-many-resolver.factory");
const _findoneresolverfactory = require("./find-one-resolver.factory");
const _mergemanyresolverfactory = require("./merge-many-resolver.factory");
const _updateoneresolverfactory = require("./update-one-resolver.factory");
const workspaceResolverBuilderFactories = [
    _findmanyresolverfactory.FindManyResolverFactory,
    _findoneresolverfactory.FindOneResolverFactory,
    _findduplicatesresolverfactory.FindDuplicatesResolverFactory,
    _createmanyresolverfactory.CreateManyResolverFactory,
    _createoneresolverfactory.CreateOneResolverFactory,
    _updateoneresolverfactory.UpdateOneResolverFactory,
    _deleteoneresolverfactory.DeleteOneResolverFactory,
    _updatemanyresolverfactory.UpdateManyResolverFactory,
    _deletemanyresolverfactory.DeleteManyResolverFactory,
    _destroyoneresolverfactory.DestroyOneResolverFactory,
    _destroymanyresolverfactory.DestroyManyResolverFactory,
    _restoreoneresolverfactory.RestoreOneResolverFactory,
    _restoremanyresolverfactory.RestoreManyResolverFactory,
    _mergemanyresolverfactory.MergeManyResolverFactory,
    _groupbyresolverfactory.GroupByResolverFactory
];
const workspaceResolverBuilderMethodNames = {
    queries: [
        _findmanyresolverfactory.FindManyResolverFactory.methodName,
        _findoneresolverfactory.FindOneResolverFactory.methodName,
        _findduplicatesresolverfactory.FindDuplicatesResolverFactory.methodName,
        _groupbyresolverfactory.GroupByResolverFactory.methodName
    ],
    mutations: [
        _createmanyresolverfactory.CreateManyResolverFactory.methodName,
        _createoneresolverfactory.CreateOneResolverFactory.methodName,
        _updateoneresolverfactory.UpdateOneResolverFactory.methodName,
        _deleteoneresolverfactory.DeleteOneResolverFactory.methodName,
        _updatemanyresolverfactory.UpdateManyResolverFactory.methodName,
        _deletemanyresolverfactory.DeleteManyResolverFactory.methodName,
        _destroyoneresolverfactory.DestroyOneResolverFactory.methodName,
        _destroymanyresolverfactory.DestroyManyResolverFactory.methodName,
        _restoreoneresolverfactory.RestoreOneResolverFactory.methodName,
        _restoremanyresolverfactory.RestoreManyResolverFactory.methodName,
        _mergemanyresolverfactory.MergeManyResolverFactory.methodName
    ]
};

//# sourceMappingURL=factories.js.map