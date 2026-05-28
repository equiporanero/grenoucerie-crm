"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatPageLayoutWidgetTypeValidatorService", {
    enumerable: true,
    get: function() {
        return FlatPageLayoutWidgetTypeValidatorService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _rejectwidgettypeutil = require("../validators/utils/reject-widget-type.util");
const _validatefieldsflatpagelayoutwidgetforcreationutil = require("../validators/utils/validate-fields-flat-page-layout-widget-for-creation.util");
const _validatefrontcomponentflatpagelayoutwidgetforcreationutil = require("../validators/utils/validate-front-component-flat-page-layout-widget-for-creation.util");
const _validatefrontcomponentflatpagelayoutwidgetforupdateutil = require("../validators/utils/validate-front-component-flat-page-layout-widget-for-update.util");
const _validategraphflatpagelayoutwidgetforcreationutil = require("../validators/utils/validate-graph-flat-page-layout-widget-for-creation.util");
const _validategraphflatpagelayoutwidgetforupdateutil = require("../validators/utils/validate-graph-flat-page-layout-widget-for-update.util");
const _validateiframeflatpagelayoutwidgetforcreationutil = require("../validators/utils/validate-iframe-flat-page-layout-widget-for-creation.util");
const _validateiframeflatpagelayoutwidgetforupdateutil = require("../validators/utils/validate-iframe-flat-page-layout-widget-for-update.util");
const _validatesimplerecordpagewidgetforcreationutil = require("../validators/utils/validate-simple-record-page-widget-for-creation.util");
const _validatesimplerecordpagewidgetforupdateutil = require("../validators/utils/validate-simple-record-page-widget-for-update.util");
const _validatestandalonerichtextflatpagelayoutwidgetforcreationutil = require("../validators/utils/validate-standalone-rich-text-flat-page-layout-widget-for-creation.util");
const _validatestandalonerichtextflatpagelayoutwidgetforupdateutil = require("../validators/utils/validate-standalone-rich-text-flat-page-layout-widget-for-update.util");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../page-layout-widget/enums/widget-type.enum");
const _pagelayoutwidgetexception = require("../../page-layout-widget/exceptions/page-layout-widget.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FlatPageLayoutWidgetTypeValidatorService = class FlatPageLayoutWidgetTypeValidatorService {
    validateFlatPageLayoutWidgetTypeSpecificitiesForCreation(args) {
        const { flatEntityToValidate } = args;
        const widgetType = flatEntityToValidate.type;
        const pageLayoutWidgetTypeValidator = this.PAGE_LAYOUT_WIDGET_TYPE_VALIDATOR_FOR_CREATION_HASHMAP[widgetType];
        if (!(0, _utils.isDefined)(pageLayoutWidgetTypeValidator)) {
            return [
                {
                    code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                    message: `Unsupported page layout widget type ${widgetType}`,
                    value: widgetType,
                    userFriendlyMessage: /*i18n*/ {
                        id: "s+1Ldg",
                        message: "Unsupported page layout widget type {widgetType}",
                        values: {
                            widgetType: widgetType
                        }
                    }
                }
            ];
        }
        return pageLayoutWidgetTypeValidator(args);
    }
    validateFlatPageLayoutWidgetTypeSpecificitiesForUpdate(args) {
        const { flatEntityToValidate } = args;
        const widgetType = flatEntityToValidate.type;
        const pageLayoutWidgetTypeValidator = this.PAGE_LAYOUT_WIDGET_TYPE_VALIDATOR_FOR_UPDATE_HASHMAP[widgetType];
        if (!(0, _utils.isDefined)(pageLayoutWidgetTypeValidator)) {
            return [
                {
                    code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                    message: `Unsupported page layout widget type ${widgetType}`,
                    value: widgetType,
                    userFriendlyMessage: /*i18n*/ {
                        id: "s+1Ldg",
                        message: "Unsupported page layout widget type {widgetType}",
                        values: {
                            widgetType: widgetType
                        }
                    }
                }
            ];
        }
        return pageLayoutWidgetTypeValidator(args);
    }
    constructor(){
        this.PAGE_LAYOUT_WIDGET_TYPE_VALIDATOR_FOR_CREATION_HASHMAP = {
            VIEW: (0, _rejectwidgettypeutil.rejectWidgetType)(_widgettypeenum.WidgetType.VIEW, 'Widget type VIEW is not supported yet.', /*i18n*/ {
                id: "rL2haJ",
                message: "Widget type VIEW is not supported yet."
            }),
            IFRAME: _validateiframeflatpagelayoutwidgetforcreationutil.validateIframeFlatPageLayoutWidgetForCreation,
            FIELD: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.FIELD),
            FIELDS: _validatefieldsflatpagelayoutwidgetforcreationutil.validateFieldsFlatPageLayoutWidgetForCreation,
            GRAPH: _validategraphflatpagelayoutwidgetforcreationutil.validateGraphFlatPageLayoutWidgetForCreation,
            STANDALONE_RICH_TEXT: _validatestandalonerichtextflatpagelayoutwidgetforcreationutil.validateStandaloneRichTextFlatPageLayoutWidgetForCreation,
            FRONT_COMPONENT: _validatefrontcomponentflatpagelayoutwidgetforcreationutil.validateFrontComponentFlatPageLayoutWidgetForCreation,
            TIMELINE: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.TIMELINE),
            TASKS: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.TASKS),
            NOTES: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.NOTES),
            FILES: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.FILES),
            EMAILS: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.EMAILS),
            CALENDAR: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.CALENDAR),
            FIELD_RICH_TEXT: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.FIELD_RICH_TEXT),
            WORKFLOW: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW),
            WORKFLOW_VERSION: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_VERSION),
            WORKFLOW_RUN: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_RUN),
            RECORD_TABLE: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.RECORD_TABLE),
            EMAIL_THREAD: (0, _validatesimplerecordpagewidgetforcreationutil.validateSimpleRecordPageWidgetForCreation)(_widgetconfigurationtypetype.WidgetConfigurationType.EMAIL_THREAD)
        };
        this.PAGE_LAYOUT_WIDGET_TYPE_VALIDATOR_FOR_UPDATE_HASHMAP = {
            VIEW: (0, _rejectwidgettypeutil.rejectWidgetType)(_widgettypeenum.WidgetType.VIEW, 'Widget type VIEW is not supported yet.', /*i18n*/ {
                id: "rL2haJ",
                message: "Widget type VIEW is not supported yet."
            }),
            IFRAME: _validateiframeflatpagelayoutwidgetforupdateutil.validateIframeFlatPageLayoutWidgetForUpdate,
            FIELD: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.FIELD),
            FIELDS: ()=>[],
            GRAPH: _validategraphflatpagelayoutwidgetforupdateutil.validateGraphFlatPageLayoutWidgetForUpdate,
            STANDALONE_RICH_TEXT: _validatestandalonerichtextflatpagelayoutwidgetforupdateutil.validateStandaloneRichTextFlatPageLayoutWidgetForUpdate,
            FRONT_COMPONENT: _validatefrontcomponentflatpagelayoutwidgetforupdateutil.validateFrontComponentFlatPageLayoutWidgetForUpdate,
            TIMELINE: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.TIMELINE),
            TASKS: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.TASKS),
            NOTES: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.NOTES),
            FILES: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.FILES),
            EMAILS: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.EMAILS),
            CALENDAR: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.CALENDAR),
            FIELD_RICH_TEXT: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.FIELD_RICH_TEXT),
            WORKFLOW: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW),
            WORKFLOW_VERSION: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_VERSION),
            WORKFLOW_RUN: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_RUN),
            RECORD_TABLE: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.RECORD_TABLE),
            EMAIL_THREAD: (0, _validatesimplerecordpagewidgetforupdateutil.validateSimpleRecordPageWidgetForUpdate)(_widgetconfigurationtypetype.WidgetConfigurationType.EMAIL_THREAD)
        };
    }
};
FlatPageLayoutWidgetTypeValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], FlatPageLayoutWidgetTypeValidatorService);

//# sourceMappingURL=flat-page-layout-widget-type-validator.service.js.map