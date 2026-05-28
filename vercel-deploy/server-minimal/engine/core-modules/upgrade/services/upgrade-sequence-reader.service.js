"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeSequenceReaderService", {
    enumerable: true,
    get: function() {
        return UpgradeSequenceReaderService;
    }
});
const _common = require("@nestjs/common");
const _twentycrossupgradesupportedversionconstant = require("../constants/twenty-cross-upgrade-supported-version.constant");
const _upgradecommandregistryservice = require("./upgrade-command-registry.service");
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
let UpgradeSequenceReaderService = class UpgradeSequenceReaderService {
    getUpgradeSequence() {
        const sequence = [];
        for (const version of _twentycrossupgradesupportedversionconstant.TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS){
            const bundle = this.upgradeCommandRegistryService.getBundleForVersion(version);
            for (const command of bundle.fastInstanceCommands){
                sequence.push({
                    kind: 'fast-instance',
                    ...command
                });
            }
            for (const command of bundle.slowInstanceCommands){
                sequence.push({
                    kind: 'slow-instance',
                    ...command
                });
            }
            for (const command of bundle.workspaceCommands){
                sequence.push({
                    kind: 'workspace',
                    ...command
                });
            }
        }
        return sequence;
    }
    locateStepInSequenceOrThrow({ sequence, stepName }) {
        const cursor = sequence.findIndex((step)=>step.name === stepName);
        if (cursor === -1) {
            const supportedVersions = _twentycrossupgradesupportedversionconstant.TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS.join(', ');
            throw new Error(`Step "${stepName}" not found in upgrade sequence. ` + `The sequence only covers versions [${supportedVersions}]. ` + `Please upgrade to ${_twentycrossupgradesupportedversionconstant.TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS[0]} first.`);
        }
        return cursor;
    }
    getWorkspaceSegmentBounds({ sequence, workspaceCommand }) {
        const workspaceCommandCursor = this.locateStepInSequenceOrThrow({
            sequence,
            stepName: workspaceCommand.name
        });
        let startCursor = workspaceCommandCursor;
        while(startCursor > 0 && sequence[startCursor - 1].kind === 'workspace'){
            startCursor--;
        }
        let endCursor = workspaceCommandCursor;
        while(endCursor < sequence.length - 1 && sequence[endCursor + 1].kind === 'workspace'){
            endCursor++;
        }
        return {
            startCursor,
            endCursor
        };
    }
    collectWorkspaceCommandsStartingFrom({ sequence, fromWorkspaceCommand }) {
        const fromCursor = this.locateStepInSequenceOrThrow({
            sequence,
            stepName: fromWorkspaceCommand.name
        });
        const slice = [];
        for(let cursor = fromCursor; cursor < sequence.length; cursor++){
            const step = sequence[cursor];
            if (step.kind !== 'workspace') {
                break;
            }
            slice.push(step);
        }
        return slice;
    }
    // Returns workspace commands that still need to run, based on the
    // workspace's cursor position. If the cursor points to a command from
    // a previous slice (not found in the current one), the entire slice
    // is pending — this happens when a workspace enters a new slice for
    // the first time after a sync barrier.
    getPendingWorkspaceCommands({ workspaceCommands, workspaceCursor }) {
        const cursorIndex = workspaceCommands.findIndex((command)=>command.name === workspaceCursor.name);
        if (cursorIndex === -1) {
            return workspaceCommands;
        }
        return workspaceCursor.status === 'completed' ? workspaceCommands.slice(cursorIndex + 1) : workspaceCommands.slice(cursorIndex);
    }
    getInitialCursorForNewWorkspace(lastAttemptedInstanceCommand) {
        const { name, status } = lastAttemptedInstanceCommand;
        const sequence = this.getUpgradeSequence();
        const instanceCursor = this.locateStepInSequenceOrThrow({
            sequence,
            stepName: name
        });
        if (status === 'completed') {
            const nextStep = sequence[instanceCursor + 1];
            if ((0, _utils.isDefined)(nextStep) && nextStep.kind === 'workspace') {
                const lastWc = this.findLastWorkspaceCommandInSegmentStartingAt(sequence, nextStep);
                return {
                    name: lastWc.name,
                    status: 'completed'
                };
            }
        }
        return {
            name,
            status
        };
    }
    findLastWorkspaceCommandInSegmentStartingAt(sequence, firstWorkspaceCommand) {
        const segment = this.collectWorkspaceCommandsStartingFrom({
            sequence,
            fromWorkspaceCommand: firstWorkspaceCommand
        });
        return segment[segment.length - 1];
    }
    constructor(upgradeCommandRegistryService){
        this.upgradeCommandRegistryService = upgradeCommandRegistryService;
    }
};
UpgradeSequenceReaderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _upgradecommandregistryservice.UpgradeCommandRegistryService === "undefined" ? Object : _upgradecommandregistryservice.UpgradeCommandRegistryService
    ])
], UpgradeSequenceReaderService);

//# sourceMappingURL=upgrade-sequence-reader.service.js.map