"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeUnavailableEntityWriteException", {
    enumerable: true,
    get: function() {
        return UpgradeUnavailableEntityWriteException;
    }
});
let UpgradeUnavailableEntityWriteException = class UpgradeUnavailableEntityWriteException extends Error {
    constructor(entityName, method){
        super(`Cannot ${method} on ${entityName}: this entity is decorated with ` + `@WasIntroducedInUpgrade and the introducing command has not been ` + `applied at the current upgrade position. Run the upgrade further ` + `before writing to it, or move the write later in the sequence.`);
        this.name = 'UpgradeUnavailableEntityWriteException';
    }
};

//# sourceMappingURL=upgrade-unavailable-entity-write.exception.js.map