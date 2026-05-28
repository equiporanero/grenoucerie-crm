"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateInsertStatement", {
    enumerable: true,
    get: function() {
        return generateInsertStatement;
    }
});
const generateInsertStatement = (insertPrefix, formattedValues)=>`${insertPrefix}(${formattedValues.join(', ')});\n`;

//# sourceMappingURL=generate-insert-statement.util.js.map