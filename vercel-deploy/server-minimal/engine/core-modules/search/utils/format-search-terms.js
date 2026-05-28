"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatSearchTerms", {
    enumerable: true,
    get: function() {
        return formatSearchTerms;
    }
});
const formatSearchTerms = (searchTerm, operator = 'and')=>{
    if (searchTerm.trim() === '') {
        return '';
    }
    const words = searchTerm.trim().split(/\s+/);
    const formattedWords = words.map((word)=>{
        const escapedWord = word.replace(/[\\:'&|!()@<>]/g, '\\$&');
        return `${escapedWord}:*`;
    });
    return formattedWords.join(` ${operator === 'and' ? '&' : '|'} `);
};

//# sourceMappingURL=format-search-terms.js.map