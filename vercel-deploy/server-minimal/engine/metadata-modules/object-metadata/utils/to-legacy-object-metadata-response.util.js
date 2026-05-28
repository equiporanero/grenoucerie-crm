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
    get toLegacyObjectMetadataCreateResponse () {
        return toLegacyObjectMetadataCreateResponse;
    },
    get toLegacyObjectMetadataDeleteResponse () {
        return toLegacyObjectMetadataDeleteResponse;
    },
    get toLegacyObjectMetadataFindOneResponse () {
        return toLegacyObjectMetadataFindOneResponse;
    },
    get toLegacyObjectMetadataListResponse () {
        return toLegacyObjectMetadataListResponse;
    },
    get toLegacyObjectMetadataUpdateResponse () {
        return toLegacyObjectMetadataUpdateResponse;
    }
});
const toLegacyObjectMetadataListResponse = ({ data, pageInfo, totalCount })=>({
        data: {
            objects: data
        },
        pageInfo,
        totalCount
    });
const toLegacyObjectMetadataFindOneResponse = (object)=>({
        data: {
            object
        }
    });
const toLegacyObjectMetadataCreateResponse = (object)=>({
        data: {
            createOneObject: object
        }
    });
const toLegacyObjectMetadataUpdateResponse = (object)=>({
        data: {
            updateOneObject: object
        }
    });
const toLegacyObjectMetadataDeleteResponse = (object)=>({
        data: {
            deleteOneObject: object
        }
    });

//# sourceMappingURL=to-legacy-object-metadata-response.util.js.map