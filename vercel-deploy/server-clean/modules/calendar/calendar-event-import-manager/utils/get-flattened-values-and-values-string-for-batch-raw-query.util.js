"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "valuesStringForBatchRawQuery", {
    enumerable: true,
    get: function() {
        return valuesStringForBatchRawQuery;
    }
});
const valuesStringForBatchRawQuery = (values, typesArray = [])=>{
    const castedValues = values.reduce((acc, _, rowIndex)=>{
        const numberOfColumns = typesArray.length;
        const rowValues = Array.from({
            length: numberOfColumns
        }, (_, columnIndex)=>{
            const placeholder = `$${rowIndex * numberOfColumns + columnIndex + 1}`;
            const typeCast = typesArray[columnIndex] ? `::${typesArray[columnIndex]}` : '';
            return `${placeholder}${typeCast}`;
        }).join(', ');
        acc.push(`(${rowValues})`);
        return acc;
    }, []);
    return castedValues.join(', ');
};

//# sourceMappingURL=get-flattened-values-and-values-string-for-batch-raw-query.util.js.map