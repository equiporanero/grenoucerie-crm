"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "installUpgradeAwareRepositoryProxy", {
    enumerable: true,
    get: function() {
        return installUpgradeAwareRepositoryProxy;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _upgradeawarerepositorystate = require("./upgrade-aware-repository-state");
const _upgradeawarerepositoryproxy = require("./upgrade-aware-repository.proxy");
const logger = new _common.Logger('InstallUpgradeAwareRepositoryProxy');
const wrappedRepositoryCache = new WeakMap();
const installUpgradeAwareRepositoryProxy = (dataSource)=>{
    const state = _upgradeawarerepositorystate.UpgradeAwareRepositoryState.getInstance();
    const wrapIfNeeded = (target, repository)=>{
        const entityClass = resolveEntityClass(target);
        if (!(0, _utils.isDefined)(entityClass)) {
            return repository;
        }
        const cached = wrappedRepositoryCache.get(repository);
        if ((0, _utils.isDefined)(cached)) {
            return cached;
        }
        const wrapped = (0, _upgradeawarerepositoryproxy.wrapRepositoryWithUpgradeAwareProxy)({
            repository,
            entityClass,
            state
        });
        wrappedRepositoryCache.set(repository, wrapped);
        return wrapped;
    };
    const originalDataSourceGetRepository = dataSource.getRepository.bind(dataSource);
    dataSource.getRepository = function getRepositoryWithUpgradeAwareProxy(target) {
        return wrapIfNeeded(target, originalDataSourceGetRepository(target));
    };
    const entityManagerPrototype = Object.getPrototypeOf(dataSource.manager);
    const originalEntityManagerGetRepository = entityManagerPrototype.getRepository;
    entityManagerPrototype.getRepository = function getRepositoryWithUpgradeAwareProxy(target) {
        const repository = originalEntityManagerGetRepository.call(this, target);
        if (this.connection !== dataSource) {
            return repository;
        }
        return wrapIfNeeded(target, repository);
    };
    logger.log('[upgrade-proxy] installed getRepository proxy on core DataSource and EntityManager.prototype');
};
const resolveEntityClass = (target)=>{
    if (typeof target === 'function') {
        return target;
    }
    return undefined;
};

//# sourceMappingURL=install-upgrade-aware-repository-proxy.js.map