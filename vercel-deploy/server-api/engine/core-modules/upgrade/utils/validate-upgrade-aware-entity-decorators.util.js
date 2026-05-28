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
    get formatUpgradeAwareDecoratorReferenceProblems () {
        return formatUpgradeAwareDecoratorReferenceProblems;
    },
    get validateUpgradeAwareEntityDecorators () {
        return validateUpgradeAwareEntityDecorators;
    }
});
const _utils = require("twenty-shared/utils");
const _wasintroducedinupgradedecorator = require("../decorators/was-introduced-in-upgrade.decorator");
const _wasremovedinupgradedecorator = require("../decorators/was-removed-in-upgrade.decorator");
const _wasrenamedinupgradedecorator = require("../decorators/was-renamed-in-upgrade.decorator");
const validateUpgradeAwareEntityDecorators = ({ entityClasses, stepNameToIndex })=>{
    const problems = [];
    for (const entityClass of entityClasses){
        const entityName = entityClass.name;
        const classIntroduced = (0, _wasintroducedinupgradedecorator.getWasIntroducedInUpgradeClassMetadata)(entityClass);
        if ((0, _utils.isDefined)(classIntroduced) && !stepNameToIndex.has(classIntroduced.upgradeCommandName)) {
            problems.push({
                kind: 'unknown-step-name',
                entityName,
                decorator: '@WasIntroducedInUpgrade',
                scope: 'class',
                upgradeCommandName: classIntroduced.upgradeCommandName
            });
        }
        const classRemoved = (0, _wasremovedinupgradedecorator.getWasRemovedInUpgradeClassMetadata)(entityClass);
        if ((0, _utils.isDefined)(classRemoved) && !stepNameToIndex.has(classRemoved.upgradeCommandName)) {
            problems.push({
                kind: 'unknown-step-name',
                entityName,
                decorator: '@WasRemovedInUpgrade',
                scope: 'class',
                upgradeCommandName: classRemoved.upgradeCommandName
            });
        }
        checkRemovalAfterIntroduction({
            entityName,
            scope: 'class',
            introduced: classIntroduced,
            removed: classRemoved,
            stepNameToIndex,
            problems
        });
        const classRenameHistory = (0, _wasrenamedinupgradedecorator.getWasRenamedInUpgradeClassMetadata)(entityClass) ?? [];
        checkHistoryForReferenceAndOrder({
            entityName,
            scope: 'class',
            history: classRenameHistory,
            stepNameToIndex,
            problems
        });
        const propIntroducedMap = (0, _wasintroducedinupgradedecorator.getWasIntroducedInUpgradePropertyMetadata)(entityClass);
        for (const [propertyName, options] of Object.entries(propIntroducedMap)){
            if (!stepNameToIndex.has(options.upgradeCommandName)) {
                problems.push({
                    kind: 'unknown-step-name',
                    entityName,
                    decorator: '@WasIntroducedInUpgrade',
                    scope: `property:${propertyName}`,
                    upgradeCommandName: options.upgradeCommandName
                });
            }
        }
        const propRemovedMap = (0, _wasremovedinupgradedecorator.getWasRemovedInUpgradePropertyMetadata)(entityClass);
        for (const [propertyName, options] of Object.entries(propRemovedMap)){
            if (!stepNameToIndex.has(options.upgradeCommandName)) {
                problems.push({
                    kind: 'unknown-step-name',
                    entityName,
                    decorator: '@WasRemovedInUpgrade',
                    scope: `property:${propertyName}`,
                    upgradeCommandName: options.upgradeCommandName
                });
            }
            checkRemovalAfterIntroduction({
                entityName,
                scope: `property:${propertyName}`,
                introduced: propIntroducedMap[propertyName],
                removed: options,
                stepNameToIndex,
                problems
            });
        }
        const propRenameMap = (0, _wasrenamedinupgradedecorator.getWasRenamedInUpgradePropertyMetadata)(entityClass);
        for (const [propertyName, history] of Object.entries(propRenameMap)){
            checkHistoryForReferenceAndOrder({
                entityName,
                scope: `property:${propertyName}`,
                history,
                stepNameToIndex,
                problems
            });
        }
    }
    return problems;
};
const checkHistoryForReferenceAndOrder = ({ entityName, scope, history, stepNameToIndex, problems })=>{
    let previousIndex = -1;
    let previousName;
    for (const entry of history){
        const index = stepNameToIndex.get(entry.upgradeCommandName);
        if (!(0, _utils.isDefined)(index)) {
            problems.push({
                kind: 'unknown-step-name',
                entityName,
                decorator: '@WasRenamedInUpgrade',
                scope,
                upgradeCommandName: entry.upgradeCommandName
            });
            continue;
        }
        if (index <= previousIndex) {
            problems.push({
                kind: 'rename-history-out-of-order',
                entityName,
                scope,
                offendingUpgradeCommandName: entry.upgradeCommandName,
                precedingUpgradeCommandName: previousName ?? ''
            });
        }
        previousIndex = index;
        previousName = entry.upgradeCommandName;
    }
};
const checkRemovalAfterIntroduction = ({ entityName, scope, introduced, removed, stepNameToIndex, problems })=>{
    if (!(0, _utils.isDefined)(introduced) || !(0, _utils.isDefined)(removed)) {
        return;
    }
    const introducedIndex = stepNameToIndex.get(introduced.upgradeCommandName);
    const removedIndex = stepNameToIndex.get(removed.upgradeCommandName);
    if (!(0, _utils.isDefined)(introducedIndex) || !(0, _utils.isDefined)(removedIndex)) {
        return;
    }
    if (removedIndex <= introducedIndex) {
        problems.push({
            kind: 'removal-before-introduction',
            entityName,
            scope,
            introductionUpgradeCommandName: introduced.upgradeCommandName,
            removalUpgradeCommandName: removed.upgradeCommandName
        });
    }
};
const formatUpgradeAwareDecoratorReferenceProblems = (problems)=>problems.map((problem)=>{
        if (problem.kind === 'unknown-step-name') {
            return `  - ${problem.entityName} ${problem.decorator} (${problem.scope}): unknown upgradeCommandName "${problem.upgradeCommandName}"`;
        }
        if (problem.kind === 'rename-history-out-of-order') {
            return `  - ${problem.entityName} @WasRenamedInUpgrade (${problem.scope}): "${problem.offendingUpgradeCommandName}" must come after "${problem.precedingUpgradeCommandName}" in the upgrade sequence`;
        }
        return `  - ${problem.entityName} @WasRemovedInUpgrade (${problem.scope}): removal step "${problem.removalUpgradeCommandName}" must come after introduction step "${problem.introductionUpgradeCommandName}" in the upgrade sequence`;
    }).join('\n');

//# sourceMappingURL=validate-upgrade-aware-entity-decorators.util.js.map