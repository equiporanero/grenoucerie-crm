"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteUsingPagination", {
    enumerable: true,
    get: function() {
        return deleteUsingPagination;
    }
});
const deleteUsingPagination = async (workspaceId, batchSize, getterPaginated, deleter, transactionManager)=>{
    let hasMoreData = true;
    while(hasMoreData){
        const idsToDelete = await getterPaginated(batchSize, 0, workspaceId, transactionManager);
        if (idsToDelete.length > 0) {
            await deleter(idsToDelete, workspaceId, transactionManager);
        } else {
            hasMoreData = false;
        }
    }
};

//# sourceMappingURL=delete-using-pagination.util.js.map