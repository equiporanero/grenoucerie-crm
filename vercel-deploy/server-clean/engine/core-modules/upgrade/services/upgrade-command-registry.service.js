"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeCommandRegistryService", {
    enumerable: true,
    get: function() {
        return UpgradeCommandRegistryService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _twentyallversionsconstant = require("../constants/twenty-all-versions.constant");
const _twentycrossupgradesupportedversionconstant = require("../constants/twenty-cross-upgrade-supported-version.constant");
const _twentycurrentversionconstant = require("../constants/twenty-current-version.constant");
const _twentynextversionsconstant = require("../constants/twenty-next-versions.constant");
const _twentypreviousversionsconstant = require("../constants/twenty-previous-versions.constant");
const _registeredinstancecommanddecorator = require("../decorators/registered-instance-command.decorator");
const _registeredworkspacecommanddecorator = require("../decorators/registered-workspace-command.decorator");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const buildEmptyVersionBundle = ()=>({
        fastInstanceCommands: [],
        slowInstanceCommands: [],
        workspaceCommands: []
    });
let UpgradeCommandRegistryService = class UpgradeCommandRegistryService {
    onModuleInit() {
        for (const version of _twentyallversionsconstant.TWENTY_ALL_VERSIONS){
            this.bundlesByVersion.set(version, {
                fastInstanceCommands: [],
                slowInstanceCommands: [],
                workspaceCommands: []
            });
        }
        const providers = this.discoveryService.getProviders();
        for (const wrapper of providers){
            const { instance, metatype } = wrapper;
            if (!instance || !metatype) {
                continue;
            }
            const instanceCommandMetadata = (0, _registeredinstancecommanddecorator.getRegisteredInstanceCommandMetadata)(metatype);
            if ((0, _utils.isDefined)(instanceCommandMetadata)) {
                const bundle = this.bundlesByVersion.get(instanceCommandMetadata.version);
                if (!(0, _utils.isDefined)(bundle)) {
                    continue;
                }
                const entry = {
                    name: this.computeCommandName(instanceCommandMetadata.version, instance.constructor.name, instanceCommandMetadata.timestamp),
                    version: instanceCommandMetadata.version,
                    timestamp: instanceCommandMetadata.timestamp
                };
                if (instanceCommandMetadata.type === 'slow') {
                    bundle.slowInstanceCommands.push({
                        ...entry,
                        command: instance
                    });
                } else {
                    bundle.fastInstanceCommands.push({
                        ...entry,
                        command: instance
                    });
                }
                continue;
            }
            const workspaceCommandMetadata = (0, _registeredworkspacecommanddecorator.getRegisteredWorkspaceCommandMetadata)(metatype);
            if ((0, _utils.isDefined)(workspaceCommandMetadata)) {
                const bundle = this.bundlesByVersion.get(workspaceCommandMetadata.version);
                if (!(0, _utils.isDefined)(bundle)) {
                    continue;
                }
                bundle.workspaceCommands.push({
                    name: this.computeCommandName(workspaceCommandMetadata.version, instance.constructor.name, workspaceCommandMetadata.timestamp),
                    command: instance,
                    version: workspaceCommandMetadata.version,
                    timestamp: workspaceCommandMetadata.timestamp
                });
            }
        }
        for (const [, bundle] of this.bundlesByVersion){
            bundle.fastInstanceCommands.sort((entryA, entryB)=>entryA.timestamp - entryB.timestamp);
            bundle.slowInstanceCommands.sort((entryA, entryB)=>entryA.timestamp - entryB.timestamp);
            bundle.workspaceCommands.sort((entryA, entryB)=>entryA.timestamp - entryB.timestamp);
        }
        this.validateNoVersionDuplicatesAcrossConstants();
        this.validatePreviousVersionsNotEmpty();
        this.validateNoDuplicates();
        this.validateAtLeastOneVersionBundleHasWorkspaceCommands();
        for (const [version, bundle] of this.bundlesByVersion){
            const totalCount = bundle.fastInstanceCommands.length + bundle.slowInstanceCommands.length + bundle.workspaceCommands.length;
            if (totalCount > 0) {
                const crossUpgradeLabel = _twentycrossupgradesupportedversionconstant.TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS.includes(version) ? 'cross-upgrade supported' : 'pre-release';
                this.logger.log(`Registered ${bundle.fastInstanceCommands.length} fast instance, ${bundle.slowInstanceCommands.length} slow instance, and ${bundle.workspaceCommands.length} workspace command(s) for ${version} (${crossUpgradeLabel})`);
            }
        }
    }
    getBundleForVersion(version) {
        return this.bundlesByVersion.get(version) ?? buildEmptyVersionBundle();
    }
    getLastWorkspaceCommandForVersion(version) {
        const bundle = this.getBundleForVersion(version);
        return bundle.workspaceCommands[bundle.workspaceCommands.length - 1];
    }
    getCrossUpgradeSupportedFastInstanceCommands() {
        return _twentycrossupgradesupportedversionconstant.TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS.flatMap((version)=>this.getBundleForVersion(version).fastInstanceCommands);
    }
    getCrossUpgradeSupportedSlowInstanceCommands() {
        return _twentycrossupgradesupportedversionconstant.TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS.flatMap((version)=>this.getBundleForVersion(version).slowInstanceCommands);
    }
    computeCommandName(version, className, timestamp) {
        return `${version}_${className}_${timestamp}`;
    }
    validateNoDuplicates() {
        for (const [version, bundle] of this.bundlesByVersion){
            this.validateNoTimestampDuplicatesWithinKind(version, 'fast-instance', bundle.fastInstanceCommands);
            this.validateNoTimestampDuplicatesWithinKind(version, 'slow-instance', bundle.slowInstanceCommands);
            this.validateNoTimestampDuplicatesWithinKind(version, 'workspace', bundle.workspaceCommands);
            const seenNames = new Set();
            const allNames = [
                ...bundle.fastInstanceCommands.map((entry)=>entry.name),
                ...bundle.slowInstanceCommands.map((entry)=>entry.name),
                ...bundle.workspaceCommands.map((entry)=>entry.name)
            ];
            for (const name of allNames){
                if (seenNames.has(name)) {
                    throw new Error(`Duplicate upgrade command name "${name}" in version ${version}`);
                }
                seenNames.add(name);
            }
        }
    }
    validateAtLeastOneVersionBundleHasWorkspaceCommands() {
        let hasWorkspaceCommands = false;
        for (const version of _twentycrossupgradesupportedversionconstant.TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS){
            const bundle = this.getBundleForVersion(version);
            if (bundle.workspaceCommands.length > 0) {
                hasWorkspaceCommands = true;
            }
        }
        if (!hasWorkspaceCommands) {
            throw new Error('Upgrade sequence must contain at least one workspace command');
        }
    }
    validateNoTimestampDuplicatesWithinKind(version, kind, entries) {
        const seenTimestamps = new Set();
        for (const entry of entries){
            if (seenTimestamps.has(entry.timestamp)) {
                throw new Error(`Duplicate ${kind} command timestamp ${entry.timestamp} in version ${version} (command: ${entry.name})`);
            }
            seenTimestamps.add(entry.timestamp);
        }
    }
    validateNoVersionDuplicatesAcrossConstants() {
        const allVersions = [
            ..._twentypreviousversionsconstant.TWENTY_PREVIOUS_VERSIONS,
            _twentycurrentversionconstant.TWENTY_CURRENT_VERSION,
            ..._twentynextversionsconstant.TWENTY_NEXT_VERSIONS
        ];
        const uniqueVersions = new Set(allVersions);
        if (uniqueVersions.size !== allVersions.length) {
            const duplicates = allVersions.filter((version, index)=>allVersions.indexOf(version) !== index);
            throw new Error(`Duplicate version(s) across TWENTY_PREVIOUS_VERSIONS, TWENTY_CURRENT_VERSION, and TWENTY_NEXT_VERSIONS: ${duplicates.join(', ')}`);
        }
    }
    validatePreviousVersionsNotEmpty() {
        if (_twentypreviousversionsconstant.TWENTY_PREVIOUS_VERSIONS.length === 0) {
            throw new Error('TWENTY_PREVIOUS_VERSIONS must contain at least one version before TWENTY_CURRENT_VERSION');
        }
    }
    constructor(discoveryService){
        this.discoveryService = discoveryService;
        this.logger = new _common.Logger(UpgradeCommandRegistryService.name);
        this.bundlesByVersion = new Map();
    }
};
UpgradeCommandRegistryService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.DiscoveryService === "undefined" ? Object : _core.DiscoveryService
    ])
], UpgradeCommandRegistryService);

//# sourceMappingURL=upgrade-command-registry.service.js.map