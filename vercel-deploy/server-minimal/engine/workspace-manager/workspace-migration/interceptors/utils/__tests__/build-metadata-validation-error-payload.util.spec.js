"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _emptyorchestratorfailurereportconstant = require("../../../constant/empty-orchestrator-failure-report.constant");
const _workspacemigrationbuilderexception = require("../../../exceptions/workspace-migration-builder-exception");
const _buildmetadatavalidationerrorpayloadutil = require("../build-metadata-validation-error-payload.util");
const buildFailedValidation = (errors)=>({
        type: 'create',
        errors,
        flatEntityMinimalInformation: {}
    });
const buildException = (partialReport)=>new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException({
        status: 'fail',
        report: {
            ...(0, _emptyorchestratorfailurereportconstant.EMPTY_ORCHESTRATOR_FAILURE_REPORT)(),
            ...partialReport
        }
    });
describe('buildMetadataValidationErrorPayload', ()=>{
    it('returns an empty errors record and a totalErrors-of-0 summary when no metadata has failures', ()=>{
        const payload = (0, _buildmetadatavalidationerrorpayloadutil.buildMetadataValidationErrorPayload)(buildException({}));
        expect(payload.errors).toEqual({});
        expect(payload.summary).toEqual({
            totalErrors: 0
        });
        expect(payload.userFriendlyMessage).toEqual(/*i18n*/ {
            id: "PslTPV",
            message: "Metadata validation failed"
        });
    });
    it('aggregates per-metadata failure counts into the summary and only exposes metadata buckets that have failures', ()=>{
        const payload = (0, _buildmetadatavalidationerrorpayloadutil.buildMetadataValidationErrorPayload)(buildException({
            view: [
                buildFailedValidation([
                    {
                        code: 'A',
                        message: 'a'
                    }
                ]),
                buildFailedValidation([
                    {
                        code: 'B',
                        message: 'b'
                    }
                ])
            ],
            viewGroup: [
                buildFailedValidation([
                    {
                        code: 'C',
                        message: 'c'
                    }
                ])
            ]
        }));
        expect(payload.summary).toEqual({
            totalErrors: 3,
            view: 2,
            viewGroup: 1
        });
        expect(Object.keys(payload.errors).sort()).toEqual([
            'view',
            'viewGroup'
        ]);
    });
    it('returns the generic "Many validation errors" descriptor when more than one failed validation is reported', ()=>{
        const payload = (0, _buildmetadatavalidationerrorpayloadutil.buildMetadataValidationErrorPayload)(buildException({
            role: [
                buildFailedValidation([
                    {
                        code: 'ERR',
                        message: 'x',
                        userFriendlyMessage: /*i18n*/ {
                            id: "XLn1DI",
                            message: "Only error"
                        }
                    }
                ]),
                buildFailedValidation([
                    {
                        code: 'ERR2',
                        message: 'y',
                        userFriendlyMessage: /*i18n*/ {
                            id: "4romcD",
                            message: "Other error"
                        }
                    }
                ])
            ]
        }));
        expect(payload.userFriendlyMessage).toEqual(/*i18n*/ {
            id: "Mwvtvf",
            message: "Many validation errors"
        });
    });
    it("returns the only failure's userFriendlyMessage when exactly one failed validation is reported", ()=>{
        const userFriendlyMessage = /*i18n*/ {
            id: "BEtj6u",
            message: "Role name is invalid"
        };
        const payload = (0, _buildmetadatavalidationerrorpayloadutil.buildMetadataValidationErrorPayload)(buildException({
            role: [
                buildFailedValidation([
                    {
                        code: 'ROLE_ERROR',
                        message: 'invalid',
                        userFriendlyMessage
                    }
                ])
            ]
        }));
        expect(payload.userFriendlyMessage).toBe(userFriendlyMessage);
    });
    it('returns the fallback descriptor when the only reported failure has no userFriendlyMessage on any of its errors', ()=>{
        const payload = (0, _buildmetadatavalidationerrorpayloadutil.buildMetadataValidationErrorPayload)(buildException({
            view: [
                buildFailedValidation([
                    {
                        code: 'X',
                        message: 'y'
                    },
                    {
                        code: 'Z',
                        message: 'z'
                    }
                ])
            ]
        }));
        expect(payload.userFriendlyMessage).toEqual(/*i18n*/ {
            id: "PslTPV",
            message: "Metadata validation failed"
        });
    });
    it("returns the first error's userFriendlyMessage and skips earlier errors that do not provide one", ()=>{
        const userFriendlyMessage = /*i18n*/ {
            id: "4GaFCQ",
            message: "First friendly message"
        };
        const payload = (0, _buildmetadatavalidationerrorpayloadutil.buildMetadataValidationErrorPayload)(buildException({
            fieldMetadata: [
                buildFailedValidation([
                    {
                        code: 'A',
                        message: 'first'
                    },
                    {
                        code: 'B',
                        message: 'second',
                        userFriendlyMessage
                    },
                    {
                        code: 'C',
                        message: 'third',
                        userFriendlyMessage: /*i18n*/ {
                            id: "9RXJsb",
                            message: "Would not reach this"
                        }
                    }
                ])
            ]
        }));
        expect(payload.userFriendlyMessage).toBe(userFriendlyMessage);
    });
});

//# sourceMappingURL=build-metadata-validation-error-payload.util.spec.js.map