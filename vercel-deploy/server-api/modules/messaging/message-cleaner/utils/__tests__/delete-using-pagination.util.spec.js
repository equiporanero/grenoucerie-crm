"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _deleteusingpaginationutil = require("../delete-using-pagination.util");
describe('deleteUsingPagination', ()=>{
    it('should delete items using pagination', async ()=>{
        const workspaceId = 'workspace123';
        const batchSize = 10;
        const getterPaginated = jest.fn().mockResolvedValueOnce([
            'id1',
            'id2'
        ]).mockResolvedValueOnce([]);
        const deleter = jest.fn();
        const transactionManager = undefined;
        await (0, _deleteusingpaginationutil.deleteUsingPagination)(workspaceId, batchSize, getterPaginated, deleter, transactionManager);
        expect(getterPaginated).toHaveBeenNthCalledWith(1, batchSize, 0, workspaceId, transactionManager);
        expect(getterPaginated).toHaveBeenNthCalledWith(2, batchSize, 0, workspaceId, transactionManager);
        expect(deleter).toHaveBeenNthCalledWith(1, [
            'id1',
            'id2'
        ], workspaceId, transactionManager);
        expect(deleter).toHaveBeenCalledTimes(1);
    });
});

//# sourceMappingURL=delete-using-pagination.util.spec.js.map