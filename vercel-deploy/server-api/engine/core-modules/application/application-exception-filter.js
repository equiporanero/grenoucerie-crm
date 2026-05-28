"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationExceptionFilter", {
    enumerable: true,
    get: function() {
        return ApplicationExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationexception = require("./application.exception");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationExceptionFilter = class ApplicationExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _applicationexception.ApplicationExceptionCode.OBJECT_NOT_FOUND:
            case _applicationexception.ApplicationExceptionCode.FIELD_NOT_FOUND:
            case _applicationexception.ApplicationExceptionCode.ENTITY_NOT_FOUND:
            case _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND:
            case _applicationexception.ApplicationExceptionCode.APP_NOT_INSTALLED:
            case _applicationexception.ApplicationExceptionCode.LOGIC_FUNCTION_NOT_FOUND:
            case _applicationexception.ApplicationExceptionCode.FRONT_COMPONENT_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(exception);
            case _applicationexception.ApplicationExceptionCode.FORBIDDEN:
                throw new _graphqlerrorsutil.ForbiddenError(exception);
            case _applicationexception.ApplicationExceptionCode.INVALID_INPUT:
            case _applicationexception.ApplicationExceptionCode.SOURCE_CHANNEL_MISMATCH:
            case _applicationexception.ApplicationExceptionCode.APP_ALREADY_INSTALLED:
            case _applicationexception.ApplicationExceptionCode.CANNOT_DOWNGRADE_APPLICATION:
            case _applicationexception.ApplicationExceptionCode.SERVER_VERSION_INCOMPATIBLE:
            case _applicationexception.ApplicationExceptionCode.INVALID_APP_ENGINE_REQUIREMENT:
                throw new _graphqlerrorsutil.UserInputError(exception);
            case _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED:
            case _applicationexception.ApplicationExceptionCode.POST_INSTALL_ERROR:
            case _applicationexception.ApplicationExceptionCode.PRE_INSTALL_ERROR:
            case _applicationexception.ApplicationExceptionCode.TARBALL_EXTRACTION_FAILED:
            case _applicationexception.ApplicationExceptionCode.UPGRADE_FAILED:
            case _applicationexception.ApplicationExceptionCode.INVALID_SERVER_VERSION:
                throw new _graphqlerrorsutil.InternalServerError(exception);
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
ApplicationExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_applicationexception.ApplicationException)
], ApplicationExceptionFilter);

//# sourceMappingURL=application-exception-filter.js.map