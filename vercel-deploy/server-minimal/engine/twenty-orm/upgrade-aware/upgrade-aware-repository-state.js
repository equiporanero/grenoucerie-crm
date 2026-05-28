"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeAwareRepositoryState", {
    enumerable: true,
    get: function() {
        return UpgradeAwareRepositoryState;
    }
});
const _utils = require("twenty-shared/utils");
let UpgradeAwareRepositoryState = class UpgradeAwareRepositoryState {
    static getInstance() {
        if (!(0, _utils.isDefined)(this.singleton)) {
            this.singleton = new UpgradeAwareRepositoryState();
        }
        return this.singleton;
    }
    setMetadataService(service) {
        this.metadataService = service;
    }
    isEntityAvailable(entityClass) {
        if (!(0, _utils.isDefined)(this.metadataService)) {
            return true;
        }
        return this.metadataService.isEntityAvailable(entityClass);
    }
    getHiddenColumnPropertyNames(entityClass) {
        if (!(0, _utils.isDefined)(this.metadataService)) {
            return new Set();
        }
        return this.metadataService.getHiddenColumnPropertyNames(entityClass);
    }
};

//# sourceMappingURL=upgrade-aware-repository-state.js.map