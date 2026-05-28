"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pageLayoutGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return pageLayoutGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _pagelayouttabexception = require("../../page-layout-tab/exceptions/page-layout-tab.exception");
const _pagelayoutwidgetexception = require("../../page-layout-widget/exceptions/page-layout-widget.exception");
const _pagelayoutexception = require("../exceptions/page-layout.exception");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationbuildergraphqlapiexceptionhandlerutil = require("../../../workspace-manager/workspace-migration/interceptors/utils/workspace-migration-builder-graphql-api-exception-handler.util");
const pageLayoutGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
        return (0, _workspacemigrationbuildergraphqlapiexceptionhandlerutil.workspaceMigrationBuilderGraphqlApiExceptionHandler)(error);
    }
    if (error instanceof _pagelayoutexception.PageLayoutException) {
        switch(error.code){
            case _pagelayoutexception.PageLayoutExceptionCode.PAGE_LAYOUT_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _pagelayoutexception.PageLayoutExceptionCode.INVALID_PAGE_LAYOUT_DATA:
            case _pagelayoutexception.PageLayoutExceptionCode.TAB_NOT_FOUND_FOR_WIDGET_DUPLICATION:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _pagelayouttabexception.PageLayoutTabException) {
        switch(error.code){
            case _pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _pagelayouttabexception.PageLayoutTabExceptionCode.INVALID_PAGE_LAYOUT_TAB_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _pagelayoutwidgetexception.PageLayoutWidgetException) {
        switch(error.code){
            case _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=page-layout-graphql-api-exception-handler.util.js.map