"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatPageLayoutWidgetModule", {
    enumerable: true,
    get: function() {
        return FlatPageLayoutWidgetModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../field-metadata/field-metadata.entity");
const _flatpagelayoutwidgettypevalidatorservice = require("./services/flat-page-layout-widget-type-validator.service");
const _workspaceflatpagelayoutwidgetmapcacheservice = require("./services/workspace-flat-page-layout-widget-map-cache.service");
const _frontcomponententity = require("../front-component/entities/front-component.entity");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
const _pagelayouttabentity = require("../page-layout-tab/entities/page-layout-tab.entity");
const _pagelayoutwidgetentity = require("../page-layout-widget/entities/page-layout-widget.entity");
const _viewentity = require("../view/entities/view.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatPageLayoutWidgetModule = class FlatPageLayoutWidgetModule {
};
FlatPageLayoutWidgetModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _pagelayoutwidgetentity.PageLayoutWidgetEntity,
                _applicationentity.ApplicationEntity,
                _pagelayouttabentity.PageLayoutTabEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _fieldmetadataentity.FieldMetadataEntity,
                _frontcomponententity.FrontComponentEntity,
                _viewentity.ViewEntity
            ])
        ],
        providers: [
            _workspaceflatpagelayoutwidgetmapcacheservice.WorkspaceFlatPageLayoutWidgetMapCacheService,
            _flatpagelayoutwidgettypevalidatorservice.FlatPageLayoutWidgetTypeValidatorService
        ],
        exports: [
            _workspaceflatpagelayoutwidgetmapcacheservice.WorkspaceFlatPageLayoutWidgetMapCacheService,
            _flatpagelayoutwidgettypevalidatorservice.FlatPageLayoutWidgetTypeValidatorService
        ]
    })
], FlatPageLayoutWidgetModule);

//# sourceMappingURL=flat-page-layout-widget.module.js.map