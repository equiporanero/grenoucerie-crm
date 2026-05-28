"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get getFlatIndexMetadataMock () {
        return getFlatIndexMetadataMock;
    },
    get getStandardFlatIndexMetadataMock () {
        return getStandardFlatIndexMetadataMock;
    }
});
const _faker = require("@faker-js/faker");
const _indexTypetypes = require("../../index-metadata/types/indexType.types");
const getFlatIndexMetadataMock = (overrides)=>{
    const createdAt = _faker.faker.date.anytime().toISOString();
    return {
        universalFlatIndexFieldMetadatas: [],
        flatIndexFieldMetadatas: [],
        createdAt,
        id: _faker.faker.string.uuid(),
        indexType: _indexTypetypes.IndexType.BTREE,
        indexWhereClause: null,
        isCustom: false,
        isUnique: false,
        name: 'defaultFlatIndexMetadataName',
        updatedAt: createdAt,
        workspaceId: _faker.faker.string.uuid(),
        applicationId: _faker.faker.string.uuid(),
        ...overrides
    };
};
const getStandardFlatIndexMetadataMock = (overrides)=>{
    return getFlatIndexMetadataMock({
        isCustom: false,
        ...overrides
    });
};

//# sourceMappingURL=get-flat-index-metadata.mock.js.map