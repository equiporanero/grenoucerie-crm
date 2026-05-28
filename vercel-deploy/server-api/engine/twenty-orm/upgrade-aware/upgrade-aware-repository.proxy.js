"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "wrapRepositoryWithUpgradeAwareProxy", {
    enumerable: true,
    get: function() {
        return wrapRepositoryWithUpgradeAwareProxy;
    }
});
const _common = require("@nestjs/common");
const _EntityNotFoundError = require("typeorm/error/EntityNotFoundError");
const _utils = require("twenty-shared/utils");
const _upgradeunavailableentitywriteexception = require("./exceptions/upgrade-unavailable-entity-write.exception");
const logger = new _common.Logger('UpgradeAwareRepositoryProxy');
const REPOSITORY_METHOD_BEHAVIORS = new Map([
    [
        'find',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve([])
        }
    ],
    [
        'findBy',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve([])
        }
    ],
    [
        'findAndCount',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve([
                    [],
                    0
                ])
        }
    ],
    [
        'findAndCountBy',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve([
                    [],
                    0
                ])
        }
    ],
    [
        'findOne',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve(null)
        }
    ],
    [
        'findOneBy',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve(null)
        }
    ],
    [
        'findOneOrFail',
        {
            kind: 'short-circuit-read',
            produceEmpty: (entityClass)=>Promise.reject(new _EntityNotFoundError.EntityNotFoundError(entityClass, undefined))
        }
    ],
    [
        'findOneByOrFail',
        {
            kind: 'short-circuit-read',
            produceEmpty: (entityClass)=>Promise.reject(new _EntityNotFoundError.EntityNotFoundError(entityClass, undefined))
        }
    ],
    [
        'count',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve(0)
        }
    ],
    [
        'countBy',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve(0)
        }
    ],
    [
        'exists',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve(false)
        }
    ],
    [
        'existsBy',
        {
            kind: 'short-circuit-read',
            produceEmpty: ()=>Promise.resolve(false)
        }
    ],
    [
        'save',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'insert',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'update',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'delete',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'remove',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'softRemove',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'recover',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'upsert',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'increment',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'decrement',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'restore',
        {
            kind: 'throw-on-unavailable-write'
        }
    ],
    [
        'softDelete',
        {
            kind: 'throw-on-unavailable-write'
        }
    ]
]);
const METHODS_THAT_ACCEPT_FIND_OPTIONS = new Set([
    'find',
    'findBy',
    'findAndCount',
    'findAndCountBy',
    'findOne',
    'findOneBy',
    'findOneOrFail',
    'findOneByOrFail',
    'count',
    'countBy',
    'exists',
    'existsBy'
]);
const stripUnavailableRelations = (metadata, state, options)=>{
    if (!(0, _utils.isDefined)(options) || typeof options !== 'object') {
        return options;
    }
    const withRelations = options;
    if (!(0, _utils.isDefined)(withRelations.relations)) {
        return options;
    }
    if (Array.isArray(withRelations.relations)) {
        const filtered = withRelations.relations.filter((name)=>isRelationAvailable(metadata, state, name));
        if (filtered.length === withRelations.relations.length) {
            return options;
        }
        return {
            ...withRelations,
            relations: filtered
        };
    }
    if (typeof withRelations.relations === 'object') {
        const filtered = {};
        for (const [name, value] of Object.entries(withRelations.relations)){
            if (isRelationAvailable(metadata, state, name)) {
                filtered[name] = value;
            }
        }
        return {
            ...withRelations,
            relations: filtered
        };
    }
    return options;
};
const isRelationAvailable = (metadata, state, relationPropertyName)=>{
    const relation = metadata.relations.find((candidate)=>candidate.propertyName === relationPropertyName);
    if (!(0, _utils.isDefined)(relation)) {
        return true;
    }
    const relatedTarget = relation.inverseEntityMetadata?.target;
    if (typeof relatedTarget !== 'function') {
        return true;
    }
    const available = state.isEntityAvailable(relatedTarget);
    if (!available) {
        logger.log(`[upgrade-proxy] strip relation ${metadata.targetName}.${relationPropertyName} -> ${relatedTarget.name}`);
    }
    return available;
};
const isClassConstructor = (fn)=>typeof fn.prototype === 'object' && fn.prototype !== null && fn.prototype.constructor === fn && fn.toString().startsWith('class ');
const wrapRepositoryWithUpgradeAwareProxy = ({ repository, entityClass, state })=>new Proxy(repository, {
        get (target, prop, receiver) {
            const methodName = typeof prop === 'string' ? prop : undefined;
            const behavior = (0, _utils.isDefined)(methodName) ? REPOSITORY_METHOD_BEHAVIORS.get(methodName) : undefined;
            if ((0, _utils.isDefined)(methodName) && (0, _utils.isDefined)(behavior)) {
                return (...args)=>handleRepositoryMethodCall({
                        target,
                        methodName,
                        entityClass,
                        state,
                        behavior,
                        args
                    });
            }
            const value = Reflect.get(target, prop, receiver);
            if (typeof value === 'function' && !isClassConstructor(value)) {
                return value.bind(target);
            }
            return value;
        }
    });
const handleRepositoryMethodCall = ({ target, methodName, entityClass, state, behavior, args })=>{
    if (!state.isEntityAvailable(entityClass)) {
        if (behavior.kind === 'throw-on-unavailable-write') {
            return Promise.reject(new _upgradeunavailableentitywriteexception.UpgradeUnavailableEntityWriteException(entityClass.name, methodName));
        }
        logger.log(`[upgrade-proxy] short-circuit ${entityClass.name}.${methodName}`);
        return behavior.produceEmpty(entityClass);
    }
    const rewrittenArgs = METHODS_THAT_ACCEPT_FIND_OPTIONS.has(methodName) && args.length > 0 ? [
        stripUnavailableRelations(target.metadata, state, args[0]),
        ...args.slice(1)
    ] : args;
    return target[methodName].apply(target, rewrittenArgs);
};

//# sourceMappingURL=upgrade-aware-repository.proxy.js.map