"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatPageLayoutWidgetValidatorService", {
    enumerable: true,
    get: function() {
        return FlatPageLayoutWidgetValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _flatpagelayoutwidgettypevalidatorservice = require("../../../../../metadata-modules/flat-page-layout-widget/services/flat-page-layout-widget-type-validator.service");
const _pagelayouttabexception = require("../../../../../metadata-modules/page-layout-tab/exceptions/page-layout-tab.exception");
const _pagelayoutwidgetexception = require("../../../../../metadata-modules/page-layout-widget/exceptions/page-layout-widget.exception");
const _validatepagelayoutwidgetgridpositionutil = require("../../../../../metadata-modules/page-layout-widget/utils/validate-page-layout-widget-grid-position.util");
const _validatepagelayoutwidgetverticallistpositionutil = require("../../../../../metadata-modules/page-layout-widget/utils/validate-page-layout-widget-vertical-list-position.util");
const _validatewidgetgridpositionutil = require("../../../../../metadata-modules/page-layout-widget/utils/validate-widget-grid-position.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FlatPageLayoutWidgetValidatorService = class FlatPageLayoutWidgetValidatorService {
    async validateFlatPageLayoutWidgetUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps, additionalCacheDataMaps: { featureFlagsMap }, workspaceId, buildOptions }) {
        const existingFlatPageLayoutWidget = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatEntityMapsAndRelatedFlatEntityMaps.flatPageLayoutWidgetMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'pageLayoutWidget',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatPageLayoutWidget)) {
            validationResult.errors.push({
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "yCsIxc",
                    message: "Page layout widget to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "yCsIxc",
                    message: "Page layout widget to update not found"
                }
            });
            return validationResult;
        }
        const updatedFlatPageLayoutWidget = {
            ...existingFlatPageLayoutWidget,
            ...flatEntityUpdate
        };
        const effectivePageLayoutTabUniversalIdentifier = this.getEffectivePageLayoutTabUniversalIdentifier(updatedFlatPageLayoutWidget);
        validationResult.flatEntityMinimalInformation = {
            ...validationResult.flatEntityMinimalInformation,
            pageLayoutTabUniversalIdentifier: effectivePageLayoutTabUniversalIdentifier
        };
        const referencedPageLayoutTab = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: effectivePageLayoutTabUniversalIdentifier,
            flatEntityMaps: optimisticFlatEntityMapsAndRelatedFlatEntityMaps.flatPageLayoutTabMaps
        });
        if (!(0, _utils.isDefined)(referencedPageLayoutTab)) {
            validationResult.errors.push({
                code: _pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "qJ9V6q",
                    message: "Page layout tab not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "qJ9V6q",
                    message: "Page layout tab not found"
                }
            });
        }
        const gridPositionErrors = this.validateGridPosition({
            gridPosition: updatedFlatPageLayoutWidget.gridPosition,
            widgetTitle: updatedFlatPageLayoutWidget.title
        });
        validationResult.errors.push(...gridPositionErrors);
        const positionErrors = this.validatePosition({
            position: updatedFlatPageLayoutWidget.position,
            pageLayoutTab: referencedPageLayoutTab,
            widgetTitle: updatedFlatPageLayoutWidget.title
        });
        validationResult.errors.push(...positionErrors);
        const typeSpecificityErrors = this.flatPageLayoutWidgetTypeValidatorService.validateFlatPageLayoutWidgetTypeSpecificitiesForUpdate({
            flatEntityToValidate: updatedFlatPageLayoutWidget,
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
            update: flatEntityUpdate,
            additionalCacheDataMaps: {
                featureFlagsMap
            },
            workspaceId,
            buildOptions,
            remainingFlatEntityMapsToValidate: optimisticFlatEntityMapsAndRelatedFlatEntityMaps.flatPageLayoutWidgetMaps
        });
        validationResult.errors.push(...typeSpecificityErrors);
        return validationResult;
    }
    validateFlatPageLayoutWidgetDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPageLayoutWidgetMaps: optimisticFlatPageLayoutWidgetMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'pageLayoutWidget',
            type: 'delete'
        });
        const existingFlatPageLayoutWidget = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatPageLayoutWidgetMaps
        });
        if (!(0, _utils.isDefined)(existingFlatPageLayoutWidget)) {
            validationResult.errors.push({
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "7QlaTN",
                    message: "Page layout widget to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "7QlaTN",
                    message: "Page layout widget to delete not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    async validateFlatPageLayoutWidgetCreation({ flatEntityToValidate: flatPageLayoutWidgetToValidate, additionalCacheDataMaps: { featureFlagsMap }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps, workspaceId, buildOptions, remainingFlatEntityMapsToValidate }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatPageLayoutWidgetToValidate.universalIdentifier,
                pageLayoutTabUniversalIdentifier: flatPageLayoutWidgetToValidate.pageLayoutTabUniversalIdentifier
            },
            metadataName: 'pageLayoutWidget',
            type: 'create'
        });
        const existingFlatPageLayoutWidget = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPageLayoutWidgetToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatEntityMapsAndRelatedFlatEntityMaps.flatPageLayoutWidgetMaps
        });
        if ((0, _utils.isDefined)(existingFlatPageLayoutWidget)) {
            const flatPageLayoutWidgetUniversalIdentifier = flatPageLayoutWidgetToValidate.universalIdentifier;
            validationResult.errors.push({
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "hGYqrE",
                    message: "Page layout widget with universal identifier {flatPageLayoutWidgetUniversalIdentifier} already exists",
                    values: {
                        flatPageLayoutWidgetUniversalIdentifier: flatPageLayoutWidgetUniversalIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "k6Npai",
                    message: "Page layout widget already exists"
                }
            });
        }
        const referencedPageLayoutTab = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPageLayoutWidgetToValidate.pageLayoutTabUniversalIdentifier,
            flatEntityMaps: optimisticFlatEntityMapsAndRelatedFlatEntityMaps.flatPageLayoutTabMaps
        });
        if (!(0, _utils.isDefined)(referencedPageLayoutTab)) {
            validationResult.errors.push({
                code: _pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "qJ9V6q",
                    message: "Page layout tab not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "qJ9V6q",
                    message: "Page layout tab not found"
                }
            });
        }
        const gridPositionErrors = this.validateGridPosition({
            gridPosition: flatPageLayoutWidgetToValidate.gridPosition,
            widgetTitle: flatPageLayoutWidgetToValidate.title
        });
        validationResult.errors.push(...gridPositionErrors);
        const positionErrors = this.validatePosition({
            position: flatPageLayoutWidgetToValidate.position,
            pageLayoutTab: referencedPageLayoutTab,
            widgetTitle: flatPageLayoutWidgetToValidate.title
        });
        validationResult.errors.push(...positionErrors);
        const typeSpecificityErrors = this.flatPageLayoutWidgetTypeValidatorService.validateFlatPageLayoutWidgetTypeSpecificitiesForCreation({
            flatEntityToValidate: flatPageLayoutWidgetToValidate,
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
            additionalCacheDataMaps: {
                featureFlagsMap
            },
            workspaceId,
            buildOptions,
            remainingFlatEntityMapsToValidate
        });
        validationResult.errors.push(...typeSpecificityErrors);
        return validationResult;
    }
    getEffectivePageLayoutTabUniversalIdentifier(widget) {
        return widget.universalOverrides?.pageLayoutTabUniversalIdentifier ?? widget.pageLayoutTabUniversalIdentifier;
    }
    validateGridPosition({ gridPosition, widgetTitle }) {
        if (!(0, _utils.isDefined)(gridPosition)) {
            return [
                {
                    code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "pXkgL2",
                        message: "Grid position is required"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "pXkgL2",
                        message: "Grid position is required"
                    }
                }
            ];
        }
        return (0, _validatewidgetgridpositionutil.validateWidgetGridPosition)(gridPosition, widgetTitle);
    }
    validatePosition({ position, pageLayoutTab, widgetTitle }) {
        if (!(0, _utils.isDefined)(position)) {
            return [];
        }
        const errors = [];
        if ((0, _utils.isDefined)(pageLayoutTab) && position.layoutMode !== pageLayoutTab.layoutMode) {
            const layoutMode = position.layoutMode;
            const tabLayoutMode = pageLayoutTab.layoutMode;
            errors.push({
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "c7uZDh",
                    message: 'Position layoutMode "{layoutMode}" does not match tab layoutMode "{tabLayoutMode}"',
                    values: {
                        layoutMode: layoutMode,
                        tabLayoutMode: tabLayoutMode
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MPdWmx",
                    message: "Widget position type must match the tab layout mode"
                }
            });
        }
        switch(position.layoutMode){
            case _types.PageLayoutTabLayoutMode.GRID:
                errors.push(...(0, _validatepagelayoutwidgetgridpositionutil.validatePageLayoutWidgetGridPosition)(position, widgetTitle));
                break;
            case _types.PageLayoutTabLayoutMode.VERTICAL_LIST:
                errors.push(...(0, _validatepagelayoutwidgetverticallistpositionutil.validatePageLayoutWidgetVerticalListPosition)(position, widgetTitle));
                break;
            case _types.PageLayoutTabLayoutMode.CANVAS:
                break;
        }
        return errors;
    }
    constructor(flatPageLayoutWidgetTypeValidatorService){
        this.flatPageLayoutWidgetTypeValidatorService = flatPageLayoutWidgetTypeValidatorService;
    }
};
FlatPageLayoutWidgetValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatpagelayoutwidgettypevalidatorservice.FlatPageLayoutWidgetTypeValidatorService === "undefined" ? Object : _flatpagelayoutwidgettypevalidatorservice.FlatPageLayoutWidgetTypeValidatorService
    ])
], FlatPageLayoutWidgetValidatorService);

//# sourceMappingURL=flat-page-layout-widget-validator.service.js.map