"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyGapFilling", {
    enumerable: true,
    get: function() {
        return applyGapFilling;
    }
});
const _utils = require("twenty-shared/utils");
const _filldategapsutil = require("./fill-date-gaps.util");
const _fillselectgapsutil = require("./fill-select-gaps.util");
const _getselectoptionsutil = require("./get-select-options.util");
const applyGapFilling = ({ data, primaryAxisGroupByField, dateGranularity, omitNullValues, isDescOrder, isTwoDimensional, splitMultiValueFields })=>{
    if (omitNullValues) {
        return {
            data,
            wasTruncated: false
        };
    }
    let currentData = data;
    let wasTruncated = false;
    const isPrimaryFieldDate = (0, _utils.isFieldMetadataDateKind)(primaryAxisGroupByField.type);
    if (isPrimaryFieldDate) {
        const fillDateGapsFn = isTwoDimensional ? _filldategapsutil.fillDateGapsTwoDimensional : _filldategapsutil.fillDateGaps;
        const dateResult = fillDateGapsFn({
            data: currentData,
            dateGranularity,
            isDescOrder
        });
        currentData = dateResult.data;
        wasTruncated = dateResult.wasTruncated;
    }
    const isArrayFieldWithoutSplit = (0, _utils.isFieldMetadataArrayKind)(primaryAxisGroupByField.type) && !(splitMultiValueFields ?? true);
    const isPrimaryFieldSelect = (0, _utils.isFieldMetadataSelectKind)(primaryAxisGroupByField.type);
    if (isPrimaryFieldSelect && !isArrayFieldWithoutSplit) {
        const selectOptions = (0, _getselectoptionsutil.getSelectOptions)(primaryAxisGroupByField);
        const fillSelectGapsFn = isTwoDimensional ? _fillselectgapsutil.fillSelectGapsTwoDimensional : _fillselectgapsutil.fillSelectGaps;
        currentData = fillSelectGapsFn({
            data: currentData,
            selectOptions
        });
    }
    return {
        data: currentData,
        wasTruncated
    };
};

//# sourceMappingURL=apply-gap-filling.util.js.map