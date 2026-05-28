"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRoleRequiredPropertiesAreDefined", {
    enumerable: true,
    get: function() {
        return validateRoleRequiredPropertiesAreDefined;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _flatrolerequiredpropertiesconstants = require("../../../../../metadata-modules/flat-role/constants/flat-role-required-properties.constants");
const _permissionsexception = require("../../../../../metadata-modules/permissions/permissions.exception");
const validateRoleRequiredPropertiesAreDefined = ({ flatRole })=>_flatrolerequiredpropertiesconstants.FLAT_ROLE_REQUIRED_PROPERTIES.flatMap((property)=>{
        if ((0, _utils.isDefined)(flatRole[property])) {
            return [];
        }
        return [
            {
                code: _permissionsexception.PermissionsExceptionCode.INVALID_ARG,
                message: _core.i18n._(/*i18n*/ {
                    id: "OTJNm9",
                    message: "Property {property} is required for role",
                    values: {
                        property: property
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "RyE+Of",
                    message: "Some of the information provided is invalid. Please check your input and try again."
                }
            }
        ];
    });

//# sourceMappingURL=validate-role-required-properties-are-defined.util.js.map