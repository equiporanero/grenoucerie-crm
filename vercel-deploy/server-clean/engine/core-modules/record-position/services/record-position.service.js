"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RecordPositionService", {
    enumerable: true,
    get: function() {
        return RecordPositionService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
const _sanitizenumberutli = require("../../../utils/sanitize-number.utli");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RecordPositionService = class RecordPositionService {
    async buildRecordPosition({ objectMetadata, value, workspaceId, index = 0 }) {
        if ((0, _guards.isNumber)(value) && !Number.isNaN(value)) {
            return value;
        }
        if (value === 'first') {
            const recordWithMinPosition = await this.findMinPosition(objectMetadata, workspaceId);
            return recordWithMinPosition !== null ? recordWithMinPosition - index - 1 : 1;
        }
        const recordWithMaxPosition = await this.findMaxPosition(objectMetadata, workspaceId);
        return recordWithMaxPosition !== null ? recordWithMaxPosition + index + 1 : 1;
    }
    async overridePositionOnRecords({ partialRecordInputs, workspaceId, objectMetadata, shouldBackfillPositionIfUndefined }) {
        const recordsThatNeedFirstPosition = [];
        const recordsThatNeedLastPosition = [];
        const recordsWithExistingNumberPosition = [];
        const recordsThatShouldNotBeUpdated = [];
        const positionFieldId = objectMetadata.fieldIdByName['position'];
        if (!(0, _utils.isDefined)(positionFieldId)) {
            return partialRecordInputs;
        }
        for (const partialRecordInput of partialRecordInputs){
            if (partialRecordInput.position === 'last') {
                recordsThatNeedLastPosition.push(partialRecordInput);
            } else if (typeof partialRecordInput.position === 'number') {
                recordsWithExistingNumberPosition.push(partialRecordInput);
            } else if (partialRecordInput.position === 'first') {
                recordsThatNeedFirstPosition.push(partialRecordInput);
            } else if (partialRecordInput.position === undefined && shouldBackfillPositionIfUndefined) {
                recordsThatNeedFirstPosition.push(partialRecordInput);
            } else {
                recordsThatShouldNotBeUpdated.push(partialRecordInput);
            }
        }
        const numericPositions = recordsWithExistingNumberPosition.map((record)=>record.position).filter((position)=>(0, _guards.isNumber)(position) && !Number.isNaN(position));
        const calculatePosition = (mathOperation, existingPosition)=>{
            const sanitizedExistingPosition = (0, _utils.isDefined)(existingPosition) && !Number.isNaN(existingPosition) ? existingPosition : null;
            const fallback = sanitizedExistingPosition ?? 1;
            return numericPositions.length > 0 ? mathOperation(numericPositions, fallback) : fallback;
        };
        if (recordsThatNeedFirstPosition.length > 0) {
            const existingRecordMinPosition = await this.findMinPosition(objectMetadata, workspaceId);
            const minPosition = calculatePosition((positions, fallback)=>Math.min(...positions, fallback), existingRecordMinPosition);
            for (const [index, record] of recordsThatNeedFirstPosition.entries()){
                record.position = minPosition - index - 1;
            }
        }
        if (recordsThatNeedLastPosition.length > 0) {
            const existingRecordMaxPosition = await this.findMaxPosition(objectMetadata, workspaceId);
            const maxPosition = calculatePosition((positions, fallback)=>Math.max(...positions, fallback), existingRecordMaxPosition);
            for (const [index, record] of recordsThatNeedLastPosition.entries()){
                record.position = maxPosition + index + 1;
            }
        }
        return [
            ...recordsThatNeedFirstPosition,
            ...recordsThatNeedLastPosition,
            ...recordsWithExistingNumberPosition,
            ...recordsThatShouldNotBeUpdated
        ];
    }
    async findByPosition(positionValue, objectMetadata, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectMetadata.nameSingular, {
                shouldBypassPermissionChecks: true
            });
            const record = await repository.findOneBy({
                position: positionValue
            });
            return record ? {
                id: record.id,
                position: record.position
            } : null;
        }, authContext);
    }
    async updatePosition(recordId, positionValue, objectMetadata, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectMetadata.nameSingular, {
                shouldBypassPermissionChecks: true
            });
            await repository.update(recordId, {
                position: positionValue
            });
        }, authContext);
    }
    async findMinPosition(objectMetadata, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const result = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectMetadata.nameSingular, {
                shouldBypassPermissionChecks: true
            });
            return await repository.minimum('position');
        }, authContext);
        return (0, _sanitizenumberutli.sanitizeNumber)(result);
    }
    async findMaxPosition(objectMetadata, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const result = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectMetadata.nameSingular, {
                shouldBypassPermissionChecks: true
            });
            return await repository.maximum('position');
        }, authContext);
        return (0, _sanitizenumberutli.sanitizeNumber)(result);
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
RecordPositionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], RecordPositionService);

//# sourceMappingURL=record-position.service.js.map