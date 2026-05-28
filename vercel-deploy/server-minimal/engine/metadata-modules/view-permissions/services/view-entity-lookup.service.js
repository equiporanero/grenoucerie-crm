"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewEntityLookupService", {
    enumerable: true,
    get: function() {
        return ViewEntityLookupService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _viewfieldentity = require("../../view-field/entities/view-field.entity");
const _viewfiltergroupentity = require("../../view-filter-group/entities/view-filter-group.entity");
const _viewfilterentity = require("../../view-filter/entities/view-filter.entity");
const _viewgroupentity = require("../../view-group/entities/view-group.entity");
const _viewsortentity = require("../../view-sort/entities/view-sort.entity");
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
let ViewEntityLookupService = class ViewEntityLookupService {
    async findViewIdByEntityIdAndKind(kind, entityId, workspaceId) {
        switch(kind){
            case 'viewField':
                {
                    const row = await this.viewFieldRepository.findOne({
                        where: {
                            id: entityId,
                            workspaceId
                        },
                        select: [
                            'viewId'
                        ]
                    });
                    if (row) return row.viewId;
                    break;
                }
            case 'viewFilter':
                {
                    const row = await this.viewFilterRepository.findOne({
                        where: {
                            id: entityId,
                            workspaceId
                        },
                        select: [
                            'viewId'
                        ]
                    });
                    if (row) return row.viewId;
                    break;
                }
            case 'viewFilterGroup':
                {
                    const row = await this.viewFilterGroupRepository.findOne({
                        where: {
                            id: entityId,
                            workspaceId
                        },
                        select: [
                            'viewId'
                        ]
                    });
                    if (row) return row.viewId;
                    break;
                }
            case 'viewGroup':
                {
                    const row = await this.viewGroupRepository.findOne({
                        where: {
                            id: entityId,
                            workspaceId
                        },
                        select: [
                            'viewId'
                        ]
                    });
                    if (row) return row.viewId;
                    break;
                }
            case 'viewSort':
                {
                    const row = await this.viewSortRepository.findOne({
                        where: {
                            id: entityId,
                            workspaceId
                        },
                        select: [
                            'viewId'
                        ]
                    });
                    if (row) return row.viewId;
                    break;
                }
            default:
                break;
        }
        return null;
    }
    constructor(viewFieldRepository, viewFilterRepository, viewFilterGroupRepository, viewGroupRepository, viewSortRepository){
        this.viewFieldRepository = viewFieldRepository;
        this.viewFilterRepository = viewFilterRepository;
        this.viewFilterGroupRepository = viewFilterGroupRepository;
        this.viewGroupRepository = viewGroupRepository;
        this.viewSortRepository = viewSortRepository;
    }
};
ViewEntityLookupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_viewfieldentity.ViewFieldEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_viewfilterentity.ViewFilterEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_viewfiltergroupentity.ViewFilterGroupEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_viewgroupentity.ViewGroupEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_viewsortentity.ViewSortEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ViewEntityLookupService);

//# sourceMappingURL=view-entity-lookup.service.js.map