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
    get toLegacyFieldMetadataCreateResponse () {
        return toLegacyFieldMetadataCreateResponse;
    },
    get toLegacyFieldMetadataDeleteResponse () {
        return toLegacyFieldMetadataDeleteResponse;
    },
    get toLegacyFieldMetadataFindOneResponse () {
        return toLegacyFieldMetadataFindOneResponse;
    },
    get toLegacyFieldMetadataListResponse () {
        return toLegacyFieldMetadataListResponse;
    },
    get toLegacyFieldMetadataUpdateResponse () {
        return toLegacyFieldMetadataUpdateResponse;
    }
});
const toLegacyFieldMetadataListResponse = ({ data, pageInfo, totalCount })=>({
        data: {
            fields: data
        },
        pageInfo,
        totalCount
    });
const toLegacyFieldMetadataFindOneResponse = (field)=>({
        data: {
            field
        }
    });
const toLegacyFieldMetadataCreateResponse = (field)=>({
        data: {
            createOneField: field
        }
    });
const toLegacyFieldMetadataUpdateResponse = (field)=>({
        data: {
            updateOneField: field
        }
    });
const toLegacyFieldMetadataDeleteResponse = (field)=>({
        data: {
            deleteOneField: field
        }
    });

//# sourceMappingURL=to-legacy-field-metadata-response.util.js.map