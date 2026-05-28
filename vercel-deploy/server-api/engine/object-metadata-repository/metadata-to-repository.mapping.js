"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "metadataToRepositoryMapping", {
    enumerable: true,
    get: function() {
        return metadataToRepositoryMapping;
    }
});
const _blocklistrepository = require("../../modules/blocklist/repositories/blocklist.repository");
const _timelineactivityrepository = require("../../modules/timeline/repositories/timeline-activity.repository");
const metadataToRepositoryMapping = {
    BlocklistWorkspaceEntity: _blocklistrepository.BlocklistRepository,
    TimelineActivityWorkspaceEntity: _timelineactivityrepository.TimelineActivityRepository
};

//# sourceMappingURL=metadata-to-repository.mapping.js.map