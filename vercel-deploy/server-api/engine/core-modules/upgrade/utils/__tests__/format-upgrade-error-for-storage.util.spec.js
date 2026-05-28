"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _workspacemigrationbuilderexception = require("../../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationrunnerexception = require("../../../../workspace-manager/workspace-migration/workspace-migration-runner/exceptions/workspace-migration-runner.exception");
const _formatupgradeerrorforstorageutil = require("../format-upgrade-error-for-storage.util");
const stripStack = (output)=>output.replace(/\n\s+at .+/g, '');
describe('formatUpgradeErrorForStorage', ()=>{
    it('should format a QueryFailedError with driver details', ()=>{
        const driverError = new Error('duplicate key value violates unique constraint "UQ_name"');
        Object.assign(driverError, {
            code: '23505',
            detail: 'Key (name)=(foo) already exists.'
        });
        const error = new _typeorm.QueryFailedError('INSERT INTO "core"."upgradeMigration" VALUES ($1)', [], driverError);
        expect(stripStack((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(error))).toMatchSnapshot();
    });
    it('should format a QueryFailedError without driver code or detail', ()=>{
        const error = new _typeorm.QueryFailedError('SELECT * FROM "missing_table"', [], new Error('relation "missing_table" does not exist'));
        expect(stripStack((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(error))).toMatchSnapshot();
    });
    it('should format a WorkspaceMigrationRunnerException with INTERNAL_SERVER_ERROR', ()=>{
        const error = new _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException({
            message: 'Something went wrong internally',
            code: _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.INTERNAL_SERVER_ERROR
        });
        expect(stripStack((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(error))).toMatchSnapshot();
    });
    it('should format a WorkspaceMigrationRunnerException with EXECUTION_FAILED', ()=>{
        const action = {
            type: 'create',
            metadataName: 'objectMetadata'
        };
        const error = new _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException({
            action,
            errors: {
                metadata: new Error('column "label" cannot be null'),
                workspaceSchema: new Error('table already exists')
            },
            code: _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.EXECUTION_FAILED
        });
        expect(stripStack((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(error))).toMatchSnapshot();
    });
    it('should format a WorkspaceMigrationBuilderException', ()=>{
        const report = {
            objectMetadata: [
                {
                    validationErrors: [
                        'name must not be empty'
                    ]
                }
            ]
        };
        const error = new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException({
            status: 'fail',
            report
        });
        expect(stripStack((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(error))).toMatchSnapshot();
    });
    it('should format a CustomError with code', ()=>{
        const error = new _utils.CustomError('Workspace not found', 'WORKSPACE_NOT_FOUND');
        expect(stripStack((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(error))).toMatchSnapshot();
    });
    it('should format a generic Error', ()=>{
        const error = new Error('Something unexpected happened');
        expect(stripStack((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(error))).toMatchSnapshot();
    });
    it('should format a string value', ()=>{
        expect((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)('raw string error')).toMatchSnapshot();
    });
    it('should format an undefined value', ()=>{
        expect((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(undefined)).toMatchSnapshot();
    });
    it('should format a number value', ()=>{
        expect((0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(42)).toMatchSnapshot();
    });
});

//# sourceMappingURL=format-upgrade-error-for-storage.util.spec.js.map