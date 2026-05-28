"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SURVEY_RESULT_CUSTOM_FIELD_SEEDS", {
    enumerable: true,
    get: function() {
        return SURVEY_RESULT_CUSTOM_FIELD_SEEDS;
    }
});
const _types = require("twenty-shared/types");
const SURVEY_RESULT_CUSTOM_FIELD_SEEDS = [
    {
        type: _types.FieldMetadataType.NUMBER,
        label: 'Score (Float 3 decimals)',
        name: 'score',
        settings: {
            dataType: _types.NumberDataType.FLOAT,
            decimals: 3,
            type: 'number'
        }
    },
    {
        type: _types.FieldMetadataType.NUMBER,
        label: 'Percentage of completion (Float 3 decimals + percentage)',
        name: 'percentageOfCompletion',
        settings: {
            dataType: _types.NumberDataType.FLOAT,
            decimals: 6,
            type: 'percentage'
        }
    },
    {
        type: _types.FieldMetadataType.NUMBER,
        label: 'Participants (Int)',
        name: 'participants',
        settings: {
            dataType: _types.NumberDataType.INT,
            type: 'number'
        }
    },
    {
        type: _types.FieldMetadataType.NUMBER,
        label: 'Average estimated number of atoms in the universe (BigInt)',
        name: 'averageEstimatedNumberOfAtomsInTheUniverse',
        settings: {
            dataType: _types.NumberDataType.BIGINT,
            type: 'number'
        }
    },
    {
        type: _types.FieldMetadataType.TEXT,
        label: 'Comments (Max 5 rows)',
        name: 'comments',
        settings: {
            displayedMaxRows: 5
        }
    },
    {
        type: _types.FieldMetadataType.TEXT,
        label: 'Short notes (Max 1 row)',
        name: 'shortNotes',
        settings: {
            displayedMaxRows: 1
        }
    },
    {
        type: _types.FieldMetadataType.FILES,
        label: 'Files',
        name: 'files',
        icon: 'IconFiles',
        settings: {
            maxNumberOfValues: 5
        }
    }
];

//# sourceMappingURL=survey-results-field-seeds.constant.js.map