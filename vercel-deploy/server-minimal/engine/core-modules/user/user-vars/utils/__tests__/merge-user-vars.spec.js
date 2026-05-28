"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _mergeuservarsutil = require("../merge-user-vars.util");
describe('mergeUserVars', ()=>{
    it('should merge user vars correctly', ()=>{
        const userVars = [
            {
                key: 'key1',
                value: JSON.parse('"value1"'),
                userId: 'userId1',
                workspaceId: 'workspaceId1'
            },
            {
                key: 'key2',
                value: JSON.parse('"value2"'),
                userId: 'userId1',
                workspaceId: null
            },
            {
                key: 'key3',
                value: JSON.parse('"value3"'),
                userId: null,
                workspaceId: 'workspaceId1'
            }
        ];
        const mergedUserVars = (0, _mergeuservarsutil.mergeUserVars)(userVars);
        expect(mergedUserVars).toEqual(new Map([
            [
                'key1',
                JSON.parse('"value1"')
            ],
            [
                'key2',
                JSON.parse('"value2"')
            ],
            [
                'key3',
                JSON.parse('"value3"')
            ]
        ]));
    });
    it('should merge user vars correctly when user vars are empty', ()=>{
        // @ts-expect-error legacy noImplicitAny
        const userVars = [];
        // @ts-expect-error legacy noImplicitAny
        const mergedUserVars = (0, _mergeuservarsutil.mergeUserVars)(userVars);
        expect(mergedUserVars).toEqual(new Map());
    });
    it('should overwrite user vars correctly', ()=>{
        const userVars1 = [
            {
                key: 'key',
                value: JSON.parse('"value1"'),
                userId: 'userId',
                workspaceId: 'workspaceId'
            },
            {
                key: 'key',
                value: JSON.parse('"value2"'),
                userId: 'userId',
                workspaceId: null
            },
            {
                key: 'key',
                value: JSON.parse('"value3"'),
                userId: null,
                workspaceId: 'workspaceId'
            }
        ];
        const mergedUserVars1 = (0, _mergeuservarsutil.mergeUserVars)(userVars1);
        const userVars2 = [
            {
                key: 'key',
                value: JSON.parse('"value1"'),
                userId: 'userId',
                workspaceId: 'workspaceId'
            },
            {
                key: 'key',
                value: JSON.parse('"value2"'),
                userId: 'userId',
                workspaceId: null
            }
        ];
        const mergedUserVars2 = (0, _mergeuservarsutil.mergeUserVars)(userVars2);
        const userVars3 = [
            {
                key: 'key',
                value: JSON.parse('"value2"'),
                userId: 'userId',
                workspaceId: null
            },
            {
                key: 'key',
                value: JSON.parse('"value3"'),
                userId: null,
                workspaceId: 'workspaceId'
            }
        ];
        const mergedUserVars3 = (0, _mergeuservarsutil.mergeUserVars)(userVars3);
        const userVars4 = [
            {
                key: 'key',
                value: JSON.parse('"value1"'),
                userId: 'userId',
                workspaceId: 'workspaceId'
            },
            {
                key: 'key',
                value: JSON.parse('"value3"'),
                userId: null,
                workspaceId: 'workspaceId'
            }
        ];
        const mergedUserVars4 = (0, _mergeuservarsutil.mergeUserVars)(userVars4);
        expect(mergedUserVars1).toEqual(new Map([
            [
                'key',
                JSON.parse('"value1"')
            ]
        ]));
        expect(mergedUserVars2).toEqual(new Map([
            [
                'key',
                JSON.parse('"value1"')
            ]
        ]));
        expect(mergedUserVars3).toEqual(new Map([
            [
                'key',
                JSON.parse('"value2"')
            ]
        ]));
        expect(mergedUserVars4).toEqual(new Map([
            [
                'key',
                JSON.parse('"value1"')
            ]
        ]));
    });
});

//# sourceMappingURL=merge-user-vars.spec.js.map