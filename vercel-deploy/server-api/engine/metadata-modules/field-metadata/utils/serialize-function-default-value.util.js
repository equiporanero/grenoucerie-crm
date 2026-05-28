"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "serializeFunctionDefaultValue", {
    enumerable: true,
    get: function() {
        return serializeFunctionDefaultValue;
    }
});
const serializeFunctionDefaultValue = (defaultValue)=>{
    switch(defaultValue){
        case 'uuid':
            return 'public.uuid_generate_v4()';
        case 'now':
            return 'now()';
        default:
            return null;
    }
};

//# sourceMappingURL=serialize-function-default-value.util.js.map