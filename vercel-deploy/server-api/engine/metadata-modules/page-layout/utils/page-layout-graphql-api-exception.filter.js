"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return PageLayoutGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _pagelayouttabexception = require("../../page-layout-tab/exceptions/page-layout-tab.exception");
const _pagelayoutwidgetexception = require("../../page-layout-widget/exceptions/page-layout-widget.exception");
const _pagelayoutexception = require("../exceptions/page-layout.exception");
const _pagelayoutgraphqlapiexceptionhandlerutil = require("./page-layout-graphql-api-exception-handler.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PageLayoutGraphqlApiExceptionFilter = class PageLayoutGraphqlApiExceptionFilter {
    catch(exception, _host) {
        return (0, _pagelayoutgraphqlapiexceptionhandlerutil.pageLayoutGraphqlApiExceptionHandler)(exception);
    }
};
PageLayoutGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_pagelayoutexception.PageLayoutException, _pagelayouttabexception.PageLayoutTabException, _pagelayoutwidgetexception.PageLayoutWidgetException, _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException),
    (0, _common.Injectable)()
], PageLayoutGraphqlApiExceptionFilter);

//# sourceMappingURL=page-layout-graphql-api-exception.filter.js.map