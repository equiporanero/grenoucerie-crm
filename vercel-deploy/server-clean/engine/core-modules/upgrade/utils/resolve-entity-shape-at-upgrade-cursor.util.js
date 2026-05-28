"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveEntityShapeAtUpgradeCursor", {
    enumerable: true,
    get: function() {
        return resolveEntityShapeAtUpgradeCursor;
    }
});
const _utils = require("twenty-shared/utils");
const _wasintroducedinupgradedecorator = require("../decorators/was-introduced-in-upgrade.decorator");
const _wasremovedinupgradedecorator = require("../decorators/was-removed-in-upgrade.decorator");
const _wasrenamedinupgradedecorator = require("../decorators/was-renamed-in-upgrade.decorator");
const _resolveeffectivenamefromrenamehistoryutil = require("./resolve-effective-name-from-rename-history.util");
const resolveEntityShapeAtUpgradeCursor = ({ entityClass, currentTableName, currentColumns, isStepApplied })=>{
    const classIntroduced = (0, _wasintroducedinupgradedecorator.getWasIntroducedInUpgradeClassMetadata)(entityClass);
    const isAvailable = !(0, _utils.isDefined)(classIntroduced) || isStepApplied(classIntroduced.upgradeCommandName);
    const classRenameHistory = (0, _wasrenamedinupgradedecorator.getWasRenamedInUpgradeClassMetadata)(entityClass) ?? [];
    const effectiveTableName = (0, _resolveeffectivenamefromrenamehistoryutil.resolveEffectiveNameFromRenameHistory)({
        currentName: currentTableName,
        history: classRenameHistory,
        isStepApplied
    });
    const propertyIntroductionMap = (0, _wasintroducedinupgradedecorator.getWasIntroducedInUpgradePropertyMetadata)(entityClass);
    const propertyRemovalMap = (0, _wasremovedinupgradedecorator.getWasRemovedInUpgradePropertyMetadata)(entityClass);
    const propertyRenameMap = (0, _wasrenamedinupgradedecorator.getWasRenamedInUpgradePropertyMetadata)(entityClass);
    const hiddenPropertyNames = new Set();
    const columnDatabaseNameRemap = new Map();
    for (const column of currentColumns){
        const introduced = propertyIntroductionMap[column.propertyName];
        if ((0, _utils.isDefined)(introduced) && !isStepApplied(introduced.upgradeCommandName)) {
            hiddenPropertyNames.add(column.propertyName);
            continue;
        }
        const removed = propertyRemovalMap[column.propertyName];
        if ((0, _utils.isDefined)(removed) && isStepApplied(removed.upgradeCommandName)) {
            hiddenPropertyNames.add(column.propertyName);
            continue;
        }
        const renameHistory = propertyRenameMap[column.propertyName] ?? [];
        if (renameHistory.length === 0) {
            continue;
        }
        const effectiveColumnName = (0, _resolveeffectivenamefromrenamehistoryutil.resolveEffectiveNameFromRenameHistory)({
            currentName: column.databaseName,
            history: renameHistory,
            isStepApplied
        });
        if (effectiveColumnName !== column.databaseName) {
            columnDatabaseNameRemap.set(column.propertyName, effectiveColumnName);
        }
    }
    return {
        isAvailable,
        effectiveTableName,
        hiddenPropertyNames,
        columnDatabaseNameRemap
    };
};

//# sourceMappingURL=resolve-entity-shape-at-upgrade-cursor.util.js.map