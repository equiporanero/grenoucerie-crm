"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromApplicationEntityToFlatApplication", {
    enumerable: true,
    get: function() {
        return fromApplicationEntityToFlatApplication;
    }
});
const _utils = require("twenty-shared/utils");
const _applicationentityrelationpropertiesconstant = require("../constants/application-entity-relation-properties.constant");
const fromApplicationEntityToFlatApplication = (applicationEntity)=>(0, _utils.removePropertiesFromRecord)(applicationEntity, _applicationentityrelationpropertiesconstant.APPLICATION_ENTITY_RELATION_PROPERTIES);

//# sourceMappingURL=from-application-entity-to-flat-application.util.js.map