"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return ViewGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _viewfieldexception = require("../../view-field/exceptions/view-field.exception");
const _viewfiltergroupexception = require("../../view-filter-group/exceptions/view-filter-group.exception");
const _viewfilterexception = require("../../view-filter/exceptions/view-filter.exception");
const _viewgroupexception = require("../../view-group/exceptions/view-group.exception");
const _viewsortexception = require("../../view-sort/exceptions/view-sort.exception");
const _viewexception = require("../exceptions/view.exception");
const _viewgraphqlapiexceptionhandlerutil = require("./view-graphql-api-exception-handler.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ViewGraphqlApiExceptionFilter = class ViewGraphqlApiExceptionFilter {
    catch(exception, _host) {
        return (0, _viewgraphqlapiexceptionhandlerutil.viewGraphqlApiExceptionHandler)(exception);
    }
};
ViewGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_viewexception.ViewException, _viewfieldexception.ViewFieldException, _viewfilterexception.ViewFilterException, _viewfiltergroupexception.ViewFilterGroupException, _viewgroupexception.ViewGroupException, _viewsortexception.ViewSortException, _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException),
    (0, _common.Injectable)()
], ViewGraphqlApiExceptionFilter);

//# sourceMappingURL=view-graphql-api-exception.filter.js.map