"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutWidgetPositionUnion", {
    enumerable: true,
    get: function() {
        return PageLayoutWidgetPositionUnion;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _pagelayoutwidgetcanvaspositiondto = require("./page-layout-widget-canvas-position.dto");
const _pagelayoutwidgetgridpositiondto = require("./page-layout-widget-grid-position.dto");
const _pagelayoutwidgetverticallistpositiondto = require("./page-layout-widget-vertical-list-position.dto");
const PageLayoutWidgetPositionUnion = (0, _graphql.createUnionType)({
    name: 'PageLayoutWidgetPosition',
    types: ()=>[
            _pagelayoutwidgetgridpositiondto.PageLayoutWidgetGridPositionDTO,
            _pagelayoutwidgetverticallistpositiondto.PageLayoutWidgetVerticalListPositionDTO,
            _pagelayoutwidgetcanvaspositiondto.PageLayoutWidgetCanvasPositionDTO
        ],
    resolveType ({ layoutMode }) {
        switch(layoutMode){
            case _types.PageLayoutTabLayoutMode.GRID:
                return _pagelayoutwidgetgridpositiondto.PageLayoutWidgetGridPositionDTO;
            case _types.PageLayoutTabLayoutMode.VERTICAL_LIST:
                return _pagelayoutwidgetverticallistpositiondto.PageLayoutWidgetVerticalListPositionDTO;
            case _types.PageLayoutTabLayoutMode.CANVAS:
                return _pagelayoutwidgetcanvaspositiondto.PageLayoutWidgetCanvasPositionDTO;
        }
    }
});

//# sourceMappingURL=page-layout-widget-position.union.js.map