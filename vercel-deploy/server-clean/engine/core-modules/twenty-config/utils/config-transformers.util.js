"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "configTransformers", {
    enumerable: true,
    get: function() {
        return configTransformers;
    }
});
const configTransformers = {
    boolean: (value)=>{
        if (value === null || value === undefined) {
            return undefined;
        }
        if (typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'number') {
            return value !== 0;
        }
        if (typeof value === 'string') {
            const lowerValue = value.toLowerCase();
            if ([
                'true',
                'on',
                'yes',
                '1'
            ].includes(lowerValue)) {
                return true;
            }
            if ([
                'false',
                'off',
                'no',
                '0'
            ].includes(lowerValue)) {
                return false;
            }
        }
        return undefined;
    },
    number: (value)=>{
        if (value === null || value === undefined) {
            return undefined;
        }
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'string') {
            const parsedNumber = parseFloat(value);
            if (isNaN(parsedNumber)) {
                return undefined;
            }
            return parsedNumber;
        }
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        return undefined;
    },
    string: (value)=>{
        if (value === null || value === undefined) {
            return undefined;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number' || typeof value === 'boolean') {
            return String(value);
        }
        if (Array.isArray(value) || typeof value === 'object') {
            try {
                return JSON.stringify(value);
            } catch  {
                return undefined;
            }
        }
        return undefined;
    }
};

//# sourceMappingURL=config-transformers.util.js.map