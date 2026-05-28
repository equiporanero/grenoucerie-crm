"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RichTextFilterType", {
    enumerable: true,
    get: function() {
        return RichTextFilterType;
    }
});
const _graphql = require("graphql");
const richTextLeafFilter = new _graphql.GraphQLInputObjectType({
    name: 'RichTextLeafFilter',
    fields: {
        ilike: {
            type: _graphql.GraphQLString,
            description: 'Case-insensitive match with % wildcard (e.g. %value%)'
        }
    }
});
const RichTextFilterType = new _graphql.GraphQLInputObjectType({
    name: 'RichTextFilter',
    fields: {
        blocknote: {
            type: richTextLeafFilter
        },
        markdown: {
            type: richTextLeafFilter
        }
    }
});

//# sourceMappingURL=rich-text.input-type.js.map