"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRecordImageIdentifier", {
    enumerable: true,
    get: function() {
        return getRecordImageIdentifier;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _extractfileidfromurlutil = require("../../file/files-field/utils/extract-file-id-from-url.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _types = require("twenty-shared/types");
const getRecordImageIdentifier = async ({ record, flatObjectMetadata, flatFieldMetadataMaps, signUrl })=>{
    if (flatObjectMetadata.nameSingular === 'company') {
        const domainNameObj = record.domainName;
        const domainNamePrimaryLinkUrl = domainNameObj?.primaryLinkUrl;
        return domainNamePrimaryLinkUrl ? (0, _utils.getLogoUrlFromDomainName)(domainNamePrimaryLinkUrl) || null : null;
    }
    //TODO: Temporary solution before imageIdentifier refactor
    if (signUrl && flatObjectMetadata.nameSingular === 'person') {
        const avatarFileId = record.avatarFile?.[0]?.fileId;
        if (!(0, _utils.isDefined)(avatarFileId)) {
            return null;
        }
        return signUrl(avatarFileId, _types.FileFolder.FilesField);
    }
    if (signUrl && flatObjectMetadata.nameSingular === 'workspaceMember' && (0, _utils.isDefined)(record.avatarUrl)) {
        const avatarFileId = (0, _extractfileidfromurlutil.extractFileIdFromUrl)(record.avatarUrl, _types.FileFolder.CorePicture);
        if (!(0, _utils.isDefined)(avatarFileId)) {
            return null;
        }
        return signUrl(avatarFileId, _types.FileFolder.CorePicture);
    }
    if (!(0, _utils.isDefined)(flatObjectMetadata.imageIdentifierFieldMetadataId)) {
        return null;
    }
    const imageIdentifierField = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityId: flatObjectMetadata.imageIdentifierFieldMetadataId
    });
    if (!(0, _utils.isDefined)(imageIdentifierField)) {
        return null;
    }
    const imageValue = record[imageIdentifierField.name];
    if (!(0, _utils.isDefined)(imageValue)) {
        return null;
    }
    const rawImageValue = String(imageValue);
    if (!(0, _guards.isNonEmptyString)(rawImageValue)) {
        return null;
    }
    if (signUrl && flatObjectMetadata.nameSingular === 'workspaceMember') {
        return signUrl(rawImageValue, _types.FileFolder.FilesField);
    }
    return rawImageValue;
};

//# sourceMappingURL=get-record-image-identifier.util.js.map