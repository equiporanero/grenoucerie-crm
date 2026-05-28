"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "settings", {
    enumerable: true,
    get: function() {
        return settings;
    }
});
const settings = {
    storage: {
        imageCropSizes: {
            'profile-picture': [
                'original'
            ],
            'workspace-logo': [
                'original'
            ],
            'person-picture': [
                'original'
            ]
        },
        maxFileSize: '10MB'
    },
    minLengthOfStringForDuplicateCheck: 3,
    maxVisibleViewFields: 30
};

//# sourceMappingURL=index.js.map