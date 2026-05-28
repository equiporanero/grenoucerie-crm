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
    get RegisteredWorkspaceCommand () {
        return RegisteredWorkspaceCommand;
    },
    get getRegisteredWorkspaceCommandMetadata () {
        return getRegisteredWorkspaceCommandMetadata;
    }
});
require("reflect-metadata");
const REGISTERED_WORKSPACE_COMMAND_KEY = 'REGISTERED_WORKSPACE_COMMAND';
const RegisteredWorkspaceCommand = (version, timestamp)=>(target)=>{
        Reflect.defineMetadata(REGISTERED_WORKSPACE_COMMAND_KEY, {
            version,
            timestamp
        }, target);
    };
const getRegisteredWorkspaceCommandMetadata = (target)=>Reflect.getMetadata(REGISTERED_WORKSPACE_COMMAND_KEY, target);

//# sourceMappingURL=registered-workspace-command.decorator.js.map