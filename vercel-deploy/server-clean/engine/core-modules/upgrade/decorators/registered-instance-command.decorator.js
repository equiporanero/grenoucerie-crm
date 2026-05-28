"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get RegisteredInstanceCommand () {
        return RegisteredInstanceCommand;
    },
    get getRegisteredInstanceCommandMetadata () {
        return getRegisteredInstanceCommandMetadata;
    }
});
require("reflect-metadata");
const _common = require("@nestjs/common");
const REGISTERED_INSTANCE_COMMAND_KEY = 'REGISTERED_INSTANCE_COMMAND';
const RegisteredInstanceCommand = (version, timestamp, options)=>(target)=>{
        (0, _common.Injectable)()(target);
        Reflect.defineMetadata(REGISTERED_INSTANCE_COMMAND_KEY, {
            version,
            timestamp,
            type: options?.type ?? 'fast'
        }, target);
    };
const getRegisteredInstanceCommandMetadata = (target)=>Reflect.getMetadata(REGISTERED_INSTANCE_COMMAND_KEY, target);

//# sourceMappingURL=registered-instance-command.decorator.js.map