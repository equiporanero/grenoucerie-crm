"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "convertOnDeleteActionToOnDelete", {
    enumerable: true,
    get: function() {
        return convertOnDeleteActionToOnDelete;
    }
});
const convertOnDeleteActionToOnDelete = (onDeleteAction)=>{
    if (!onDeleteAction) {
        return undefined;
    }
    switch(onDeleteAction){
        case 'CASCADE':
            return 'CASCADE';
        case 'SET_NULL':
            return 'SET NULL';
        case 'RESTRICT':
            return 'RESTRICT';
        case 'NO_ACTION':
            return 'NO ACTION';
        default:
            throw new Error('Invalid onDeleteAction');
    }
};

//# sourceMappingURL=convert-on-delete-action-to-on-delete.util.js.map