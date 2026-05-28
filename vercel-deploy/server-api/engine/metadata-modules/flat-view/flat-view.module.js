"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatViewModule", {
    enumerable: true,
    get: function() {
        return FlatViewModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../field-metadata/field-metadata.entity");
const _workspaceflatviewmapcacheservice = require("./services/workspace-flat-view-map-cache.service");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
const _viewfieldgroupentity = require("../view-field-group/entities/view-field-group.entity");
const _viewfieldentity = require("../view-field/entities/view-field.entity");
const _viewfiltergroupentity = require("../view-filter-group/entities/view-filter-group.entity");
const _viewfilterentity = require("../view-filter/entities/view-filter.entity");
const _viewgroupentity = require("../view-group/entities/view-group.entity");
const _viewentity = require("../view/entities/view.entity");
const _viewsortentity = require("../view-sort/entities/view-sort.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatViewModule = class FlatViewModule {
};
FlatViewModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _fieldmetadataentity.FieldMetadataEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _viewentity.ViewEntity,
                _viewfieldentity.ViewFieldEntity,
                _viewfieldgroupentity.ViewFieldGroupEntity,
                _viewfilterentity.ViewFilterEntity,
                _viewgroupentity.ViewGroupEntity,
                _viewsortentity.ViewSortEntity,
                _viewfiltergroupentity.ViewFilterGroupEntity
            ])
        ],
        providers: [
            _workspaceflatviewmapcacheservice.WorkspaceFlatViewMapCacheService
        ],
        exports: [
            _workspaceflatviewmapcacheservice.WorkspaceFlatViewMapCacheService
        ]
    })
], FlatViewModule);

//# sourceMappingURL=flat-view.module.js.map