// hook-registry.service.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceQueryHookStorage", {
    enumerable: true,
    get: function() {
        return WorkspaceQueryHookStorage;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceQueryHookStorage = class WorkspaceQueryHookStorage {
    registerWorkspaceQueryPreHookInstance(key, data) {
        if (!this.preHookInstances.has(key)) {
            this.preHookInstances.set(key, []);
        }
        this.preHookInstances.get(key)?.push(data);
    }
    getWorkspaceQueryPreHookInstances(key) {
        const methodName = key.split('.')?.[1];
        let wildcardInstances = [];
        if (!methodName) {
            throw new Error(`Can't split workspace query hook key: ${key}`);
        }
        // Retrieve wildcard pre-hook instances
        const wildcardPrehooksInstance = this.preHookInstances.get(`*.${methodName}`);
        if ((0, _utils.isDefined)(wildcardPrehooksInstance)) {
            wildcardInstances = wildcardPrehooksInstance;
        }
        return [
            ...wildcardInstances,
            ...this.preHookInstances.get(key) ?? []
        ];
    }
    registerWorkspacePostQueryHookInstance(key, data) {
        if (!this.postHookInstances.has(key)) {
            this.postHookInstances.set(key, []);
        }
        this.postHookInstances.get(key)?.push(data);
    }
    getWorkspacePostQueryHookInstances(key) {
        const methodName = key.split('.')?.[1];
        let wildcardInstances = [];
        if (!methodName) {
            throw new Error(`Can't split workspace query hook key: ${key}`);
        }
        // Retrieve wildcard post-hook instances
        const wildcardPosthooksInstance = this.postHookInstances.get(`*.${methodName}`);
        if ((0, _utils.isDefined)(wildcardPosthooksInstance)) {
            wildcardInstances = wildcardPosthooksInstance;
        }
        const specificInstances = this.postHookInstances.get(key) ?? [];
        return [
            ...wildcardInstances,
            ...specificInstances
        ];
    }
    constructor(){
        this.preHookInstances = new Map();
        this.postHookInstances = new Map();
    }
};
WorkspaceQueryHookStorage = _ts_decorate([
    (0, _common.Injectable)()
], WorkspaceQueryHookStorage);

//# sourceMappingURL=workspace-query-hook.storage.js.map