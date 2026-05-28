"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeAwareEntityMetadataAdapter", {
    enumerable: true,
    get: function() {
        return UpgradeAwareEntityMetadataAdapter;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _utils = require("twenty-shared/utils");
const _upgrademigrationservice = require("../../core-modules/upgrade/services/upgrade-migration.service");
const _upgradesequencereaderservice = require("../../core-modules/upgrade/services/upgrade-sequence-reader.service");
const _resolveentityshapeatupgradecursorutil = require("../../core-modules/upgrade/utils/resolve-entity-shape-at-upgrade-cursor.util");
const _validateupgradeawareentitydecoratorsutil = require("../../core-modules/upgrade/utils/validate-upgrade-aware-entity-decorators.util");
const _upgradeawarerepositorystate = require("./upgrade-aware-repository-state");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let UpgradeAwareEntityMetadataAdapter = class UpgradeAwareEntityMetadataAdapter {
    async onModuleInit() {
        const sequence = this.upgradeSequenceReaderService.getUpgradeSequence();
        for (const [index, step] of sequence.entries()){
            this.stepNameToIndex.set(step.name, index);
        }
        this.validateDecoratorsAgainstSequence();
        this.captureCanonicalSnapshots();
        this.currentCursor = sequence.length;
        this.applyCursorToMetadata();
        _upgradeawarerepositorystate.UpgradeAwareRepositoryState.getInstance().setMetadataService(this);
        try {
            await this.refresh();
        } catch (error) {
            this.logger.log(`[upgrade-metadata] initial refresh skipped (core.upgradeMigration not readable yet): ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async refresh() {
        const lastAttempted = await this.upgradeMigrationService.getLastAttemptedInstanceCommand();
        let nextCursor;
        if (!(0, _utils.isDefined)(lastAttempted)) {
            nextCursor = 0;
        } else {
            const index = this.stepNameToIndex.get(lastAttempted.name);
            if (!(0, _utils.isDefined)(index)) {
                nextCursor = 0;
            } else {
                nextCursor = lastAttempted.status === 'completed' ? index + 1 : index;
            }
        }
        if (nextCursor === this.currentCursor) {
            return;
        }
        this.currentCursor = nextCursor;
        this.applyCursorToMetadata();
    }
    isEntityAvailable(entityClass) {
        return this.availabilityByEntityClass.get(entityClass) ?? true;
    }
    getHiddenColumnPropertyNames(entityClass) {
        return this.hiddenColumnsByEntityClass.get(entityClass) ?? new Set();
    }
    captureCanonicalSnapshots() {
        for (const metadata of this.coreDataSource.entityMetadatas){
            const columnDatabaseNamesByPropertyName = new Map();
            const columnSelectByPropertyName = new Map();
            const columnInsertByPropertyName = new Map();
            const columnUpdateByPropertyName = new Map();
            for (const column of metadata.columns){
                columnDatabaseNamesByPropertyName.set(column.propertyName, column.databaseName);
                columnSelectByPropertyName.set(column.propertyName, column.isSelect);
                columnInsertByPropertyName.set(column.propertyName, column.isInsert);
                columnUpdateByPropertyName.set(column.propertyName, column.isUpdate);
            }
            this.snapshotByMetadata.set(metadata, {
                tableName: metadata.tableName,
                tablePath: metadata.tablePath,
                givenTableName: metadata.givenTableName,
                canonicalColumns: [
                    ...metadata.columns
                ],
                columnDatabaseNamesByPropertyName,
                columnSelectByPropertyName,
                columnInsertByPropertyName,
                columnUpdateByPropertyName
            });
        }
    }
    applyCursorToMetadata() {
        const isStepApplied = this.buildIsStepAppliedPredicate();
        let renamedCount = 0;
        let unavailableCount = 0;
        let hiddenColumnCount = 0;
        for (const metadata of this.coreDataSource.entityMetadatas){
            const applied = this.applyCursorToEntity({
                metadata,
                isStepApplied
            });
            if (!(0, _utils.isDefined)(applied)) {
                continue;
            }
            if (applied.resolved.effectiveTableName !== applied.snapshot.tableName) {
                renamedCount++;
            }
            if (!applied.resolved.isAvailable) {
                unavailableCount++;
            }
            hiddenColumnCount += applied.resolved.hiddenPropertyNames.size;
        }
        this.logger.log(`[upgrade-metadata] applied cursor=${this.currentCursor} renamed=${renamedCount} unavailable=${unavailableCount} hiddenColumns=${hiddenColumnCount}`);
    }
    buildIsStepAppliedPredicate() {
        return (stepName)=>{
            const index = this.stepNameToIndex.get(stepName);
            if (!(0, _utils.isDefined)(index)) {
                return false;
            }
            return index < this.currentCursor;
        };
    }
    applyCursorToEntity({ metadata, isStepApplied }) {
        const snapshot = this.snapshotByMetadata.get(metadata);
        if (!(0, _utils.isDefined)(snapshot) || typeof metadata.target !== 'function') {
            return undefined;
        }
        const entityClass = metadata.target;
        const currentColumns = [
            ...snapshot.columnDatabaseNamesByPropertyName
        ].map(([propertyName, databaseName])=>({
                propertyName,
                databaseName
            }));
        const resolved = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
            entityClass,
            currentTableName: snapshot.tableName,
            currentColumns,
            isStepApplied
        });
        this.applyResolvedShapeToMetadata({
            metadata,
            snapshot,
            resolved
        });
        this.availabilityByEntityClass.set(entityClass, resolved.isAvailable);
        this.hiddenColumnsByEntityClass.set(entityClass, resolved.hiddenPropertyNames);
        this.logResolvedShape({
            entityClass,
            snapshot,
            resolved
        });
        return {
            snapshot,
            resolved
        };
    }
    logResolvedShape({ entityClass, snapshot, resolved }) {
        if (resolved.effectiveTableName !== snapshot.tableName) {
            this.logger.log(`[upgrade-metadata] rename ${entityClass.name} ${snapshot.tableName} -> ${resolved.effectiveTableName}`);
        }
        if (!resolved.isAvailable) {
            this.logger.log(`[upgrade-metadata] unavailable ${entityClass.name}`);
        }
        if (resolved.hiddenPropertyNames.size > 0) {
            this.logger.log(`[upgrade-metadata] hidden columns on ${entityClass.name}: ${[
                ...resolved.hiddenPropertyNames
            ].join(',')}`);
        }
    }
    applyResolvedShapeToMetadata({ metadata, snapshot, resolved }) {
        if (resolved.effectiveTableName === snapshot.tableName) {
            metadata.tableName = snapshot.tableName;
            metadata.tablePath = snapshot.tablePath;
            metadata.givenTableName = snapshot.givenTableName;
        } else {
            metadata.tableName = resolved.effectiveTableName;
            metadata.tablePath = this.computeTablePath({
                metadata,
                effectiveTableName: resolved.effectiveTableName
            });
            metadata.givenTableName = resolved.effectiveTableName;
        }
        metadata.columns = [
            ...snapshot.canonicalColumns
        ];
        for (const column of metadata.columns){
            this.applyColumnShape({
                column,
                snapshot,
                resolved
            });
        }
        metadata.columns = metadata.columns.filter((column)=>!resolved.hiddenPropertyNames.has(column.propertyName));
    }
    applyColumnShape({ column, snapshot, resolved }) {
        const canonicalName = snapshot.columnDatabaseNamesByPropertyName.get(column.propertyName);
        if (!(0, _utils.isDefined)(canonicalName)) {
            return;
        }
        const remappedName = resolved.columnDatabaseNameRemap.get(column.propertyName);
        column.databaseName = remappedName ?? canonicalName;
        const isHidden = resolved.hiddenPropertyNames.has(column.propertyName);
        const canonicalIsSelect = snapshot.columnSelectByPropertyName.get(column.propertyName) ?? true;
        const canonicalIsInsert = snapshot.columnInsertByPropertyName.get(column.propertyName) ?? true;
        const canonicalIsUpdate = snapshot.columnUpdateByPropertyName.get(column.propertyName) ?? true;
        column.isSelect = isHidden ? false : canonicalIsSelect;
        column.isInsert = isHidden ? false : canonicalIsInsert;
        column.isUpdate = isHidden ? false : canonicalIsUpdate;
    }
    computeTablePath({ metadata, effectiveTableName }) {
        if (metadata.schema) {
            return `${metadata.schema}.${effectiveTableName}`;
        }
        if (metadata.database) {
            return `${metadata.database}.${effectiveTableName}`;
        }
        return effectiveTableName;
    }
    validateDecoratorsAgainstSequence() {
        const entityClasses = this.coreDataSource.entityMetadatas.map((metadata)=>metadata.target).filter((target)=>typeof target === 'function');
        const problems = (0, _validateupgradeawareentitydecoratorsutil.validateUpgradeAwareEntityDecorators)({
            entityClasses,
            stepNameToIndex: this.stepNameToIndex
        });
        if (problems.length === 0) {
            return;
        }
        const formatted = (0, _validateupgradeawareentitydecoratorsutil.formatUpgradeAwareDecoratorReferenceProblems)(problems);
        throw new Error(`Upgrade-aware entity decorators have problems. ` + `Either fix the upgradeCommandName strings, register the missing steps, or reorder the rename history.\n${formatted}`);
    }
    constructor(coreDataSource, upgradeSequenceReaderService, upgradeMigrationService){
        this.coreDataSource = coreDataSource;
        this.upgradeSequenceReaderService = upgradeSequenceReaderService;
        this.upgradeMigrationService = upgradeMigrationService;
        this.logger = new _common.Logger(UpgradeAwareEntityMetadataAdapter.name);
        this.snapshotByMetadata = new WeakMap();
        this.availabilityByEntityClass = new WeakMap();
        this.hiddenColumnsByEntityClass = new WeakMap();
        this.stepNameToIndex = new Map();
        this.currentCursor = Number.MAX_SAFE_INTEGER;
    }
};
UpgradeAwareEntityMetadataAdapter = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _upgradesequencereaderservice.UpgradeSequenceReaderService === "undefined" ? Object : _upgradesequencereaderservice.UpgradeSequenceReaderService,
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService
    ])
], UpgradeAwareEntityMetadataAdapter);

//# sourceMappingURL=upgrade-aware-entity-metadata.adapter.js.map